import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

interface Props {
  params: Promise<{ id: string }>
}

export async function POST(
  request: NextRequest,
  { params }: Props
) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const review = await prisma.review.update({
      where: { id },
      data: { isApproved: false }
    })

    return NextResponse.json({ review })
  } catch (error) {
    console.error('Error rejecting review:', error)
    return NextResponse.json(
      { error: 'Failed to reject review' },
      { status: 500 }
    )
  }
}
