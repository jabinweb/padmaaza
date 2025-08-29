import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function GET() {
  try {
    // Get system settings
    const settings = await prisma.systemSettings.findFirst()
    
    // Check if user is admin
    const session = await auth()
    const isAdmin = session?.user?.role === 'ADMIN'
    
    return NextResponse.json({
      maintenanceMode: (settings?.maintenanceMode || false) && !isAdmin
    })
  } catch (error) {
    console.error('Error checking maintenance mode:', error)
    // Return false if there's an error to prevent blocking access
    return NextResponse.json({
      maintenanceMode: false
    })
  }
}
