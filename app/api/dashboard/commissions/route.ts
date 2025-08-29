import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [commissions, total] = await Promise.all([
      prisma.commission.findMany({
        where: { userId: session.user.id },
        include: {
          fromUser: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.commission.count({ where: { userId: session.user.id } })
    ])

    return NextResponse.json({
      commissions: commissions.map(commission => ({
        id: commission.id,
        amount: commission.amount,
        level: commission.level,
        type: commission.type,
        status: commission.status,
        createdAt: commission.createdAt,
        fromUser: commission.fromUser
      })),
      total,
      pages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Error fetching commissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch commissions' },
      { status: 500 }
    )
  }
}
