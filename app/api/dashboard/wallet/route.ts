import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Get wallet info
    const wallet = await prisma.wallet.findUnique({
      where: { userId }
    })

    // Mock transaction history (you can implement proper transaction tracking)
    const commissions = await prisma.commission.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        fromUser: {
          select: { name: true }
        }
      }
    })

    const payouts = await prisma.payout.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    })

    // Combine and format transactions
    const transactions = [
      ...commissions.map(commission => ({
        id: commission.id,
        type: 'COMMISSION' as const,
        amount: commission.amount,
        description: `Level ${commission.level} commission from ${commission.fromUser.name}`,
        status: commission.status,
        createdAt: commission.createdAt
      })),
      ...payouts.map(payout => ({
        id: payout.id,
        type: 'PAYOUT' as const,
        amount: payout.amount,
        description: 'Withdrawal request',
        status: payout.status,
        createdAt: payout.createdAt
      }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      balance: wallet?.balance || 0,
      totalEarnings: wallet?.totalEarnings || 0,
      totalWithdrawn: wallet?.totalWithdrawn || 0,
      transactions
    })
  } catch (error) {
    console.error('Error fetching wallet data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wallet data' },
      { status: 500 }
    )
  }
}
