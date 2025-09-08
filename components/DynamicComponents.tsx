// Dynamic Components for Bundle Optimization
// This file implements lazy loading and code splitting for better performance
'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Loading components
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
  </div>
)

const LoadingCard = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse">
    <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
    <div className="h-4 bg-gray-200 rounded mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  </div>
)

const LoadingForm = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
    <div className="h-6 bg-gray-200 rounded mb-4"></div>
    <div className="space-y-4">
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
      <div className="h-24 bg-gray-200 rounded"></div>
      <div className="h-10 bg-gray-200 rounded w-32"></div>
    </div>
  </div>
)

// Lazy loaded components with proper error boundaries
export const LazyProductCard = dynamic(
  () => import('@/components/ProductCard').then(mod => mod.default),
  {
    loading: () => <LoadingCard />,
    ssr: true
  }
)

export const LazyContactForm = dynamic(
  () => import('@/components/forms/ContactForm').then(mod => mod.default),
  {
    loading: () => <LoadingForm />,
    ssr: false // Contact form doesn't need SSR
  }
)

export const LazyFloatingWhatsApp = dynamic(
  () => import('@/components/FloatingWhatsApp').then(mod => mod.default),
  {
    loading: () => null, // No loading state for floating elements
    ssr: false // WhatsApp widget doesn't need SSR
  }
)

export const LazyImageSlider = dynamic(
  () => import('@/components/ImageSlider').then(mod => mod.default),
  {
    loading: () => <LoadingSpinner />,
    ssr: true
  }
)

// Preload critical components for better UX
export const preloadCriticalComponents = () => {
  if (typeof window !== 'undefined') {
    // Preload on interaction or after 3 seconds
    const preloadTimer = setTimeout(() => {
      import('@/components/ProductCard')
      import('@/components/FloatingWhatsApp')
    }, 3000)

    // Preload on user interaction
    const preloadOnInteraction = () => {
      import('@/components/forms/ContactForm')
      clearTimeout(preloadTimer)
      document.removeEventListener('mouseover', preloadOnInteraction)
      document.removeEventListener('touchstart', preloadOnInteraction)
    }

    document.addEventListener('mouseover', preloadOnInteraction, { once: true })
    document.addEventListener('touchstart', preloadOnInteraction, { once: true })
  }
}

// Wrapper component with Suspense for better error handling
export const DynamicComponentWrapper = ({ 
  children, 
  fallback = <LoadingSpinner /> 
}: { 
  children: React.ReactNode
  fallback?: React.ReactNode 
}) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
)

// Bundle optimization utility
export const optimizeBundle = {
  // Check if component should be loaded
  shouldLoad: (component: string) => {
    if (typeof window === 'undefined') return true
    
    // Load based on viewport, connection, and device capabilities
    const isInViewport = 'IntersectionObserver' in window
    const hasGoodConnection = (navigator as any).connection?.effectiveType?.includes('4g') ?? true
    const deviceMemory = (navigator as any).deviceMemory
    const hasEnoughMemory = deviceMemory ? deviceMemory > 4 : true
    
    return isInViewport && hasGoodConnection && hasEnoughMemory
  },

  // Prefetch resources
  prefetch: (resources: string[]) => {
    if (typeof window !== 'undefined') {
      resources.forEach(resource => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = resource
        document.head.appendChild(link)
      })
    }
  }
}
