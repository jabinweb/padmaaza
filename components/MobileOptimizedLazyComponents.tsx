'use client'

import React, { lazy, Suspense, useEffect, useState, useRef } from 'react'
import { ProductGridSkeleton } from '@/components/ui/LazyLoader'

// Helper to detect mobile devices
const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// More aggressive lazy loading for mobile devices
const HeroSection = lazy(() => import('@/components/sections/HeroSection'))
const AboutSection = lazy(() => import('@/components/sections/AboutSection'))
const KashminaSection = lazy(() => 
  isMobile() 
    ? import('@/components/sections/KashminaSection').then(module => ({ default: module.default }))
    : import('@/components/sections/KashminaSection')
)
const ManufacturingSection = lazy(() => 
  import('@/components/sections/ManufacturingSection').then(module => ({ default: module.default }))
)
const StatsSection = lazy(() => 
  import('@/components/sections/StatsSection').then(module => ({ default: module.default }))
)
const CertificationsSection = lazy(() => 
  import('@/components/sections/CertificationsSection').then(module => ({ default: module.default }))
)
const NewsSection = lazy(() => 
  import('@/components/sections/NewsSection').then(module => ({ default: module.default }))
)
const OurValues = lazy(() => 
  import('@/components/sections/OurValues').then(module => ({ default: module.default }))
)

// Intersection Observer for better mobile performance
const useIntersectionObserver = (ref: React.RefObject<HTMLElement>, threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const current = ref.current
    if (!current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.unobserve(current)
        }
      },
      { threshold, rootMargin: '100px' }
    )

    observer.observe(current)
    return () => observer.disconnect()
  }, [ref, threshold])

  return isIntersecting
}

// Mobile-optimized lazy wrapper
function MobileLazyWrapper({ 
  children, 
  fallback, 
  className = '',
  priority = false 
}: {
  children: React.ReactNode
  fallback: React.ReactNode
  className?: string
  priority?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIntersectionObserver(ref)
  const [shouldRender, setShouldRender] = useState(priority)

  useEffect(() => {
    if (isVisible || priority) {
      // Add small delay for mobile to prevent blocking
      const timer = setTimeout(() => setShouldRender(true), isMobile() ? 50 : 0)
      return () => clearTimeout(timer)
    }
  }, [isVisible, priority])

  return (
    <div ref={ref} className={className}>
      {shouldRender ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}

// Optimized lazy components with better mobile performance
export function MobileOptimizedLazyHeroSection() {
  const fallback = (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 animate-pulse">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-6 px-4">
          <div className="h-16 w-96 bg-white/20 rounded-lg mx-auto"></div>
          <div className="h-6 w-64 bg-white/20 rounded mx-auto"></div>
          <div className="h-12 w-48 bg-white/20 rounded-lg mx-auto"></div>
        </div>
      </div>
    </div>
  )

  return (
    <MobileLazyWrapper fallback={fallback} priority={true}>
      <HeroSection />
    </MobileLazyWrapper>
  )
}

export function MobileOptimizedLazyAboutSection() {
  const fallback = (
    <div className="py-20 bg-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="h-6 w-24 bg-gray-200 rounded mx-auto"></div>
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-6 w-full bg-gray-200 rounded"></div>
            <div className="h-6 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-6 w-4/6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <MobileLazyWrapper fallback={fallback}>
      <AboutSection />
    </MobileLazyWrapper>
  )
}

export function MobileOptimizedLazyKashminaSection() {
  const fallback = (
    <div className="py-20 bg-gradient-to-br from-emerald-50 to-green-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="h-6 w-32 bg-gray-200 rounded mx-auto"></div>
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-96 bg-gray-200 rounded-lg"></div>
          <div className="space-y-6">
            <div className="h-8 w-full bg-gray-200 rounded"></div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <MobileLazyWrapper fallback={fallback}>
      <KashminaSection />
    </MobileLazyWrapper>
  )
}

export function MobileOptimizedLazyManufacturingSection() {
  const fallback = (
    <div className="py-20 bg-slate-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="h-6 w-40 bg-gray-200 rounded mx-auto"></div>
          <div className="h-8 w-72 bg-gray-200 rounded mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-white rounded-lg shadow-sm"></div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <MobileLazyWrapper fallback={fallback}>
      <ManufacturingSection />
    </MobileLazyWrapper>
  )
}

export function MobileOptimizedLazyStatsSection() {
  const fallback = (
    <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-12 w-20 bg-white/20 rounded mx-auto mb-4"></div>
              <div className="h-4 w-24 bg-white/20 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <MobileLazyWrapper fallback={fallback}>
      <StatsSection />
    </MobileLazyWrapper>
  )
}

export function MobileOptimizedLazyCertificationsSection() {
  const fallback = (
    <div className="py-20 bg-white animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="h-6 w-32 bg-gray-200 rounded mx-auto"></div>
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <MobileLazyWrapper fallback={fallback}>
      <CertificationsSection />
    </MobileLazyWrapper>
  )
}

export function MobileOptimizedLazyNewsSection() {
  const fallback = (
    <div className="py-20 bg-slate-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="h-6 w-32 bg-gray-200 rounded mx-auto"></div>
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 bg-white rounded-lg shadow-sm"></div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <MobileLazyWrapper fallback={fallback}>
      <NewsSection />
    </MobileLazyWrapper>
  )
}

export function MobileOptimizedLazyOurValues() {
  const fallback = (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <div className="h-6 w-24 bg-gray-200 rounded mx-auto"></div>
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 bg-white rounded-lg shadow-lg"></div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <MobileLazyWrapper fallback={fallback}>
      <OurValues />
    </MobileLazyWrapper>
  )
}