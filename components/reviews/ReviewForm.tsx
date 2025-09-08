'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Upload, X } from 'lucide-react'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

interface ReviewFormProps {
  productId: string
  productName: string
  onSubmit?: (review: any) => void
  onCancel?: () => void
  existingReview?: {
    id: string
    rating: number
    title?: string
    comment?: string
    images: string[]
  }
}

export default function ReviewForm({ 
  productId, 
  productName, 
  onSubmit, 
  onCancel,
  existingReview 
}: ReviewFormProps) {
  const { data: session } = useSession()
  const [rating, setRating] = useState(existingReview?.rating || 5)
  const [title, setTitle] = useState(existingReview?.title || '')
  const [comment, setComment] = useState(existingReview?.comment || '')
  const [images, setImages] = useState<string[]>(existingReview?.images || [])
  const [hoveredStar, setHoveredStar] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  if (!session) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-gray-600 mb-4">Please sign in to write a review</p>
          <Button>Sign In</Button>
        </CardContent>
      </Card>
    )
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (images.length >= 5) {
      toast.error('Maximum 5 images allowed')
      return
    }

    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'reviews')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setImages(prev => [...prev, data.url])
        toast.success('Image uploaded successfully')
      } else {
        toast.error('Failed to upload image')
      }
    } catch (error) {
      toast.error('Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!rating) {
      toast.error('Please select a rating')
      return
    }

    setIsSubmitting(true)
    try {
      const url = existingReview 
        ? `/api/reviews/${existingReview.id}` 
        : '/api/reviews'
      
      const method = existingReview ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId,
          rating,
          title: title.trim() || undefined,
          comment: comment.trim() || undefined,
          images
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || 'Review submitted successfully')
        onSubmit?.(data.review)
        
        // Reset form if creating new review
        if (!existingReview) {
          setRating(5)
          setTitle('')
          setComment('')
          setImages([])
        }
      } else {
        toast.error(data.error || 'Failed to submit review')
      }
    } catch (error) {
      toast.error('Failed to submit review')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1
      return (
        <button
          key={index}
          type="button"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredStar(starValue)}
          onMouseLeave={() => setHoveredStar(0)}
          className="focus:outline-none"
        >
          <Star
            className={`h-8 w-8 transition-colors ${
              starValue <= (hoveredStar || rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        </button>
      )
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {existingReview ? 'Edit Your Review' : 'Write a Review'}
        </CardTitle>
        <p className="text-sm text-gray-600">for {productName}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex items-center space-x-1">
              {renderStars()}
              <span className="ml-2 text-sm text-gray-600">
                {rating}/5 stars
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Review Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              maxLength={100}
            />
            <p className="text-xs text-gray-500">{title.length}/100 characters</p>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-gray-500">{comment.length}/1000 characters</p>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>Photos (Optional)</Label>
            <div className="space-y-3">
              {images.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image}
                        alt={`Review image ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {images.length < 5 && (
                <div>
                  <label className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-gray-400 transition-colors">
                      <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {uploadingImage ? 'Uploading...' : 'Click to upload photos'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Max 5 images, 5MB each
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !rating}
            >
              {isSubmitting 
                ? (existingReview ? 'Updating...' : 'Submitting...') 
                : (existingReview ? 'Update Review' : 'Submit Review')
              }
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>

          <p className="text-xs text-gray-500">
            Your review will be visible after admin approval. 
            Reviews from verified purchases are marked as verified.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
