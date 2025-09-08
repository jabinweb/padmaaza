'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, ThumbsUp, Flag, MoreHorizontal, Edit, Trash2, Verified } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
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
  user: {
    id: string
    name: string
    image?: string
  }
  _count?: {
    helpfulVotedBy: number
  }
}

interface ReviewCardProps {
  review: Review
  onEdit?: (review: Review) => void
  onDelete?: (reviewId: string) => void
  onHelpfulVote?: (reviewId: string) => void
  onReport?: (reviewId: string) => void
  userHasVoted?: boolean
}

export default function ReviewCard({ 
  review, 
  onEdit, 
  onDelete, 
  onHelpfulVote, 
  onReport,
  userHasVoted = false 
}: ReviewCardProps) {
  const { data: session } = useSession()
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(userHasVoted)
  const [voteCount, setVoteCount] = useState(review.helpfulVotes)

  const isOwner = session?.user?.id === review.user.id

  const handleHelpfulVote = async () => {
    if (!session) {
      toast.error('Please sign in to vote on reviews')
      return
    }

    setIsVoting(true)
    try {
      const response = await fetch(`/api/reviews/${review.id}/helpful`, {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok) {
        setHasVoted(data.voted)
        setVoteCount(prev => data.voted ? prev + 1 : prev - 1)
        toast.success(data.message)
        onHelpfulVote?.(review.id)
      } else {
        toast.error(data.error || 'Failed to vote')
      }
    } catch (error) {
      toast.error('Failed to vote on review')
    } finally {
      setIsVoting(false)
    }
  }

  const handleReport = () => {
    if (!session) {
      toast.error('Please sign in to report reviews')
      return
    }
    onReport?.(review.id)
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
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.user.image} alt={review.user.name} />
              <AvatarFallback>
                {review.user.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{review.user.name}</span>
                {review.isVerified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Verified className="h-3 w-3 mr-1" />
                    Verified Purchase
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit?.(review)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Review
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete?.(review.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Review
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {review.title && (
          <h4 className="font-semibold mb-2">{review.title}</h4>
        )}
        
        {review.comment && (
          <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
        )}

        {review.images.length > 0 && (
          <div className="flex space-x-2 mb-3 overflow-x-auto">
            {review.images.map((image, index) => (
              <div key={index} className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={image}
                  alt={`Review image ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHelpfulVote}
              disabled={isVoting}
              className={`${hasVoted ? 'text-green-600' : 'text-gray-600'}`}
            >
              <ThumbsUp className={`h-4 w-4 mr-1 ${hasVoted ? 'fill-current' : ''}`} />
              Helpful ({voteCount})
            </Button>
          </div>

          {!isOwner && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReport}
              className="text-gray-600 hover:text-red-600"
            >
              <Flag className="h-4 w-4 mr-1" />
              Report
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
