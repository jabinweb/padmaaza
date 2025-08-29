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

    // Get direct referrals
    const directReferrals = await prisma.user.findMany({
      where: { referrerId: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        joinedAt: true,
        referrals: {
          select: {
            id: true
          }
        }
      },
      orderBy: { joinedAt: 'desc' }
    })

    // Get team statistics by levels
    const getAllTeamMembers = async (id: string, level: number = 1, maxLevel: number = 5): Promise<string[]> => {
      if (level > maxLevel) return []
      
      const refs = await prisma.user.findMany({
        where: { referrerId: id },
        select: { id: true }
      })
      
      let allMembers = refs.map(r => r.id)
      
      if (level < maxLevel) {
        for (const ref of refs) {
          const subTeam = await getAllTeamMembers(ref.id, level + 1, maxLevel)
          allMembers = [...allMembers, ...subTeam]
        }
      }
      
      return allMembers
    }

    // Calculate team size per level
    const levels = []
    for (let level = 1; level <= 5; level++) {
      if (level === 1) {
        levels.push({ level, count: directReferrals.length })
      } else {
        // Get members at specific level
        const getLevelMembers = async (parentIds: string[], targetLevel: number, currentLevel: number = 1): Promise<string[]> => {
          if (currentLevel === targetLevel) return parentIds
          
          const nextLevel = await prisma.user.findMany({
            where: { referrerId: { in: parentIds } },
            select: { id: true }
          })
          
          if (nextLevel.length === 0 || currentLevel >= targetLevel) return []
          
          return getLevelMembers(nextLevel.map(u => u.id), targetLevel, currentLevel + 1)
        }
        
        const levelMemberIds = await getLevelMembers([userId], level)
        levels.push({ level, count: levelMemberIds.length })
      }
    }

    const allTeamMemberIds = await getAllTeamMembers(userId)
    
    const teamData = {
      directReferrals: directReferrals.map(ref => ({
        ...ref,
        referrals: ref.referrals || []
      })),
      teamStats: {
        totalTeamSize: allTeamMemberIds.length,
        levels
      }
    }

    return NextResponse.json(teamData)
  } catch (error) {
    console.error('Error fetching team data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team data' },
      { status: 500 }
    )
  }
}
