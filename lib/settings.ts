import { prisma } from '@/lib/prisma'

export interface SystemSettings {
  siteName: string
  siteDescription: string
  supportEmail: string
  minimumPayout: number
  enableReferrals: boolean
  enableCommissions: boolean
  maintenanceMode: boolean
  allowRegistration: boolean
}

let cachedSettings: SystemSettings | null = null
let cacheExpiry: number = 0

export async function getSystemSettings(): Promise<SystemSettings> {
  // Return cached settings if still valid (cache for 5 minutes)
  if (cachedSettings && Date.now() < cacheExpiry) {
    return cachedSettings
  }

  try {
    // Check if we're in Edge Runtime (middleware environment)
    if (typeof window === 'undefined' && 'EdgeRuntime' in globalThis) {
      throw new Error('Cannot use Prisma in Edge Runtime')
    }

    let settings = await prisma.systemSettings.findFirst()
    
    if (!settings) {
      // Create default settings if none exist
      settings = await prisma.systemSettings.create({
        data: {
          siteName: 'Padmaaja Rasooi',
          siteDescription: 'Premium Rice Products & Quality Grains',
          supportEmail: 'support@padmaajarasooi.com',
          minimumPayout: 100,
          enableReferrals: true,
          enableCommissions: true,
          maintenanceMode: false,
          allowRegistration: true
        }
      })
    }

    cachedSettings = {
      siteName: settings.siteName,
      siteDescription: settings.siteDescription,
      supportEmail: settings.supportEmail,
      minimumPayout: settings.minimumPayout,
      enableReferrals: settings.enableReferrals,
      enableCommissions: settings.enableCommissions,
      maintenanceMode: settings.maintenanceMode,
      allowRegistration: settings.allowRegistration
    }

    // Cache for 5 minutes
    cacheExpiry = Date.now() + 5 * 60 * 1000

    return cachedSettings
  } catch (error) {
    console.error('Error getting system settings:', error)
    
    // Return default settings if database fails
    return {
      siteName: 'Padmaaja Rasooi',
      siteDescription: 'Premium Rice Products & Quality Grains',
      supportEmail: 'support@padmaajarasooi.com',
      minimumPayout: 100,
      enableReferrals: true,
      enableCommissions: true,
      maintenanceMode: false,
      allowRegistration: true
    }
  }
}

export function clearSettingsCache() {
  cachedSettings = null
  cacheExpiry = 0
}
