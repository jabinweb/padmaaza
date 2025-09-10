import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Define tier limits
    const tierLimits = {
      Diamond: 500,  // Maximum 500 Diamond partners
      Gold: 1500,     // Maximum 1500 Gold partners
      Silver: 3000   // Maximum 3000 Silver partners
    }

    // Count current partners for each tier
    const tierCounts = await prisma.user.groupBy({
      by: ['partnerTier'],
      where: {
        role: 'MEMBER',
        partnerTier: {
          in: ['Diamond', 'Gold', 'Silver']
        }
      },
      _count: {
        _all: true
      }
    })

    // Create a map of current counts
    const currentCounts: Record<string, number> = {}
    tierCounts.forEach(tier => {
      if (tier.partnerTier) {
        currentCounts[tier.partnerTier] = tier._count._all
      }
    })

    // Calculate availability and remaining slots for each tier
    const tiers = Object.entries(tierLimits).map(([tierName, limit]) => {
      const currentCount = currentCounts[tierName] || 0
      const remaining = limit - currentCount
      
      return {
        name: tierName,
        limit,
        currentCount,
        remaining,
        available: remaining > 0,
        percentageFull: Math.round((currentCount / limit) * 100)
      }
    })

    return NextResponse.json({
      success: true,
      tiers
    })

  } catch (error) {
    console.error('Tier availability error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tier availability' },
      { status: 500 }
    )
  }
}
