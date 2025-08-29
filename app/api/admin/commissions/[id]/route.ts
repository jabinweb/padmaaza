import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: commissionId } = await params
    const { status } = await request.json()

    // Validate status
    if (!['PENDING', 'APPROVED', 'PAID', 'CANCELLED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const commission = await prisma.commission.update({
      where: { id: commissionId },
      data: { status }
    })

    return NextResponse.json(commission)
  } catch (error) {
    console.error('Error updating commission:', error)
    return NextResponse.json(
      { error: 'Failed to update commission' },
      { status: 500 }
    )
  }
}
