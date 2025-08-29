import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's direct referrals
    const referrals = await prisma.user.findMany({
      where: {
        referrerId: session.user.id
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        joinedAt: true,
        isActive: true,
        orders: {
          where: {
            status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] }
          },
          select: {
            total: true
          }
        },
        // Get commissions earned from this referral
        commissionsFrom: {
          where: {
            userId: session.user.id,
            status: { in: ['APPROVED', 'PAID'] }
          },
          select: {
            amount: true
          }
        }
      }
    })

    const formattedReferrals = referrals.map(referral => ({
      id: referral.id,
      name: referral.name || 'User',
      email: referral.email,
      phone: referral.phone,
      joinedAt: referral.joinedAt,
      isActive: referral.isActive,
      totalOrders: referral.orders.length,
      totalSpent: referral.orders.reduce((sum, order) => sum + order.total, 0),
      commissionEarned: referral.commissionsFrom.reduce((sum, comm) => sum + comm.amount, 0),
      status: referral.isActive ? 'ACTIVE' : 'INACTIVE'
    }))

    return NextResponse.json({
      referrals: formattedReferrals
    })

  } catch (error) {
    console.error('Error fetching referrals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch referrals' },
      { status: 500 }
    )
  }
}
