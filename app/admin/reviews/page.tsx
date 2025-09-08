'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Star, Search, Check, X, Eye, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { formatDistanceToNow } from 'date-fns'

interface Review {
  id: string
  rating: number
  title?: string
  comment?: string
  isVerified: boolean
  isApproved: boolean
  helpfulVotes: number
  reportCount: number
  createdAt: string
  user: {
    name: string
    email: string
  }
  product: {
    name: string
  }
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('all')

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: '1',
        limit: '50',
        admin: 'true'
      })
      
      if (search) params.append('search', search)
      if (statusFilter !== 'all') {
        params.append('approved', statusFilter === 'approved' ? 'true' : 'false')
      }

      const response = await fetch(`/api/admin/reviews?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setReviews(data.reviews || [])
      } else {
        toast.error('Failed to load reviews')
      }
    } catch (error) {
      toast.error('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const handleApprove = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}/approve`, {
        method: 'POST'
      })

      if (response.ok) {
        toast.success('Review approved')
        setReviews(prev => 
          prev.map(review => 
            review.id === reviewId 
              ? { ...review, isApproved: true }
              : review
          )
        )
      } else {
        toast.error('Failed to approve review')
      }
    } catch (error) {
      toast.error('Failed to approve review')
    }
  }

  const handleReject = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}/reject`, {
        method: 'POST'
      })

      if (response.ok) {
        toast.success('Review rejected')
        setReviews(prev => 
          prev.map(review => 
            review.id === reviewId 
              ? { ...review, isApproved: false }
              : review
          )
        )
      } else {
        toast.error('Failed to reject review')
      }
    } catch (error) {
      toast.error('Failed to reject review')
    }
  }

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return

    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Review deleted')
        setReviews(prev => prev.filter(review => review.id !== reviewId))
      } else {
        toast.error('Failed to delete review')
      }
    } catch (error) {
      toast.error('Failed to delete review')
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
          <p className="text-gray-600">Moderate customer reviews and feedback</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Reviews</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search reviews..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="all">All Reviews</option>
                <option value="pending">Pending Approval</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Stats</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{review.product.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{review.user.name}</p>
                        <p className="text-sm text-gray-500">{review.user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                        <span className="ml-1 text-sm">({review.rating})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {review.title && (
                          <p className="font-medium text-sm truncate">{review.title}</p>
                        )}
                        {review.comment && (
                          <p className="text-sm text-gray-600 truncate">{review.comment}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant={review.isApproved ? 'default' : 'secondary'}>
                          {review.isApproved ? 'Approved' : 'Pending'}
                        </Badge>
                        {review.isVerified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div>👍 {review.helpfulVotes}</div>
                        {review.reportCount > 0 && (
                          <div className="text-red-600">🚩 {review.reportCount}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {!review.isApproved && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(review.id)}
                            className="text-green-600 border-green-600"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        {review.isApproved && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(review.id)}
                            className="text-orange-600 border-orange-600"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(review.id)}
                          className="text-red-600 border-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
