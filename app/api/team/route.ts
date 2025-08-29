import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get direct referrals
    const directReferrals = await prisma.user.findMany({
      where: { referrerId: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        joinedAt: true,
        referrals: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            joinedAt: true,
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    })

    // Get team statistics
    const teamStats = await getTeamStats(session.user.id)

    return NextResponse.json({
      directReferrals,
      teamStats,
    })
  } catch (error) {
    console.error('Team API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function getTeamStats(userId: string) {
  const levels = []
  
  for (let level = 1; level <= 5; level++) {
    const count = await getTeamCountAtLevel(userId, level)
    levels.push({ level, count })
  }

  const totalTeamSize = levels.reduce((sum, level) => sum + level.count, 0)

  return {
    totalTeamSize,
    levels,
  }
}

async function getTeamCountAtLevel(userId: string, targetLevel: number, currentLevel = 0, visited = new Set<string>()): Promise<number> {
  if (currentLevel === targetLevel || visited.has(userId)) {
    return currentLevel === targetLevel ? 1 : 0
  }

  visited.add(userId)

  const directReferrals = await prisma.user.findMany({
    where: { referrerId: userId },
    select: { id: true },
  })

  if (currentLevel === targetLevel - 1) {
    return directReferrals.length
  }

  let count = 0
  for (const referral of directReferrals) {
    count += await getTeamCountAtLevel(referral.id, targetLevel, currentLevel + 1, visited)
  }

  return count
}