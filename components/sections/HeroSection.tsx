'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Banner {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  cta: string
  ctaLink: string
  bgColor: string
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
      title: "Premium Basmati Rice Collection",
      subtitle: "Up to 25% off",
      description: "Authentic aged basmati rice varieties with extra-long grains and distinctive aroma",
      image: "/images/rice-hero-slider.jpg",
      cta: "Shop Rice",
      ctaLink: "/products?category=rice",
      bgColor: "from-emerald-600 via-emerald-700 to-emerald-900"
    },
    {
      id: 3,
      title: "Multigrain Flour Range",
      subtitle: "Healthy nutrition",
      description: "Nutritious multigrain flour blends for wholesome family meals and baking",
      image: "/images/multigrain-flour.jpg",
      cta: "Shop Flour",
      ctaLink: "/products?category=flour",
      bgColor: "from-amber-500 via-yellow-600 to-orange-700"
    }
  ], [])

  // Debug: Log current slide image
  useEffect(() => {
    console.log('Current slide image:', banners[currentSlide]?.image);
  }, [currentSlide, banners]);

  const featuredCategories = [
    {
      title: "Premium Basmati 1121",
      subtitle: "Extra long grain",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop&q=80",
      link: "/products?brand=basmati-1121",
      bgColor: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Sella Rice",
      subtitle: "Golden & White",
      image: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=600&h=400&fit=crop&q=80",
      link: "/products?category=sella",
      bgColor: "from-amber-500 to-amber-600"
    },
    {
      title: "Kashmina Brand",
      subtitle: "Premium quality",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop&q=80",
      link: "/products?brand=kashmina",
      bgColor: "from-blue-500 to-blue-600"
    },
    {
      title: "Bulk Orders",
      subtitle: "Wholesale rates",
      image: "https://images.unsplash.com/photo-1594736797933-d0d6483cae4d?w=600&h=400&fit=crop&q=80",
      link: "/bulk-supply",
      bgColor: "from-purple-500 to-purple-600"
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
    <div className="relative bg-gray-50 mt-4 sm:mt-6 md:mt-8">
      {/* Amazon-style Hero Layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-4 md:gap-5 lg:gap-6">
          
          {/* Main Banner Slider - Left Side (3/4 width) - Better mobile aspect ratio */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-lg shadow-lg aspect-[3/2] sm:aspect-[16/10] md:aspect-video isolate">
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
                <div className={`absolute inset-0 bg-gradient-to-br ${banners[currentSlide].bgColor} z-0`}></div>
                
                <Image
                  src={banners[currentSlide].image}
                  alt={banners[currentSlide].title}
                  fill
                  className="object-cover z-10"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 75vw"
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
                    <div className="bg-black/40 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8">
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
                            <Link href={banners[currentSlide].ctaLink}>
                              {banners[currentSlide].cta}
                            </Link>
                          </Button>
                        </div>
                      </motion.div>
                    </div>
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

          {/* Modern Category Cards - Right Side (1/4 width) - Mobile-first layout */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
              {featuredCategories.slice(0, 4).map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="min-h-[100px] sm:min-h-[110px] lg:min-h-[120px]"
                >
                  <Link href={category.link}>
                    <div className="group h-full relative bg-white rounded-lg border border-gray-200 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
                      {/* Gradient Background Accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.bgColor}`}></div>
                      
                      {/* Content - Mobile-optimized Layout */}
                      <div className="relative p-4 sm:p-5 h-full flex items-center gap-3 sm:gap-4">
                        {/* Icon Container */}
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br ${category.bgColor} flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg flex-shrink-0`}>
                          <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-5 lg:h-5 bg-white/20 rounded backdrop-blur-sm"></div>
                        </div>
                        
                        {/* Typography */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base lg:text-sm text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight mb-1">
                            {category.title}
                          </h3>
                          <p className="text-xs sm:text-sm lg:text-xs text-gray-600 group-hover:text-gray-700 transition-colors">
                            {category.subtitle}
                          </p>
                        </div>
                        
                        {/* Arrow Icon - Visible on larger screens */}
                        <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0">
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

      {/* Secondary Strip - Improved mobile layout */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 sm:gap-6">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold mb-2">Free Shipping on Orders Above ₹500</h3>
              <p className="text-emerald-100 text-sm sm:text-base">Premium quality products delivered to your doorstep</p>
            </div>
            <Button variant="outline" size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 border-white text-sm sm:text-base font-medium px-6 py-3 rounded-lg">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
