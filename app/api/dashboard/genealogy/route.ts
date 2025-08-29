import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

interface TeamMember {
  id: string
  name: string
  email: string
  joinedAt: string
  totalEarnings: number
  directReferrals: number
  level: number
  children?: TeamMember[]
}

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Build genealogy tree
    const genealogyTree = await buildGenealogyTree(userId, 0)
    
    // Calculate stats
    const teamSize = await calculateTeamSize(userId)
    const totalVolume = await calculateTeamVolume(userId)
    const levels = await calculateNetworkLevels(userId)

    return NextResponse.json({
      user: genealogyTree,
      teamSize,
      totalVolume,
      levels
    })
  } catch (error) {
    console.error('Error fetching genealogy data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch genealogy data' },
      { status: 500 }
    )
  }
}

async function buildGenealogyTree(userId: string, level: number): Promise<TeamMember> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      wallet: true,
      referrals: {
        select: {
          id: true,
          name: true,
          email: true,
          joinedAt: true
        }
      }
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  // Get direct referrals count
  const directReferrals = await prisma.user.count({
    where: { referrerId: userId }
  })

  const teamMember: TeamMember = {
    id: user.id,
    name: user.name || 'Unknown',
    email: user.email,
    joinedAt: user.joinedAt.toISOString(),
    totalEarnings: user.wallet?.totalEarnings || 0,
    directReferrals,
    level,
    children: []
  }

  // Recursively build children (limit to 5 levels to prevent infinite recursion)
  if (level < 5 && user.referrals.length > 0) {
    for (const referral of user.referrals) {
      const childTree = await buildGenealogyTree(referral.id, level + 1)
      teamMember.children!.push(childTree)
    }
  }

  return teamMember
}

async function calculateTeamSize(userId: string): Promise<number> {
  const getAllTeamMembers = async (id: string): Promise<string[]> => {
    const directReferrals = await prisma.user.findMany({
      where: { referrerId: id },
      select: { id: true }
    })

    let allMembers = directReferrals.map(r => r.id)

    for (const referral of directReferrals) {
      const subTeam = await getAllTeamMembers(referral.id)
      allMembers = [...allMembers, ...subTeam]
    }

    return allMembers
  }

  const teamMembers = await getAllTeamMembers(userId)
  return teamMembers.length
}

async function calculateTeamVolume(userId: string): Promise<number> {
  const getAllTeamMembers = async (id: string): Promise<string[]> => {
    const directReferrals = await prisma.user.findMany({
      where: { referrerId: id },
      select: { id: true }
    })

    let allMembers = directReferrals.map(r => r.id)

    for (const referral of directReferrals) {
      const subTeam = await getAllTeamMembers(referral.id)
      allMembers = [...allMembers, ...subTeam]
    }

    return allMembers
  }

  const teamMembers = await getAllTeamMembers(userId)
  
  if (teamMembers.length === 0) return 0

  const volume = await prisma.order.aggregate({
    where: {
      userId: { in: teamMembers },
      status: { in: ['PAID', 'SHIPPED', 'DELIVERED'] }
    },
    _sum: { total: true }
  })

  return volume._sum.total || 0
}

async function calculateNetworkLevels(userId: string): Promise<number> {
  const getMaxLevel = async (id: string, currentLevel: number): Promise<number> => {
    const directReferrals = await prisma.user.findMany({
      where: { referrerId: id },
      select: { id: true }
    })

    if (directReferrals.length === 0) {
      return currentLevel
    }

    let maxLevel = currentLevel + 1

    for (const referral of directReferrals) {
      const level = await getMaxLevel(referral.id, currentLevel + 1)
      maxLevel = Math.max(maxLevel, level)
    }

    return maxLevel
  }

  return await getMaxLevel(userId, 0)
}
