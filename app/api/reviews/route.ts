import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// GET /api/reviews - Get reviews with filters
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const userId = searchParams.get('userId')
    const rating = searchParams.get('rating')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit
    const withStats = searchParams.get('withStats') === 'true'

    const where: any = {
      isApproved: true, // Only show approved reviews publicly
    }

    if (productId) where.productId = productId
    if (userId) where.userId = userId
    if (rating) where.rating = parseInt(rating)

    const [reviews, total, aggregateStats] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              // Add user credibility for social proof
              _count: {
                select: {
                  reviews: true, // Total reviews by this user
                }
              }
            }
          },
          product: {
            select: {
              id: true,
              name: true,
            }
          },
          helpfulVotedBy: session?.user?.id ? {
            where: {
              userId: session.user.id
            }
          } : false,
          _count: {
            select: {
              helpfulVotedBy: true,
              reportedBy: true,
            }
          }
        },
        orderBy: [
          { helpfulVotedBy: { _count: 'desc' } }, // Most helpful first
          { rating: 'desc' }, // Higher ratings next
          { createdAt: 'desc' } // Then by recency
        ],
        skip,
        take: limit,
      }),
      prisma.review.count({ where }),
      // Get aggregate stats for social proof
      withStats ? prisma.review.groupBy({
        by: ['rating'],
        where: productId ? { productId, isApproved: true } : { isApproved: true },
        _count: {
          rating: true,
        },
      }) : null,
    ])

    // Calculate enhanced social proof metrics
    const enhancedReviews = reviews.map(review => ({
      ...review,
      // Add social proof indicators
      isVerifiedReviewer: review.user._count.reviews >= 3, // Users with 3+ reviews are "verified"
      helpfulnessScore: review._count.helpfulVotedBy,
      // Add time-based freshness
      isFresh: new Date(review.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
    }))

    // Calculate rating distribution for social proof
    let ratingDistribution = null
    if (aggregateStats) {
      const totalReviews = aggregateStats.reduce((sum, stat) => sum + stat._count.rating, 0)
      ratingDistribution = {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
        ...aggregateStats.reduce((acc, stat) => ({
          ...acc,
          [stat.rating]: Math.round((stat._count.rating / totalReviews) * 100)
        }), {})
      }
    }

    return NextResponse.json({
      reviews: enhancedReviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      // Enhanced social proof data
      socialProof: {
        totalReviews: total,
        averageRating: enhancedReviews.length > 0 
          ? enhancedReviews.reduce((sum, review) => sum + review.rating, 0) / enhancedReviews.length 
          : 0,
        ratingDistribution,
        verifiedReviewersCount: enhancedReviews.filter(r => r.isVerifiedReviewer).length,
        recentReviewsCount: enhancedReviews.filter(r => r.isFresh).length,
      }
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
         