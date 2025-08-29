import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settings = await prisma.commissionSettings.findMany({
      orderBy: { level: 'asc' },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Commission settings API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { level, percentage, isActive } = await request.json()

    const setting = await prisma.commissionSettings.upsert({
      where: { level },
      update: { percentage, isActive },
      create: { level, percentage, isActive },
    })

    return NextResponse.json(setting)
  } catch (error) {
    console.error('Create commission setting error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}