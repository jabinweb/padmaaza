import { prisma } from '@/lib/prisma'

export async function calculateCommissions(orderId: string) {
  try {
    // Get the order with user and referrer information
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          include: {
            referrer: true
          }
        },
        orderItems: {
          include: {
            product: true
          }
        }
      }
    })

    if (!order || !order.user.referrerId) {
      return { success: false, message: 'No referrer found for commission calculation' }
    }

    // Get commission settings
    const commissionSettings = await prisma.commissionSettings.findMany({
      where: { isActive: true },
      orderBy: { level: 'asc' }
    })

    if (commissionSettings.length === 0) {
      return { success: false, message: 'No commission settings configured' }
    }

    const commissions = []
    let currentUser: any = order.user
    let level = 1

    // Calculate commissions for each level
    for (const setting of commissionSettings) {
      if (!currentUser.referrerId || level > setting.level) break

      // Get referrer with rank information
      const referrer = await prisma.user.findUnique({
        where: { id: currentUser.referrerId },
        include: { 
          referrer: true,
          currentRank: true
        }
      })

      if (!referrer) break

      // Calculate base commission amount
      let commissionAmount = (order.total * setting.percentage) / 100

      // Apply rank multiplier if available
      if (referrer.currentRank) {
        commissionAmount *= referrer.currentRank.commissionMultiplier
      }

      // Create commission record
      const commission = await prisma.commission.create({
        data: {
          userId: referrer.id,
          fromUserId: order.userId,
          orderId: order.id,
          amount: commissionAmount,
          level: setting.level,
          type: 'REFERRAL',
          status: 'APPROVED'
        }
      })

      // Update referrer's wallet
      await prisma.wallet.upsert({
        where: { userId: referrer.id },
        update: {
          balance: { increment: commissionAmount },
          totalEarnings: { increment: commissionAmount }
        },
        create: {
          userId: referrer.id,
          balance: commissionAmount,
          totalEarnings: commissionAmount,
          totalWithdrawn: 0
        }
      })

      commissions.push({
        referrerId: referrer.id,
        amount: commissionAmount,
        level: setting.level
      })

      // Update currentUser to the referrer for next iteration
      currentUser = referrer
      level++
    }

    return {
      success: true,
      commissions,
      message: `Generated ${commissions.length} commission(s)`
    }
  } catch (error) {
    console.error('Error calculating commissions:', error)
    return {
      success: false,
      message: 'Failed to calculate commissions',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function getCommissionSettings() {
  try {
    const settings = await prisma.commissionSettings.findMany({
      where: { isActive: true },
      orderBy: { level: 'asc' }
    })

    return { success: true, settings }
  } catch (error) {
    console.error('Error fetching commission settings:', error)
    return { success: false, settings: [] }
  }
}

export function calculateCommissionAmount(
  orderTotal: number, 
  percentage: number, 
  rankMultiplier: number = 1
): number {
  const baseCommission = (orderTotal * percentage) / 100
  return baseCommission * rankMultiplier
}

export class CommissionService {
  static async calculateCommissions(orderId: string) {
    return calculateCommissions(orderId)
  }

  static async getCommissionSettings() {
    return getCommissionSettings()
  }

  static calculateCommissionAmount(
    orderTotal: number, 
    percentage: number, 
    rankMultiplier: number = 1
  ): number {
    return calculateCommissionAmount(orderTotal, percentage, rankMultiplier)
  }

  static async getUserCommissions(userId: string, limit: number = 10) {
    try {
      const commissions = await prisma.commission.findMany({
        where: { userId },
        include: {
          fromUser: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: limit
      })

      return { success: true, commissions }
    } catch (error) {
      console.error('Error fetching user commissions:', error)
      return { success: false, commissions: [] }
    }
  }

  static async getCommissionStats(userId: string) {
    try {
      const [totalEarnings, pendingCommissions, thisMonthEarnings] = await Promise.all([
        prisma.commission.aggregate({
          where: {
            userId,
            status: { in: ['APPROVED', 'PAID'] }
          },
          _sum: { amount: true }
        }),
        prisma.commission.aggregate({
          where: {
            userId,
            status: 'PENDING'
          },
          _sum: { amount: true }
        }),
        prisma.commission.aggregate({
          where: {
            userId,
            status: { in: ['APPROVED', 'PAID'] },
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          },
          _sum: { amount: true }
        })
      ])

      return {
        success: true,
        stats: {
          totalEarnings: totalEarnings._sum.amount || 0,
          pendingCommissions: pendingCommissions._sum.amount || 0,
          thisMonthEarnings: thisMonthEarnings._sum.amount || 0
        }
      }
    } catch (error) {
      console.error('Error fetching commission stats:', error)
      return {
        success: false,
        stats: {
          totalEarnings: 0,
          pendingCommissions: 0,
          thisMonthEarnings: 0
        }
      }
    }
  }

  static async getTeamStats(userId: string) {
    try {
      // Get direct referrals count
      const directReferrals = await prisma.user.count({
        where: { referrerId: userId }
      })

      // Get total team size (all levels)
      const allReferrals = await this.getAllReferrals(userId)
      const totalTeamSize = allReferrals.length

      // Get team sales volume (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const teamSalesResult = await prisma.order.aggregate({
        where: {
          userId: { in: allReferrals },
          status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
          createdAt: { gte: thirtyDaysAgo }
        },
        _sum: { total: true }
      })

      // Get active team members (made purchase in last 30 days)
      const activeMembers = await prisma.user.count({
        where: {
          id: { in: allReferrals },
          orders: {
            some: {
              status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
              createdAt: { gte: thirtyDaysAgo }
            }
          }
        }
      })

      return {
        success: true,
        stats: {
          directReferrals,
          totalTeamSize,
          activeMembers,
          teamSalesVolume: teamSalesResult._sum.total || 0
        }
      }
    } catch (error) {
      console.error('Error fetching team stats:', error)
      return {
        success: false,
        stats: {
          directReferrals: 0,
          totalTeamSize: 0,
          activeMembers: 0,
          teamSalesVolume: 0
        }
      }
    }
  }

  private static async getAllReferrals(userId: string, visited = new Set<string>()): Promise<string[]> {
    if (visited.has(userId)) return []
    visited.add(userId)

    const directReferrals = await prisma.user.findMany({
      where: { referrerId: userId },
      select: { id: true }
    })

    let allReferrals = directReferrals.map(r => r.id)

    // Recursively get referrals of referrals
    for (const referral of directReferrals) {
      const subReferrals = await this.getAllReferrals(referral.id, visited)
      allReferrals = [...allReferrals, ...subReferrals]
    }

    return allReferrals
  }
}