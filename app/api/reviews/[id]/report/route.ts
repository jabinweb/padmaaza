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
    const body = await request.json()
    const { reason, comment } = body

    // Validate reason
    const validReasons = ['SPAM', 'INAPPROPRIATE', 'FAKE', 'OFFENSIVE', 'OTHER']
    if (!reason || !validReasons.includes(reason)) {
      return NextResponse.json(
        { error: 'Valid reason is required' },
        { status: 400 }
      )
    }

    // Check if review exists
    const review = await prisma.review.findUnique({
      where: { id: reviewId }
    })

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    // Check if user already reported this review
    const existingReport = await prisma.reviewReport.findUnique({
      where: {
        reviewId_userId: {
          reviewId,
          userId: session.user.id
        }
      }
    })

    if (existingReport) {
      return NextResponse.json(
        { error: 'You have already reported this review' },
        { status: 400 }
      )
    }

    // Create the report
    await prisma.reviewReport.create({
      data: {
        reviewId,
        userId: session.user.id,
        reason,
        comment
      }
    })

    // Update report count
    await prisma.review.update({
      where: { id: reviewId },
      data: {
        reportCount: {
          increment: 1
        }
      }
    })

    return NextResponse.json({ 
      message: 'Review reported successfully. Thank you for helping us maintain quality.' 
    })
  } catch (error) {
    console.error('Error reporting review:', error)
    return NextResponse.json(
      { error: 'Failed to report review' },
      { status: 500 }
    )
  }
}
