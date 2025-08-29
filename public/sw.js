// Cache version - increment this when you want to force cache invalidation
const CACHE_VERSION = Date.now()
const CACHE_NAME = `padmaaja-rasooi-cache-v${CACHE_VERSION}`
const STATIC_CACHE_NAME = `padmaaja-rasooi-static-v${CACHE_VERSION}`
const DYNAMIC_CACHE_NAME = `padmaaja-rasooi-dynamic-v${CACHE_VERSION}`

// Build timestamp for cache busting
const BUILD_TIMESTAMP = new Date().toISOString()

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/logo.png',
]

// API routes that should be cached
const API_ROUTES = [
  '/api/products',
  '/api/categories',
  '/api/dashboard',
  '/api/orders',
  '/api/cart',
  '/api/payments'
]

// Install event - cache static files and force update
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker: Installing... v' + CACHE_VERSION)
  console.log('📅 Build timestamp:', BUILD_TIMESTAMP)
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Caching static files')
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete')
        // Force immediate activation of new service worker
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('❌ Service Worker: Installation failed', error)
      })
  )
})

// Activate event - clean up old caches and notify clients
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating... v' + CACHE_VERSION)
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        // Delete all old caches
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheName.includes(`v${CACHE_VERSION}`)) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activation complete')
        // Take control of all pages immediately
        return self.clients.claim()
      })
      .then(() => {
        // Notify all clients about the update
        return self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'SW_UPDATED',
              version: CACHE_VERSION,
              timestamp: BUILD_TIMESTAMP
            })
          })
        })
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip cross-origin requests
  if (url.origin !== location.origin) return

  // Handle different types of requests
  if (url.pathname.startsWith('/api/')) {
    // API requests - network first, then cache
    event.respondWith(handleApiRequest(request))
  } else if (url.pathname.startsWith('/_next/static/')) {
    // Static assets - cache first
    event.respondWith(handleStaticAssets(request))
  } else {
    // Pages - network first, then cache
    event.respondWith(handlePageRequest(request))
  }
})

// Handle API requests
async function handleApiRequest(request) {
  const url = new URL(request.url)
  
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    // Cache successful responses for GET requests
    if (networkResponse.ok && request.method === 'GET') {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline response for API calls
    return new Response(
      JSON.stringify({ 
        error: 'Network unavailable',
        offline: true,
        message: 'You are currently offline. Please check your internet connection to access fresh product information.'
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

// Handle static assets
async function handleStaticAssets(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Try network
    const networkResponse = await fetch(request)
    
    // Cache the response
    const cache = await caches.open(STATIC_CACHE_NAME)
    cache.put(request, networkResponse.clone())
    
    return networkResponse
  } catch (error) {
    // Return cached version or fail silently for assets
    return caches.match(request)
  }
}

// Handle page requests
async function handlePageRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request)
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline page
    const offlineResponse = await caches.match('/offline')
    return offlineResponse || new Response('Offline', { status: 503 })
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag)
  
  if (event.tag === 'cart-sync') {
    event.waitUntil(syncCart())
  } else if (event.tag === 'order-sync') {
    event.waitUntil(syncOrders())
  } else if (event.tag === 'contact-sync') {
    event.waitUntil(syncContactForms())
  }
})

// Sync cart data when online
async function syncCart() {
  try {
    // Get stored cart data
    const cartData = await getStoredData('cart')
    if (cartData) {
      // Sync with server
      await fetch('/api/cart/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData)
      })
      
      // Clear stored data
      await clearStoredData('cart')
    }
  } catch (error) {
    console.error('Cart sync failed:', error)
  }
}

// Sync order data when online
async function syncOrders() {
  try {
    const orderData = await getStoredData('orders')
    if (orderData) {
      await fetch('/api/orders/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })
      
      await clearStoredData('orders')
    }
  } catch (error) {
    console.error('Order sync failed:', error)
  }
}

// Sync contact form data when online
async function syncContactForms() {
  try {
    const contactData = await getStoredData('contact')
    if (contactData) {
      await fetch('/api/contact/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      })
      
      await clearStoredData('contact')
    }
  } catch (error) {
    console.error('Contact sync failed:', error)
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received')
  
  const options = {
    body: 'New authentic food products available at Padmaaja Rasooi!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Products',
        icon: '/icons/action-products.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/action-close.png'
      }
    ]
  }
  
  event.waitUntil(
    self.registration.showNotification('Padmaaja Rasooi', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked')
  
  event.notification.close()
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/products')
    )
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open app
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data)
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // Force the waiting service worker to become the active service worker
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CACHE_INVALIDATE') {
    // Clear all caches and force reload
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        )
      }).then(() => {
        // Notify client that caches are cleared
        event.ports[0].postMessage({ success: true })
      })
    )
  }
})

// Utility functions
async function getStoredData(key) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    const response = await cache.match(`/offline-data/${key}`)
    return response ? response.json() : null
  } catch (error) {
    return null
  }
}

async function clearStoredData(key) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE_NAME)
    await cache.delete(`/offline-data/${key}`)
  } catch (error) {
    console.error('Failed to clear stored data:', error)
  }
}
