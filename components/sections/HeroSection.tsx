'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Wheat } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Banner {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  cta: string
  ctaLink?: string
  bgColor?: string
}

interface FeatureCard {
  icon: any
  title: string
  description: string
  link: string
  color: string
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)

  const banners: Banner[] = useMemo(() => [
    {
      id: 1,
      title: "Premium Aged Basmati 1121",
      subtitle: "Extra Long Grain • 2+ Years Aged",
      description: "Authentic Basmati rice with exceptional length, distinctive aroma, and fluffy texture from the foothills of Himalayas",
      image: "/images/rice-hero-slider.jpg",
      cta: "Shop Premium Rice",
      ctaLink: "/products?category=rice",
      bgColor: "from-amber-600 via-yellow-600 to-orange-700"
    },
    {
      id: 3,
      title: "Kashmina Brand Collection",
      subtitle: "Farm Fresh • Direct from Fields",
      description: "Premium rice varieties sourced directly from trusted farmers, processed with care for exceptional quality",
      image: "/images/kashmina_banner.png",
      cta: "Shop Kashmina",
      ctaLink: "/products?brand=kashmina",
      bgColor: "from-emerald-600 via-green-600 to-yellow-600"
    },
    {
      id: 4,
      title: "Wholesale Rice Supplies",
      subtitle: "Bulk Orders • Competitive Rates",
      description: "Reliable wholesale rice supplier offering bulk quantities of premium Basmati and Sella rice for businesses and retailers",
      image: "https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/women-carrying-rice",
      cta: "Shop Wholesale",
      ctaLink: "/wholesaler",
      bgColor: "from-orange-600 via-red-600 to-amber-600"
    },
    {
      id: 5,
      title: "Indian Frmer Plowing",
      subtitle: "Traditional Farming • Heritage Grain",
      description: "Experience the rich heritage of rice cultivation with traditional farming methods passed down through generations.",
      image: "https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/media/2025-09-07/indian-farmer-plowing",
      cta: "Learn More",
    }
  ], [])

  // Debug: Log current slide image
  useEffect(() => {
    console.log('Current slide image:', banners[currentSlide]?.image);
  }, [currentSlide, banners]);

  const featuredCategories = [
    {
      title: "Kashmina Sella Premium",
      subtitle: "Extra long grain",
      link: "/products?brand=basmati-1121",
      bgColor: "from-amber-500 to-yellow-600"
    },
    {
      title: "Kashmina Gold Premium",
      subtitle: "Steam processed",
      link: "/products?category=sella",
      bgColor: "from-yellow-500 to-amber-600"
    },
    {
      title: "Kashmina Steam Premium",
      subtitle: "Traditional quality",
      link: "/products?brand=kashmina",
      bgColor: "from-emerald-500 to-green-600"
    },
    {
      title: "Wholesale",
      subtitle: "Wholesale rates",
      link: "/wholesaler",
      bgColor: "from-orange-500 to-red-600"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000) // Auto-slide every 5 seconds

    return () => clearInterval(timer)
  }, [banners.length])

  // Reset loading state when slide changes
  useEffect(() => {
    setImageLoading(true)
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-orange-50/20">

      {/* Amazon-style Hero Layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          
          {/* Main Banner Slider - Left Side (3/4 width) - Better mobile aspect ratio */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-lg shadow-lg aspect-[16/10] md:aspect-video isolate">
            {/* Skeleton Loader for CLS prevention */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse z-0" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 isolate"
              >
                {/* Background Color Fallback */}
                <div className={`absolute inset-0 bg-gradient-to-br ${banners[currentSlide].bgColor ?? 'from-amber-600 via-yellow-600 to-orange-700'} z-0`}></div>
                
                <Image
                  src={banners[currentSlide].image}
                  alt={banners[currentSlide].title}
                  fill
                  className="object-cover z-10"
                  priority={currentSlide === 0} // Only prioritize first image
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 75vw"
                  quality={85} // Optimize quality vs file size
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  onLoadStart={() => setImageLoading(true)}
                  onError={(e) => {
                    console.error('Image failed to load:', banners[currentSlide].image);
                    setImageLoading(false);
                    // Keep the gradient background visible on error
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', banners[currentSlide].image);
                    setImageLoading(false);
                  }}
                />
                
                {/* Loading overlay */}
                {imageLoading && (
                  <div className="absolute inset-0 z-15 flex items-center justify-center">
                    <div className="animate-pulse">
                      <div className="w-8 h-8 bg-white/30 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                )}
                
                {/* Content positioned in center-left with enhanced visibility */}
                <div className="absolute inset-0 z-20 flex items-center">
                  <div className="max-w-lg px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 w-full">
                    {/* Semi-transparent background for text */}
                    {/* <div className="bg-black/40 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-2 sm:space-y-3 md:space-y-4"
                      >
                        <p className="text-yellow-300 font-semibold text-sm sm:text-base md:text-lg drop-shadow-lg">
                          {banners[currentSlide].subtitle}
                        </p>
                        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white leading-tight drop-shadow-2xl">
                          {banners[currentSlide].title}
                        </h1>
                        <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md drop-shadow-lg">
                          {banners[currentSlide].description}
                        </p>
                        <div className="pt-3 sm:pt-4">
                          <Button asChild size="default" className="bg-white text-gray-900 hover:bg-gray-100 text-sm sm:text-base font-medium px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg shadow-lg">
                            <Link href={banners[currentSlide].ctaLink ?? '/'}>
                              {banners[currentSlide].cta}
                            </Link>
                          </Button>
                        </div>
                      </motion.div>
                    </div> */}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Subtle Navigation Arrows - Better mobile visibility */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Slide Indicators - Fixed positioning with background */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex space-x-2 bg-black/20 backdrop-blur-sm px-3 py-2 rounded-full">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Modern Category Cards - Right Side (1/4 width) - Ultra compact mobile */}
          <div className="lg:col-span-1 aspect-[4/3] sm:aspect-[16/10] md:aspect-video lg:aspect-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 sm:gap-2 lg:gap-3 h-full">
              {featuredCategories.slice(0, 4).map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="min-h-[50px] sm:min-h-[70px] lg:h-full lg:min-h-0"
                >
                  <Link href={category.link}>
                    <div className="group h-full relative bg-white rounded-md border border-gray-200 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
                      {/* Gradient Background Accent */}
                      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.bgColor}`}></div>
                      
                      {/* Content - Ultra Compact Mobile Layout */}
                      <div className="relative px-2 py-1.5 sm:px-3 sm:py-2 lg:p-4 h-full flex items-center gap-2 sm:gap-3">
                        {/* Icon Container - Very small on mobile */}
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-md bg-gradient-to-br ${category.bgColor} flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-sm flex-shrink-0`}>
                          <Wheat className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                        </div>
                        
                        {/* Typography - Ultra compact */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-xs sm:text-sm lg:text-base text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight mb-0.5">
                            {category.title}
                          </h3>
                          <p className="text-[10px] sm:text-xs lg:text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                            {category.subtitle}
                          </p>
                        </div>
                        
                        {/* Arrow Icon - Hidden on mobile */}
                        <div className="hidden lg:block opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0">
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Strip - Repositioned and Mobile Optimized */}
      {/* <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 text-white py-4 sm:py-5 md:py-6 mt-4 sm:mt-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center gap-3 sm:gap-4">
            <div className="flex-1 max-w-4xl">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2">🌾 Premium Rice • Direct from Farms • Free Shipping ₹500+</h3>
              <p className="text-yellow-100 text-xs sm:text-sm md:text-base">Aged Basmati & Golden Sella rice delivered fresh to your kitchen</p>
            </div>
            <Link href="/products">
              <Button variant="outline" size="sm" className="bg-white text-amber-700 hover:bg-yellow-50 border-white text-xs sm:text-sm font-medium px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Explore Rice Varieties
              </Button>
            </Link>
          </div>
        </div>
      </div> */}
    </div>
  )
}