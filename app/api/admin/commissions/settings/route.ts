import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let settings = await prisma.commissionSettings.findMany({
      orderBy: { level: 'asc' }
    })

    // If no settings exist, create default ones
    if (settings.length === 0) {
      const defaultSettings = [
        { level: 1, percentage: 10, isActive: true },
        { level: 2, percentage: 5, isActive: true },
        { level: 3, percentage: 3, isActive: true },
        { level: 4, percentage: 2, isActive: true },
        { level: 5, percentage: 1, isActive: true }
      ]

      await prisma.commissionSettings.createMany({
        data: defaultSettings
      })

      settings = await prisma.commissionSettings.findMany({
        orderBy: { level: 'asc' }
      })
    }

    return NextResponse.json({ settings: settings || [] })
  } catch (error) {
    console.error('Error fetching commission settings:', error)
    return NextResponse.json({ settings: [] })
  }
}
