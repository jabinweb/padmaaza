'use client'

import { lazy, Suspense } from 'react'
import { ProductGridSkeleton } from '@/components/ui/LazyLoader'

// Lazy load heavy components - Client side only
const ProductGrid = lazy(() => import('@/components/ProductGrid'))
const OurValues = lazy(() => import('@/components/sections/OurValues'))
const AboutSection = lazy(() => import('@/components/sections/AboutSection'))
const HeroSection = lazy(() => import('@/components/sections/HeroSection'))
const CertificationsSection = lazy(() => import('@/components/sections/CertificationsSection'))
const KashminaSection = lazy(() => import('@/components/sections/KashminaSection'))
const ManufacturingSection = lazy(() => import('@/components/sections/ManufacturingSection'))
const StatsSection = lazy(() => import('@/components/sections/StatsSection'))
const SustainabilitySection = lazy(() => import('@/components/sections/SustainabilitySection'))
const NewsSection = lazy(() => import('@/components/sections/NewsSection'))

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

// Lazy Certifications Section with skeleton
export function LazyCertificationsSection() {
  const fallback = (
    <div className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-8 md:mb-12">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="text-center animate-pulse">
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-gray-200 rounded-full mx-auto"></div>
              <div className="h-3 w-12 bg-gray-200 rounded mt-2 mx-auto"></div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8 md:mt-12">
          <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={fallback}>
      <CertificationsSection />
    </Suspense>
  )
}

// Lazy Kashmina Section with skeleton
export function LazyKashminaSection() {
  const fallback = (
    <div className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <div className="h-6 w-32 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
          <div className="h-12 w-48 bg-gray-200 rounded mx-auto animate-pulse"></div>
          <div className="h-5 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div className="space-y-6">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-40 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
          <div className="h-96 bg-gray-200 rounded-3xl animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={fallback}>
      <KashminaSection />
    </Suspense>
  )
}

// Lazy Manufacturing Section with skeleton
export function LazyManufacturingSection() {
  const fallback = (
    <div className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="h-6 w-32 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
          <div className="h-12 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
          <div className="h-5 w-[600px] bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                <div className="text-right">
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded mt-1"></div>
                </div>
              </div>
              <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={fallback}>
      <ManufacturingSection />
    </Suspense>
  )
}

// Lazy Stats Section with skeleton
export function LazyStatsSection() {
  const fallback = (
    <div className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="h-6 w-24 bg-gray-700 rounded-full mx-auto animate-pulse"></div>
          <div className="h-12 w-96 bg-gray-700 rounded mx-auto animate-pulse"></div>
          <div className="h-5 w-[600px] bg-gray-700 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-8 border border-white/10 animate-pulse">
              <div className="w-16 h-16 bg-gray-700 rounded-2xl mb-6"></div>
              <div className="h-12 w-20 bg-gray-700 rounded mb-2"></div>
              <div className="h-5 w-32 bg-gray-700 rounded mb-3"></div>
              <div className="h-4 w-full bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={fallback}>
      <StatsSection />
    </Suspense>
  )
}


// Lazy Sustainability Section with skeleton
export function LazySustainabilitySection() {
  const fallback = (
    <div className="py-16 lg:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="h-6 w-32 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
          <div className="h-12 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
          <div className="h-5 w-[600px] bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6"></div>
              <div className="h-5 w-32 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
              <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={fallback}>
      <SustainabilitySection />
    </Suspense>
  )
}

// Lazy News Section with skeleton
export function LazyNewsSection() {
  const fallback = (
    <div className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="h-6 w-32 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
          <div className="h-12 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
          <div className="h-5 w-[500px] bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-16 animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-64 lg:h-80 bg-gray-200"></div>
            <div className="p-8 lg:p-12 space-y-4">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-8 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-5 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={fallback}>
      <NewsSection />
    </Suspense>
  )
}
