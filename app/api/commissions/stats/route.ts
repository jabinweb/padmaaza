import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Get total earnings
    const totalEarningsResult = await prisma.commission.aggregate({
      where: {
        userId,
        status: { in: ['APPROVED', 'PAID'] }
      },
      _sum: {
        amount: true
      }
    })

    // Get pending amount
    const pendingAmountResult = await prisma.commission.aggregate({
      where: {
        userId,
        status: 'PENDING'
      },
      _sum: {
        amount: true
      }
    })

    // Get this month earnings
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    const thisMonthResult = await prisma.commission.aggregate({
      where: {
        userId,
        status: { in: ['APPROVED', 'PAID'] },
        createdAt: {
          gte: startOfMonth
        }
      },
      _sum: {
        amount: true
      }
    })

    // Get total commissions count
    const totalCommissions = await prisma.commission.count({
      where: { userId }
    })

    // Get earnings by level
    const byLevel = await prisma.commission.groupBy({
      by: ['level'],
      where: {
        userId,
        status: { in: ['APPROVED', 'PAID'] }
      },
      _sum: {
        amount: true
      },
      _count: {
        id: true
      },
      orderBy: {
        level: 'asc'
      }
    })

    return NextResponse.json({
      totalEarnings: totalEarningsResult._sum.amount || 0,
      pendingAmount: pendingAmountResult._sum.amount || 0,
      thisMonthEarnings: thisMonthResult._sum.amount || 0,
      totalCommissions,
      byLevel: byLevel.map(item => ({
        level: item.level,
        amount: item._sum.amount || 0,
        count: item._count.id
      }))
    })
  } catch (error) {
    console.error('Error fetching commission stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch commission stats' },
      { status: 500 }
    )
  }
}
