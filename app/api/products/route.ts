import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { productSchema } from '@/lib/validations/product'
import { DatabaseOptimizer } from '@/lib/database-optimizer'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const isAdmin = searchParams.get('admin') === 'true'
    const skip = (page - 1) * limit

    // Create cache key for this specific query
    const cacheKey = `products:${category || 'all'}:${search || 'none'}:${page}:${limit}:${isAdmin}`
    
    // Try to get from cache first
    const cached = await DatabaseOptimizer.getCachedData(cacheKey)
    if (cached && !isAdmin) { // Don't cache admin requests
      return NextResponse.json({
        ...cached,
        _performance: {
          responseTime: Date.now() - startTime,
          cached: true
        }
      })
    }

    const where: any = {}

    // Only filter by isActive if not admin request
    if (!isAdmin) {
      where.isActive = true
      // Add stock filter for better SEO (only show available products)
      where.stock = { gt: 0 }
    }

    if (category) {
      where.categoryId = category
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { 
          category: { 
            name: { contains: search, mode: 'insensitive' } 
          } 
        },
      ]
    }

    // Optimize queries with parallel execution and selective field inclusion
    const [products, total, categoryStats] = await Promise.all([
      // Optimized products query with caching
      DatabaseOptimizer.executeOptimizedQuery(
        `products_list_${JSON.stringify(where)}_${skip}_${limit}`,
        () => prisma.product.findMany({
          where,
          include: {
            category: {
              select: {
                id: true,
                name: true,
              }
            },
            reviews: {
              select: {
                rating: true,
                createdAt: true,
              },
              take: 5, // Limit reviews for performance
              orderBy: {
                createdAt: 'desc'
              }
            },
            _count: {
              select: {
                reviews: true,
                orderItems: true, // For popularity metrics
              }
            }
          },
          skip,
          take: limit,
          orderBy: [
            { isActive: 'desc' }, // Active products first
            { stock: 'desc' },    // In-stock products next
            { createdAt: 'desc' }, // Then by creation date
          ],
        }),
        300 // Cache for 5 minutes
      ),
      // Optimized count query
      DatabaseOptimizer.executeOptimizedQuery(
        `products_count_${JSON.stringify(where)}`,
        () => prisma.product.count({ where }),
        600 // Cache for 10 minutes
      ),
      // Optimized category stats
      DatabaseOptimizer.executeOptimizedQuery(
        `category_stats_${category || 'all'}`,
        () => prisma.product.groupBy({
          by: ['categoryId'],
          where: { isActive: true, stock: { gt: 0 } },
          _count: {
            categoryId: true,
          },
          orderBy: {
            _count: {
              categoryId: 'desc'
            }
          }
        }),
        900 // Cache for 15 minutes
      )
    ])


    // Calculate advanced metrics for SEO and performance
    const productsWithMetrics = products.map(product => ({
      ...product,
      averageRating: product.reviews.length > 0 
        ? Math.round((product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length) * 10) / 10
        : null,
      reviewCount: product._count.reviews,
      popularityScore: product._count.orderItems,
      hasRecentReviews: product.reviews.some(review => 
        new Date(review.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      ),
      isPopular: product._count.orderItems > 10,
      inStock: product.stock > 0,
      lowStock: product.stock > 0 && product.stock <= 10,
      // Remove internal data from response
      reviews: undefined,
      _count: undefined,
    }))

    const responseData = {
      products: productsWithMetrics,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      seo: {
        totalProducts: total,
        categoryDistribution: categoryStats,
        hasProducts: total > 0
      }
    }

    // Cache the response for non-admin requests
    if (!isAdmin) {
      await DatabaseOptimizer.setCachedData(cacheKey, responseData, 300)
    }

    return NextResponse.json({
      ...responseData,
      _performance: {
        responseTime: Date.now() - startTime,
        cached: false
      }
    })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = productSchema.parse(body)

    // Generate SKU and slug if not provided
    const sku = validatedData.sku || `SKU-${Date.now()}`
    const slug = validatedData.slug || validatedData.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const product = await prisma.product.create({
      data: {
        ...validatedData,
        sku,
        slug
      },
      include: {
        category: true,
      },
    })

    // Invalidate product caches after creation
    DatabaseOptimizer.invalidateCache('products')
    DatabaseOptimizer.invalidateCache('category_stats')

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Create product error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}