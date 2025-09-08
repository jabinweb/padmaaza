import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DatabaseOptimizer } from '@/lib/database-optimizer'

// GET /api/social-proof - Get aggregated social proof data
export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    // Create cache key
    const cacheKey = `social_proof_${productId || 'global'}`
    
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

    // Get comprehensive social proof metrics with optimization
    const [
      totalUsers,
      totalReviews,
      recentReviews,
      topRatedProducts,
      verifiedReviewers,
      recentOrders,
      averageRatings,
    ] = await Promise.all([
      // Optimized total active users
      DatabaseOptimizer.executeOptimizedQuery(
        'total_active_users',
        () => prisma.user.count({
          where: {
            isActive: true,
            role: 'CUSTOMER'
          }
        }),
        1800 // Cache for 30 minutes
      ),
      
      // Optimized total approved reviews
      DatabaseOptimizer.executeOptimizedQuery(
        `total_reviews_${productId || 'all'}`,
        () => prisma.review.count({
          where: {
            isApproved: true,
            ...(productId && { productId })
          }
        }),
        600 // Cache for 10 minutes
      ),
      
      // Optimized recent reviews (last 7 days)
      DatabaseOptimizer.executeOptimizedQuery(
        `recent_reviews_${productId || 'all'}`,
        () => prisma.review.count({
          where: {
            isApproved: true,
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            },
            ...(productId && { productId })
          }
        }),
        300 // Cache for 5 minutes
      ),
      
      // Optimized top rated products for social proof
      DatabaseOptimizer.executeOptimizedQuery(
        'top_rated_products',
        () => prisma.product.findMany({
          where: {
            isActive: true,
          stock: { gt: 0 },
          reviews: {
            some: {
              isApproved: true,
              rating: { gte: 4 }
            }
          }
        },
        include: {
          reviews: {
            where: { isApproved: true },
            select: { rating: true }
          },
          _count: {
            select: {
              reviews: true,
              orderItems: true
            }
          }
        },
        take: 5,
        orderBy: {
          reviews: {
            _count: 'desc'
          }
        }
        }),
        900 // Cache for 15 minutes
      ),
      
      // Optimized verified reviewers - get users with multiple reviews
      DatabaseOptimizer.executeOptimizedQuery(
        'verified_reviewers_count',
        async () => {
          const users = await prisma.user.findMany({
            where: {
              isActive: true,
              reviews: {
                some: {
                  isApproved: true
                }
              }
            },
            include: {
              _count: {
                select: {
                  reviews: {
                    where: {
                      isApproved: true
                    }
                  }
                }
              }
            }
          })
          return users.filter(user => user._count.reviews >= 3).length
        },
        1800 // Cache for 30 minutes
      ),
      
      // Optimized recent orders for activity proof
      DatabaseOptimizer.executeOptimizedQuery(
        'recent_orders_count',
        () => prisma.order.count({
          where: {
            status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
            }
          }
        }),
        300 // Cache for 5 minutes
      ),
      
      // Optimized average ratings by category
      DatabaseOptimizer.executeOptimizedQuery(
        `average_ratings_${productId || 'all'}`,
        () => prisma.review.groupBy({
          by: ['productId'],
          where: {
            isApproved: true,
            ...(productId && { productId })
          },
          _avg: {
            rating: true
          },
          _count: {
            rating: true
          },
          having: {
            rating: {
              _count: {
                gte: 3 // At least 3 reviews
              }
            }
          }
        }),
        600 // Cache for 10 minutes
      )
    ])

    // Calculate enhanced social proof metrics
    const topRatedWithMetrics = topRatedProducts.map(product => ({
      id: product.id,
      name: product.name,
      averageRating: product.reviews.length > 0 
        ? Math.round((product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length) * 10) / 10
        : 0,
      totalReviews: product._count.reviews,
      totalOrders: product._count.orderItems,
      popularityScore: product._count.orderItems + (product._count.reviews * 2)
    })).filter(product => product.averageRating >= 4.0)

    const overallAverageRating = averageRatings.length > 0
      ? Math.round((averageRatings.reduce((sum, item) => sum + (item._avg.rating || 0), 0) / averageRatings.length) * 10) / 10
      : 0

    const responseData = {
      socialProof: {
        totalCustomers: totalUsers,
        totalReviews,
        recentReviews,
        verifiedReviewers,
        recentOrders,
        overallAverageRating,
        topRatedProducts: topRatedWithMetrics,
        trustIndicators: {
          hasRecentActivity: recentOrders > 0,
          hasRecentReviews: recentReviews > 0,
          hasVerifiedReviewers: verifiedReviewers > 0,
          highRatingProducts: topRatedWithMetrics.length > 0,
        },
        metrics: {
          reviewEngagement: totalReviews > 0 ? Math.round((recentReviews / totalReviews) * 100) : 0,
          customerRetention: totalUsers > 0 ? Math.round((verifiedReviewers / totalUsers) * 100) : 0,
          productSatisfaction: Math.round(overallAverageRating * 20), // Convert to percentage
        }
      }
    }

    // Cache the response
    await DatabaseOptimizer.setCachedData(cacheKey, responseData, 600)

    return NextResponse.json({
      ...responseData,
      _performance: {
        responseTime: Date.now() - startTime,
        cached: false
      }
    })
  } catch (error) {
    console.error('Error fetching social proof data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social proof data' },
      { status: 500 }
    )
  }
}
