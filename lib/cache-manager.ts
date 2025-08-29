// Client-side cache management and service worker utilities

interface CacheManager {
  clearAllCaches: () => Promise<void>
  checkForUpdates: () => Promise<boolean>
  forceReload: () => void
  registerUpdateHandler: (callback: () => void) => void
}

class PWACacheManager implements CacheManager {
  private updateCallback: (() => void) | null = null
  private registration: ServiceWorkerRegistration | null = null

  constructor() {
    this.initializeServiceWorker()
  }

  private async initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        // Register service worker
        this.registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none' // Always check for updates
        })

        console.log('Service Worker registered successfully:', this.registration)

        // Listen for service worker updates
        this.registration.addEventListener('updatefound', () => {
          console.log('Service Worker update found')
          const newWorker = this.registration?.installing

          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New version available
                console.log('New version available!')
                if (this.updateCallback) {
                  this.updateCallback()
                }
              }
            })
          }
        })

        // Listen for messages from service worker
        navigator.serviceWorker.addEventListener('message', (event) => {
          console.log('Message from Service Worker:', event.data)
          
          if (event.data && event.data.type === 'SW_UPDATED') {
            console.log('Service Worker updated to version:', event.data.version)
            if (this.updateCallback) {
              this.updateCallback()
            }
          }
        })

        // Check for updates every 30 seconds
        setInterval(() => {
          this.checkForUpdates()
        }, 30000)

      } catch (error) {
        console.error('Service Worker registration failed:', error)
      }
    }
  }

  // Clear all caches
  async clearAllCaches(): Promise<void> {
    try {
      // Clear browser caches
      if ('caches' in window) {
        const cacheNames = await caches.keys()
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        )
        console.log('All caches cleared')
      }

      // Send message to service worker to clear its caches
      if (navigator.serviceWorker.controller) {
        const messageChannel = new MessageChannel()
        
        return new Promise<void>((resolve) => {
          messageChannel.port1.onmessage = (event) => {
            if (event.data.success) {
              console.log('Service Worker caches cleared')
              resolve()
            }
          }

          // Safe to call postMessage since we checked controller is not null
          navigator.serviceWorker.controller!.postMessage(
            { type: 'CACHE_INVALIDATE' },
            [messageChannel.port2]
          )
        })
      }
    } catch (error) {
      console.error('Failed to clear caches:', error)
      throw error
    }
  }

  // Check for service worker updates
  async checkForUpdates(): Promise<boolean> {
    if (this.registration) {
      try {
        await this.registration.update()
        return true
      } catch (error) {
        console.error('Failed to check for updates:', error)
        return false
      }
    }
    return false
  }

  // Force reload the page
  forceReload(): void {
    // Clear caches first, then reload
    this.clearAllCaches().then(() => {
      window.location.reload()
    }).catch(() => {
      // Fallback: just reload
      window.location.reload()
    })
  }

  // Register callback for updates
  registerUpdateHandler(callback: () => void): void {
    this.updateCallback = callback
  }

  // Skip waiting and activate new service worker
  async skipWaiting(): Promise<void> {
    if (this.registration && this.registration.waiting) {
      // Send message to service worker to skip waiting
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }
}

// Singleton instance
const cacheManager = new PWACacheManager()

// Export utility functions
export const clearAllCaches = () => cacheManager.clearAllCaches()
export const checkForUpdates = () => cacheManager.checkForUpdates()
export const forceReload = () => cacheManager.forceReload()
export const registerUpdateHandler = (callback: () => void) => cacheManager.registerUpdateHandler(callback)

// Development helpers
export const isDevelopment = process.env.NODE_ENV === 'development'

export const enableDevCacheBypass = () => {
  if (isDevelopment) {
    // Disable caching in development
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister()
        })
      })
    }
  }
}

// Auto-update notification component data
export const createUpdateNotification = () => {
  return {
    title: 'New Version Available!',
    message: 'A new version of the app is available. Refresh to get the latest features.',
    actions: [
      {
        label: 'Refresh Now',
        action: forceReload
      },
      {
        label: 'Later',
        action: () => console.log('Update dismissed')
      }
    ]
  }
}

// Cache status utilities
export const getCacheStatus = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys()
    const cacheDetails = await Promise.all(
      cacheNames.map(async (name) => {
        const cache = await caches.open(name)
        const keys = await cache.keys()
        return {
          name,
          size: keys.length
        }
      })
    )
    return cacheDetails
  }
  return []
}

export default cacheManager
