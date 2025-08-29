'use client'

import { lazy, Suspense } from 'react'
import { ProductGridSkeleton } from '@/components/ui/LazyLoader'

// Lazy load heavy components - Client side only
const ProductGrid = lazy(() => import('@/components/ProductGrid'))
const OurValues = lazy(() => import('@/components/sections/OurValues'))
const AboutSection = lazy(() => import('@/components/sections/AboutSection'))
const HeroSection = lazy(() => import('@/components/sections/HeroSection'))

// Lazy Product Grid with skeleton
export function LazyProductGrid(props: any) {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGrid {...props} />
    </Suspense>
  )
}

// Lazy Our Values with skeleton
export function LazyOurValues() {
  const fallback = (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12">
        <div className="text-center space-y-4 mb-16">
          <div className="h-6 w-24 bg-gray-200 rounded mx-auto animate-pulse"></div>
          <div className="h-8 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 bg-white rounded-lg shadow-lg animate-pulse">
              <div className="p-8 space-y-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
                <div className="h-6 w-32 bg-gray-200 rounded mx-auto"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={fallback}>
      <OurValues />
    </Suspense>
  )
}

// Lazy About Section with skeleton
export function LazyAboutSection() {
  const fallback = (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={fallback}>
      <AboutSection />
    </Suspense>
  )
}

// Lazy Hero Section with skeleton
export function LazyHeroSection() {
  const fallback = (
    <div className="relative h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8">
            <div className="h-12 w-96 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex space-x-4">
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={fallback}>
      <HeroSection />
    </Suspense>
  )
}
