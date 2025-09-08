import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const { id: reviewId } = await params

    // Check if review exists
    const review = await prisma.review.findUnique({
      where: { id: reviewId }
    })

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    // Check if user already voted
    const existingVote = await prisma.reviewHelpfulVote.findUnique({
      where: {
        reviewId_userId: {
          reviewId,
          userId: session.user.id
        }
      }
    })

    if (existingVote) {
      // Remove the vote (toggle)
      await prisma.reviewHelpfulVote.delete({
        where: { id: existingVote.id }
      })

      // Update helpful count
      const updatedReview = await prisma.review.update({
        where: { id: reviewId },
        data: {
          helpfulVotes: {
            decrement: 1
          }
        },
        select: {
          helpfulVotes: true
        }
      })

      return NextResponse.json({ 
        message: 'Helpful vote removed',
        hasVoted: false,
        totalVotes: updatedReview.helpfulVotes
      })
    } else {
      // Add the vote
      await prisma.reviewHelpfulVote.create({
        data: {
          reviewId,
          userId: session.user.id
        }
      })

      // Update helpful count
      const updatedReview = await prisma.review.update({
        where: { id: reviewId },
        data: {
          helpfulVotes: {
            increment: 1
          }
        },
        select: {
          helpfulVotes: true
        }
      })

      return NextResponse.json({ 
        message: 'Review marked as helpful',
        hasVoted: true,
        totalVotes: updatedReview.helpfulVotes
      })
    }
  } catch (error) {
    console.error('Error voting on review:', error)
    return NextResponse.json(
      { error: 'Failed to vote on review' },
      { status: 500 }
    )
  }
}
