import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Providers from './providers'
import { Toaster } from '@/components/ui/sonner'
import { auth } from '@/auth';
import StructuredData from '@/components/StructuredData'
import { generateOrganizationJsonLd } from '@/lib/structured-data'
import PWAInstallPrompt, { IOSInstallPrompt } from '@/components/PWAInstallPrompt'
import ClientFloatingWhatsApp from '@/components/ClientFloatingWhatsApp'

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Padmaaja Rasooi - Premium Rice Products & Quality Grains',
  description: 'Experience the finest quality rice with Padmaaja Rasooi. Premium rice varieties sourced from the best farms for exceptional taste and nutrition.',
  keywords: ['padmaaja rasooi', 'premium rice', 'quality rice', 'organic rice', 'basmati rice', 'rice products', 'agriculture', 'quality grains', 'healthy food'],
  authors: [{ name: 'Padmaaja Rasooi Team' }],
  creator: 'Padmaaja Rasooi',
  publisher: 'Padmaaja Rasooi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    charset: 'utf-8',
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Padmaaja Rasooi - Premium Rice Products & Quality Grains',
    description: 'Experience the finest quality rice with Padmaaja Rasooi. Premium rice varieties sourced from the best farms for exceptional taste and nutrition.',
    url: '/',
    siteName: 'Padmaaja Rasooi',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Padmaaja Rasooi - Premium Rice Products',
        type: 'image/png'
      },
      {
        url: '/android-chrome-192x192.png',
        width: 192,
        height: 192,
        alt: 'Padmaaja Rasooi Logo',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Padmaaja Rasooi - Premium Rice Products & Quality Grains',
    description: 'Experience the finest quality rice with Padmaaja Rasooi. Premium rice varieties sourced from the best farms for exceptional taste and nutrition.',
    images: ['/android-chrome-512x512.png'],
    creator: '@padmaajarasooi',
    site: '@padmaajarasooi'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'icon',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        rel: 'icon',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Padmaaja Rasooi',
    startupImage: [
      {
        url: '/images/apple-splash-2048-2732.png',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      },
      {
        url: '/images/apple-splash-1668-2224.png',
        media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      }
    ]
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3B82F6' },
    { media: '(prefers-color-scheme: dark)', color: '#1E40AF' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'light'
}

export default async function PublicRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  // Generate base URL for structured data
  const baseUrl = process.env.NEXTAUTH_URL || 'https://padmaajarasooi.com'
  const organizationData = generateOrganizationJsonLd(baseUrl)

  return (
    <html lang="en">
      <head>
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//4m5m4tx28rtva30c.public.blob.vercel-storage.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Preconnect to critical resources */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://4m5m4tx28rtva30c.public.blob.vercel-storage.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#10B981" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#10B981" />
        <meta property="og:image" content="/android-chrome-512x512.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta name="twitter:image" content="/android-chrome-512x512.png" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50 rounded">
          Skip to main content
        </a>
        
        {/* Organization Structured Data */}
        <StructuredData data={organizationData} id="organization-data" />
        
        <div 
          itemScope 
          itemType="https://schema.org/WebSite"
          className="min-h-screen flex flex-col"
        >
          <meta itemProp="url" content={baseUrl} />
          <meta itemProp="name" content="Padmaaja Rasooi" />
          
          <Providers session={session}>
            {/* Enhanced semantic structure for better SEO */}
            <div className="flex-1 min-h-screen">
              <main 
                id="main-content" 
                className="flex-1 min-h-screen" 
                role="main" 
                aria-label="Main content"
                itemScope
                itemType="https://schema.org/WebPage"
              >
                <article className="min-h-screen">
                  {children}
                </article>
              </main>
            </div>
            
            {/* Footer for semantic completeness */}
            <footer 
              role="contentinfo" 
              aria-label="Site footer"
              className="hidden"
              itemScope
              itemType="https://schema.org/WPFooter"
            >
              <div itemProp="copyrightHolder" itemScope itemType="https://schema.org/Organization">
                <meta itemProp="name" content="Padmaaja Rasooi" />
              </div>
            </footer>
            
            <Toaster />
            <PWAInstallPrompt />
            <IOSInstallPrompt />
            <ClientFloatingWhatsApp 
              phoneNumber="+919475758817"
              message="Hello! I'm interested in Padmaaja Rasooi products. Can you help me?"
              position="bottom-right"
              showTooltip={true}
            />
          </Providers>
        </div>
        
        {/* PWA Cache Manager and Update Notification */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Enhanced Service Worker Registration with Cache Management
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js', {
                    scope: '/',
                    updateViaCache: 'none'
                  })
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                    
                    // Check for updates every 30 seconds
                    setInterval(() => {
                      registration.update();
                    }, 30000);
                    
                    // Listen for updates
                    registration.addEventListener('updatefound', () => {
                      const newWorker = registration.installing;
                      if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New version available - force reload
                            if (confirm('New version available! Refresh to update?')) {
                              window.location.reload();
                            }
                          }
                        });
                      }
                    });
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
                });
                
                // Handle service worker messages
                navigator.serviceWorker.addEventListener('message', event => {
                  if (event.data && event.data.type === 'SW_UPDATED') {
                    console.log('Service Worker updated, forcing reload...');
                    window.location.reload();
                  }
                });
              }
              
              // Development cache bypass
              if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                // Disable cache in development
                if ('caches' in window) {
                  caches.keys().then(names => {
                    names.forEach(name => {
                      caches.delete(name);
                    });
                  });
                }
              }
              
              // Simple component preloading for bundle optimization
              setTimeout(() => {
                if (typeof window !== 'undefined') {
                  import('/components/ProductCard').catch(() => {});
                  import('/components/FloatingWhatsApp').catch(() => {});
                }
              }, 2000);
            `,
          }}
        />
      </body>
    </html>
  )
}