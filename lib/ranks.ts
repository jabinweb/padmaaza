import { prisma } from '@/lib/prisma'
import { emailService } from '@/lib/email'

interface RankCalculation {
  totalReferrals: number
  salesVolume: number
  teamVolume: number
}

export class RankSystem {
  async calculateUserMetrics(userId: string): Promise<RankCalculation> {
    // Get direct referrals count
    const totalReferrals = await prisma.user.count({
      where: { referrerId: userId }
    })

    // Get user's personal sales volume (last 30 days)
    const salesVolumeResult = await prisma.order.aggregate({
      where: {
        userId,
        status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      },
      _sum: { total: true }
    })

    // Get team sales volume (referrals' sales in last 30 days)
    const referralIds = await prisma.user.findMany({
      where: { referrerId: userId },
      select: { id: true }
    }).then(users => users.map(u => u.id))

    const teamVolumeResult = await prisma.order.aggregate({
      where: {
        userId: { in: referralIds },
        status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] },
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      },
      _sum: { total: true }
    })

    return {
      totalReferrals,
      salesVolume: salesVolumeResult._sum.total || 0,
      teamVolume: teamVolumeResult._sum.total || 0
    }
  }

  async getEligibleRank(metrics: RankCalculation) {
    const ranks = await prisma.rank.findMany({
      where: { isActive: true },
      orderBy: { order: 'desc' }
    })

    // Find highest rank user qualifies for
    for (const rank of ranks) {
      if (
        metrics.totalReferrals >= rank.minReferrals &&
        metrics.salesVolume >= rank.minSalesVolume &&
        metrics.teamVolume >= rank.minTeamVolume
      ) {
        return rank
      }
    }

    return null
  }

  async updateUserRank(userId: string) {
    try {
      const metrics = await this.calculateUserMetrics(userId)
      const eligibleRank = await this.getEligibleRank(metrics)

      if (!eligibleRank) return null

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { currentRank: true }
      })

      if (!user) return null

      // Check if this is a rank upgrade
      const isUpgrade = !user.currentRank || eligibleRank.order > user.currentRank.order

      if (isUpgrade) {
        // Update user's current rank
        await prisma.user.update({
          where: { id: userId },
          data: { currentRankId: eligibleRank.id }
        })

        // Record achievement
        await prisma.rankAchievement.upsert({
          where: {
            userId_rankId: {
              userId,
              rankId: eligibleRank.id
            }
          },
          update: {},
          create: {
            userId,
            rankId: eligibleRank.id
          }
        })

        // Send achievement email
        try {
          await emailService.sendRankAchievement(user.email, user.name || 'User', eligibleRank)
        } catch (emailError) {
          console.error('Failed to send rank achievement email:', emailError)
        }

        console.log(`User ${user.email} achieved rank: ${eligibleRank.name}`)
        return eligibleRank
      }

      return null
    } catch (error) {
      console.error('Error updating user rank:', error)
      return null
    }
  }

  async initializeDefaultRanks() {
    const existingRanks = await prisma.rank.count()
    
    if (existingRanks === 0) {
      const defaultRanks = [
        {
          name: 'Bronze',
          description: 'Welcome to the journey!',
          minReferrals: 0,
          minSalesVolume: 0,
          minTeamVolume: 0,
          commissionMultiplier: 1.0,
          benefits: ['Basic commission rates', 'Access to all products'],
          color: '#CD7F32',
          icon: '🥉',
          order: 1
        },
        {
          name: 'Silver',
          description: 'Building momentum!',
          minReferrals: 3,
          minSalesVolume: 5000,
          minTeamVolume: 10000,
          commissionMultiplier: 1.2,
          benefits: ['20% commission bonus', 'Priority support', 'Monthly bonuses'],
          color: '#C0C0C0',
          icon: '🥈',
          order: 2
        },
        {
          name: 'Gold',
          description: 'Excellent performance!',
          minReferrals: 5,
          minSalesVolume: 15000,
          minTeamVolume: 30000,
          commissionMultiplier: 1.5,
          benefits: ['50% commission bonus', 'VIP support', 'Exclusive events'],
          color: '#FFD700',
          icon: '🥇',
          order: 3
        },
        {
          name: 'Platinum',
          description: 'Elite achiever!',
          minReferrals: 10,
          minSalesVolume: 30000,
          minTeamVolume: 75000,
          commissionMultiplier: 2.0,
          benefits: ['100% commission bonus', 'Personal coach', 'Leadership trips'],
          color: '#E5E4E2',
          icon: '💎',
          order: 4
        },
        {
          name: 'Diamond',
          description: 'Ultimate success!',
          minReferrals: 15,
          minSalesVolume: 50000,
          minTeamVolume: 150000,
          commissionMultiplier: 3.0,
          benefits: ['200% commission bonus', 'Revenue sharing', 'Executive benefits'],
          color: '#B9F2FF',
          icon: '💎',
          order: 5
        }
      ]

      await prisma.rank.createMany({
        data: defaultRanks
      })

      console.log('Default ranks initialized')
    }
  }
}

export const rankSystem = new RankSystem()
