'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Filter, Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

interface Review {
  id: string
  rating: number
  title?: string
  comment?: string
  images: string[]
  isVerified: boolean
  helpfulVotes: number
  createdAt: string
  userHasVoted?: boolean // Track if current user has voted this review as helpful
  user: {
    id: string
    name: string
    image?: string
  }
  _count?: {
    helpfulVotedBy: number
  }
}

interface ReviewsListProps {
  productId: string
  productName: string
  averageRating?: number
  totalReviews?: number
  ratingBreakdown?: { [key: number]: number }
  disableImageUpload?: boolean
}

export default function ReviewsList({ 
  productId, 
  productName, 
  averageRating = 0,
  totalReviews = 0,
  ratingBreakdown = {},
  disableImageUpload = false
}: ReviewsListProps) {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [ratingFilter, setRatingFilter] = useState<string>('all')
  const [showForm, setShowForm] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null)
  const [userReview, setUserReview] = useState<Review | null>(null)
  const [allReviews, setAllReviews] = useState<Review[]>([])
  const [calculatedStats, setCalculatedStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingBreakdown: {} as { [key: number]: number }
  })
  
  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews-section')
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      // If there are no reviews, automatically show the form
      if (calculatedStats.totalReviews === 0) {
        setTimeout(() => setShowForm(true), 500)
      }
    }
  }

  const calculateStats = useCallback((allReviewsData: Review[]) => {
    const total = allReviewsData.length
    if (total === 0) {
      setCalculatedStats({
        averageRating: 0,
        totalReviews: 0,
        ratingBreakdown: {}
      })
      return
    }

    const sum = allReviewsData.reduce((acc, review) => acc + review.rating, 0)
    const avg = sum / total

    const breakdown: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    allReviewsData.forEach(review => {
      breakdown[review.rating] = (breakdown[review.rating] || 0) + 1
    })

    setCalculatedStats({
      averageRating: avg,
      totalReviews: total,
      ratingBreakdown: breakdown
    })
  }, [])

    const fetchAllReviewsForStats = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        productId,
        limit: '1000' // Get all reviews for stats
      })

      const response = await fetch(`/api/reviews?${params}`)
      const data = await response.json()

      if (response.ok) {
        setAllReviews(data.reviews)
        calculateStats(data.reviews)
      }
    } catch (error) {
      console.error('Failed to fetch all reviews for stats:', error)
    }
  }, [productId, calculateStats])

  const fetchReviews = useCallback(async (resetList = false) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        productId,
        page: resetList ? '1' : page.toString(),
        limit: '10'
      })

      if (ratingFilter !== 'all') {
        params.append('rating', ratingFilter)
      }

      const response = await fetch(`/api/reviews?${params}`)
      const data = await response.json()

      if (response.ok) {
        if (resetList) {
          setReviews(data.reviews)
          setPage(1)
        } else {
          setReviews(prev => [...prev, ...data.reviews])
        }
        setHasMore(data.pagination.page < data.pagination.pages)
        
        // Check if current user has a review
        if (session?.user) {
          const userReviewInList = data.reviews.find(
            (review: Review) => review.user.id === session.user.id
          )
          setUserReview(userReviewInList || null)
        }

        // If this is the first page, also fetch all reviews for stats
        if (resetList) {
          fetchAllReviewsForStats()
        }
      } else {
        toast.error('Failed to load reviews')
      }
    } catch (error) {
      toast.error('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }, [productId, page, ratingFilter, session?.user, fetchAllReviewsForStats])



  useEffect(() => {
    fetchReviews(true)
  }, [fetchReviews])

  const loadMore = () => {
    setPage(prev => prev + 1)
    fetchReviews()
  }

  const handleReviewSubmit = (newReview: Review) => {
    setShowForm(false)
    setEditingReview(null)
    setUserReview(newReview)
    fetchReviews(true) // Refresh the list
  }

  const handleEdit = (review: Review) => {
    setEditingReview(review)
    setShowForm(true)
  }

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Review deleted successfully')
        setReviews(prev => prev.filter(review => review.id !== reviewId))
        setUserReview(null)
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to delete review')
      }
    } catch (error) {
      toast.error('Failed to delete review')
    }
  }

  const handleHelpfulVote = async (reviewId: string) => {
    if (!session?.user) {
      toast.error('Please sign in to vote')
      return
    }

    try {
      const response = await fetch(`/api/reviews/${reviewId}/helpful`, {
        method: 'POST'
      })

      if (response.ok) {
        const data = await response.json()
        
        // Update the review in the list with new vote status and count
        setReviews(prev => prev.map(review => 
          review.id === reviewId 
            ? { 
                ...review, 
                userHasVoted: data.hasVoted,
                helpfulVotes: data.totalVotes,
                _count: {
                  ...review._count,
                  helpfulVotedBy: data.totalVotes
                }
              }
            : review
        ))

        toast.success(data.hasVoted ? 'Marked as helpful' : 'Removed helpful vote')
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to vote')
      }
    } catch (error) {
      toast.error('Failed to vote')
    }
  }

  const renderRatingBreakdown = () => {
    if (!calculatedStats.totalReviews) return null

    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map(rating => {
          const count = calculatedStats.ratingBreakdown[rating] || 0
          const percentage = calculatedStats.totalReviews > 0 ? (count / calculatedStats.totalReviews) * 100 : 0

          return (
            <div key={rating} className="flex items-center space-x-2 text-sm">
              <div className="flex items-center space-x-1 w-16">
                <span>{rating}</span>
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-right">{count}</span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div id="reviews-section" className="space-y-6">
      {/* Reviews Summary - Only show if there are reviews */}
      {calculatedStats.totalReviews > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Customer Reviews</span>
              {session && !userReview && !showForm && (
                <Button onClick={scrollToReviews}>
                  <Plus className="h-4 w-4 mr-2" />
                  Write Review
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{calculatedStats.averageRating.toFixed(1)}</div>
                <div className="flex items-center justify-center mb-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < Math.round(calculatedStats.averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{calculatedStats.totalReviews} reviews</p>
              </div>

              {/* Rating Breakdown */}
              <div>
                <h4 className="font-semibold mb-3">Rating Breakdown</h4>
                {renderRatingBreakdown()}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Reviews State - Show when there are no reviews */}
      {calculatedStats.totalReviews === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className="h-8 w-8 text-gray-300"
                  />
                ))}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600 mb-4">Be the first to review this product</p>
                {session ? (
                  <Button onClick={() => setShowForm(true)} className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Write First Review
                  </Button>
                ) : (
                  <p className="text-sm text-gray-500">Sign in to write a review</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review Form */}
      {showForm && (
        <ReviewForm
          productId={productId}
          productName={productName}
          existingReview={editingReview || undefined}
          disableImageUpload={disableImageUpload}
          onSubmit={handleReviewSubmit}
          onCancel={() => {
            setShowForm(false)
            setEditingReview(null)
          }}
        />
      )}

      {/* Filters and Reviews List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">All Reviews ({calculatedStats.totalReviews})</h3>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reviews */}
        {loading && reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No reviews yet</p>
            {session && !userReview && (
              <Button onClick={() => setShowForm(true)}>
                Be the first to review
              </Button>
            )}
          </div>
        ) : (
          <div>
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onHelpfulVote={handleHelpfulVote}
                userHasVoted={review.userHasVoted || false}
              />
            ))}

            {hasMore && (
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  onClick={loadMore}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More Reviews'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
