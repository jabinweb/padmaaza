import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import Providers from './providers'
import { Toaster } from '@/components/ui/sonner'
import { auth } from '@/auth';
import StructuredData from '@/components/StructuredData'
import { generateOrganizationJsonLd } from '@/lib/structured-data'
import PWAInstallPrompt, { IOSInstallPrompt } from '@/components/PWAInstallPrompt'

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
  title: 'Padmaaja Rasool - Premium Rice Products & Quality Grains',
  description: 'Experience the finest quality rice with Padmaaja Rasool. Premium rice varieties sourced from the best farms for exceptional taste and nutrition.',
  keywords: ['padmaaja rasool', 'premium rice', 'quality rice', 'organic rice', 'basmati rice', 'rice products', 'agriculture', 'quality grains', 'healthy food'],
  authors: [{ name: 'Padmaaja Rasool Team' }],
  creator: 'Padmaaja Rasool',
  publisher: 'Padmaaja Rasool',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Padmaaja Rasool - Premium Rice Products & Quality Grains',
    description: 'Experience the finest quality rice with Padmaaja Rasool. Premium rice varieties sourced from the best farms for exceptional taste and nutrition.',
    url: '/',
    siteName: 'Padmaaja Rasool',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Padmaaja Rasool - Premium Rice Products'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Padmaaja Rasool - Premium Rice Products & Quality Grains',
    description: 'Experience the finest quality rice with Padmaaja Rasool. Premium rice varieties sourced from the best farms for exceptional taste and nutrition.',
    images: ['/images/twitter-image.png']
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
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.svg',
        color: '#10B981'
      }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Padmaaja Rasool',
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
  const baseUrl = process.env.NEXTAUTH_URL || 'https://padmaajarasool.com'
  const organizationData = generateOrganizationJsonLd(baseUrl)

  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/logo.svg" color="#10B981" />
        <meta name="msapplication-TileColor" content="#10B981" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        {/* Organization Structured Data */}
        <StructuredData data={organizationData} id="organization-data" />
        
        <Providers session={session}>
          <main className="flex-1">{children}</main>
          <Toaster />
          <PWAInstallPrompt />
          <IOSInstallPrompt />
        </Providers>
        
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
            `,
          }}
        />
      </body>
    </html>
  )
}