import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get total commissions count
    const totalCommissions = await prisma.commission.count()

    // Get amounts by status
    const [pendingResult, approvedResult, paidResult] = await Promise.all([
      prisma.commission.aggregate({
        where: { status: 'PENDING' },
        _sum: { amount: true }
      }),
      prisma.commission.aggregate({
        where: { status: 'APPROVED' },
        _sum: { amount: true }
      }),
      prisma.commission.aggregate({
        where: { status: 'PAID' },
        _sum: { amount: true }
      })
    ])

    // Get this month commissions
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const thisMonthCommissions = await prisma.commission.count({
      where: {
        createdAt: { gte: startOfMonth }
      }
    })

    // Calculate average commission
    const totalAmount = (pendingResult._sum.amount || 0) + (approvedResult._sum.amount || 0) + (paidResult._sum.amount || 0)
    const averageCommission = totalCommissions > 0 ? totalAmount / totalCommissions : 0

    return NextResponse.json({
      totalCommissions: totalCommissions || 0,
      pendingAmount: pendingResult._sum.amount || 0,
      approvedAmount: approvedResult._sum.amount || 0,
      paidAmount: paidResult._sum.amount || 0,
      thisMonthCommissions: thisMonthCommissions || 0,
      averageCommission: averageCommission || 0
    })
  } catch (error) {
    console.error('Error fetching commission stats:', error)
    return NextResponse.json({
      totalCommissions: 0,
      pendingAmount: 0,
      approvedAmount: 0,
      paidAmount: 0,
      thisMonthCommissions: 0,
      averageCommission: 0
    })
  }
}
