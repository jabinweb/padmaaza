import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { clearSettingsCache } from '@/lib/settings'

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get or create system settings
    let settings = await prisma.systemSettings.findFirst()
    
    if (!settings) {
      // Create default settings if none exist
      settings = await prisma.systemSettings.create({
        data: {
          siteName: 'Padmaaja Rasool',
          siteDescription: 'Premium Rice Products & Quality Grains',
          supportEmail: 'support@padmaajarasool.com',
          minimumPayout: 100,
          enableReferrals: true,
          enableCommissions: true,
          maintenanceMode: false,
          allowRegistration: true
        }
      })
    }

    return NextResponse.json({
      siteName: settings.siteName,
      siteDescription: settings.siteDescription,
      supportEmail: settings.supportEmail,
      minimumPayout: settings.minimumPayout,
      enableReferrals: settings.enableReferrals,
      enableCommissions: settings.enableCommissions,
      maintenanceMode: settings.maintenanceMode,
      allowRegistration: settings.allowRegistration
    })
  } catch (error) {
    console.error('Error fetching system settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch system settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      siteName,
      siteDescription,
      supportEmail,
      minimumPayout,
      enableReferrals,
      enableCommissions,
      maintenanceMode,
      allowRegistration
    } = await request.json()

    // Get or create system settings
    let settings = await prisma.systemSettings.findFirst()
    
    if (!settings) {
      // Create new settings
      settings = await prisma.systemSettings.create({
        data: {
          siteName,
          siteDescription,
          supportEmail,
          minimumPayout,
          enableReferrals,
          enableCommissions,
          maintenanceMode,
          allowRegistration
        }
      })
    } else {
      // Update existing settings
      settings = await prisma.systemSettings.update({
        where: { id: settings.id },
        data: {
          siteName,
          siteDescription,
          supportEmail,
          minimumPayout,
          enableReferrals,
          enableCommissions,
          maintenanceMode,
          allowRegistration
        }
      })
    }

    // Clear the settings cache so new values are fetched
    clearSettingsCache()

    return NextResponse.json({ 
      success: true,
      settings: {
        siteName: settings.siteName,
        siteDescription: settings.siteDescription,
        supportEmail: settings.supportEmail,
        minimumPayout: settings.minimumPayout,
        enableReferrals: settings.enableReferrals,
        enableCommissions: settings.enableCommissions,
        maintenanceMode: settings.maintenanceMode,
        allowRegistration: settings.allowRegistration
      }
    })
  } catch (error) {
    console.error('Error updating system settings:', error)
    return NextResponse.json(
      { error: 'Failed to update system settings' },
      { status: 500 }
    )
  }
}
