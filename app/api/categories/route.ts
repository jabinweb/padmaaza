import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { categorySchema } from '@/lib/validations/product'
import { DatabaseOptimizer } from '@/lib/database-optimizer'

export async function GET() {
  const startTime = Date.now()
  
  try {
    // Cache key for categories
    const cacheKey = 'categories_navigation_with_counts'
    
    // Try to get from cache first
    const cached = await DatabaseOptimizer.getCachedData(cacheKey)
    if (cached) {
      return NextResponse.json({
        ...cached,
        _performance: {
          responseTime: Date.now() - startTime,
          cached: true
        }
      })
    }

    // Get categories with product counts for better navigation
    const categories = await DatabaseOptimizer.executeOptimizedQuery(
      'categories_with_product_counts',
      async () => {
        const cats = await prisma.category.findMany({
          where: { isActive: true },
          include: {
            _count: {
              select: {
                products: {
                  where: {
                    isActive: true,
                    stock: { gt: 0 }
                  }
                }
              }
            }
          },
          orderBy: { name: 'asc' },
        })

        // Add SEO-friendly data
        return cats.map(cat => ({
          ...cat,
          productCount: cat._count.products,
          hasProducts: cat._count.products > 0,
          _count: undefined // Remove from response
        }))
      },
      1800 // Cache for 30 minutes
    )

    const responseData = {
      categories,
      seo: {
        totalCategories: categories.length,
        categoriesWithProducts: categories.filter(c => c.hasProducts).length
      }
    }

    // Cache the response
    await DatabaseOptimizer.setCachedData(cacheKey, responseData, 1800)

    return NextResponse.json({
      ...responseData,
      _performance: {
        responseTime: Date.now() - startTime,
        cached: false
      }
    })
  } catch (error) {
    console.error('Categories API error:', error)
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
    const data = categorySchema.parse(body)

    const category = await prisma.category.create({
      data,
    })

    // Invalidate category caches after creation
    DatabaseOptimizer.invalidateCache('categories')
    DatabaseOptimizer.invalidateCache('category_stats')

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Create category error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}