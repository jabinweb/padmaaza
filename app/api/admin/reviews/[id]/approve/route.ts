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
      data: { isApproved: true }
    })

    return NextResponse.json({ review })
  } catch (error) {
    console.error('Error approving review:', error)
    return NextResponse.json(
      { error: 'Failed to approve review' },
      { status: 500 }
    )
  }
}
