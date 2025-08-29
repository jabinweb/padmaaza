import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { rankSystem } from '@/lib/ranks'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Get user with current rank
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        currentRank: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate current metrics
    const metrics = await rankSystem.calculateUserMetrics(userId)

    // Get all ranks to find next rank
    const allRanks = await prisma.rank.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    // Find next rank
    const currentRankOrder = user.currentRank?.order || 0
    const nextRank = allRanks.find(rank => rank.order > currentRankOrder)

    // Get user's achievements
    const achievements = await prisma.rankAchievement.findMany({
      where: { userId },
      include: {
        rank: true
      },
      orderBy: { achievedAt: 'desc' }
    })

    const response = {
      currentRank: user.currentRank,
      nextRank: nextRank || null,
      metrics,
      achievements: achievements.map(achievement => ({
        id: achievement.id,
        rank: achievement.rank,
        achievedAt: achievement.achievedAt.toISOString()
      }))
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
      { status: 500 }
    )
  }
}
