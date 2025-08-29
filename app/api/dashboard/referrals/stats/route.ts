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

    // Get total referrals
    const totalReferrals = await prisma.user.count({
      where: { referrerId: userId }
    })

    // Get active referrals
    const activeReferrals = await prisma.user.count({
      where: { 
        referrerId: userId,
        isActive: true
      }
    })

    // Get pending referrals
    const pendingReferrals = await prisma.user.count({
      where: { 
        referrerId: userId,
        isActive: false
      }
    })

    // Get total commission earned from referrals
    const totalCommissionResult = await prisma.commission.aggregate({
      where: {
        userId,
        status: { in: ['APPROVED', 'PAID'] }
      },
      _sum: {
        amount: true
      }
    })

    // Get this month's stats
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const thisMonthReferrals = await prisma.user.count({
      where: {
        referrerId: userId,
        joinedAt: {
          gte: startOfMonth
        }
      }
    })

    const thisMonthCommissionResult = await prisma.commission.aggregate({
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

    return NextResponse.json({
      totalReferrals,
      activeReferrals,
      pendingReferrals,
      totalCommissionEarned: totalCommissionResult._sum.amount || 0,
      thisMonthReferrals,
      thisMonthCommission: thisMonthCommissionResult._sum.amount || 0
    })

  } catch (error) {
    console.error('Error fetching referral stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch referral stats' },
      { status: 500 }
    )
  }
}
