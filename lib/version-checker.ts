import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface VersionInfo {
  version: string
  buildTime: string
  environment: string
}

export function useVersionChecker() {
  const [currentVersion, setCurrentVersion] = useState<VersionInfo | null>(null)
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)

  useEffect(() => {
    // Get current version from meta tag or build info
    const getCurrentVersion = (): VersionInfo => {
      return {
        version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
        buildTime: process.env.NEXT_PUBLIC_BUILD_TIME || new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      }
    }

    const checkForUpdates = async () => {
      try {
        // Fetch version info from a version endpoint
        const response = await fetch('/api/version', {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        })

        if (response.ok) {
          const latestVersion: VersionInfo = await response.json()
          const current = getCurrentVersion()

          // Compare versions
          if (latestVersion.version !== current.version ||
              latestVersion.buildTime !== current.buildTime) {
            setIsUpdateAvailable(true)
            setCurrentVersion(latestVersion)
          }
        }
      } catch (error) {
        console.warn('Version check failed:', error)
      }
    }

    // Check for updates on mount
    checkForUpdates()

    // Set up periodic checks (every 5 minutes)
    const interval = setInterval(checkForUpdates, 5 * 60 * 1000)

    // Listen for service worker updates
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'SW_UPDATED') {
        setIsUpdateAvailable(true)
        setCurrentVersion({
          version: event.data.version,
          buildTime: event.data.timestamp,
          environment: process.env.NODE_ENV || 'production'
        })
      }
    }

    navigator.serviceWorker?.addEventListener('message', handleServiceWorkerMessage)

    return () => {
      clearInterval(interval)
      navigator.serviceWorker?.removeEventListener('message', handleServiceWorkerMessage)
    }
  }, [])

  const refreshApp = () => {
    // Clear all caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name)
        })
      })
    }

    // Unregister service workers
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister()
        })
      })
    }

    // Clear local storage (optional - be careful with user data)
    // localStorage.clear()

    // Hard refresh
    window.location.reload()
  }

  return {
    currentVersion,
    isUpdateAvailable,
    refreshApp
  }
}