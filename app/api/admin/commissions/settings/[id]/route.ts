import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: settingId } = await params
    const { level, percentage, isActive } = await request.json()

    const setting = await prisma.commissionSettings.update({
      where: { id: settingId },
      data: {
        level,
        percentage,
        isActive
      }
    })

    return NextResponse.json(setting)
  } catch (error) {
    console.error('Error updating commission setting:', error)
    return NextResponse.json(
      { error: 'Failed to update commission setting' },
      { status: 500 }
    )
  }
}
