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
    <div className="relative bg-gray-50">
      {/* Amazon-style Hero Layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          
          {/* Main Banner Slider - Left Side (3/4 width) - 16:9 aspect ratio */}
          <div className="lg:col-span-3 relative overflow-hidden rounded-lg shadow-lg aspect-video">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Enhanced Gradient Overlay for better text visibility */}
                {/* <div className={`absolute inset-0 bg-gradient-to-br ${banners[currentSlide].bgColor} opacity-60 z-10`}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-15"></div> */}
                
                <Image
                  src={banners[currentSlide].image}
                  alt={banners[currentSlide].title}
                  fill
                  className="object-cover z-0"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 75vw"
                  onError={(e) => {
                    console.error('Image failed to load:', banners[currentSlide].image);
                    // Fallback to a working background image
                    const target = e.target as HTMLImageElement;
                    target.src = '/hero-bg.jpg';
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', banners[currentSlide].image);
                  }}
                />
                
                {/* Content positioned in center-left with enhanced visibility */}
                <div className="absolute inset-0 z-20 flex items-center">
                  <div className="max-w-lg px-4 sm:px-6 md:px-8 lg:px-12">
                    {/* Semi-transparent background for text */}
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-2 sm:space-y-3 md:space-y-4"
                      >
                        <p className="text-yellow-300 font-semibold text-xs sm:text-sm md:text-base drop-shadow-lg">
                          {banners[currentSlide].subtitle}
                        </p>
                        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white leading-tight drop-shadow-2xl">
                          {banners[currentSlide].title}
                        </h1>
                        <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed max-w-xs sm:max-w-sm md:max-w-md drop-shadow-lg">
                          {banners[currentSlide].description}
                        </p>
                        <div className="pt-1 sm:pt-2">
                          <Button asChild size="sm" className="bg-white text-gray-900 hover:bg-gray-100 text-xs sm:text-sm font-medium px-3 sm:px-4 md:px-6 rounded-md shadow-lg">
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

            {/* Subtle Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-1 sm:p-1.5 rounded-full transition-all duration-200 backdrop-blur-sm opacity-80 hover:opacity-100"
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-1 sm:p-1.5 rounded-full transition-all duration-200 backdrop-blur-sm opacity-80 hover:opacity-100"
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>

            {/* Subtle Slide Indicators */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-1 sm:space-x-1.5">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Modern Category Cards - Right Side (1/4 width) - Match slider height */}
          <div className="lg:col-span-1 aspect-video lg:aspect-auto">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 h-full">
              {featuredCategories.slice(0, 4).map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="h-full min-h-0"
                >
                  <Link href={category.link}>
                    <div className="group h-full relative bg-white rounded-xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
                      {/* Gradient Background Accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.bgColor}`}></div>
                      
                      {/* Subtle Pattern Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-60"></div>
                      
                      {/* Content - Horizontal Layout */}
                      <div className="relative p-3 h-full flex items-center gap-3">
                        {/* Modern Icon Container - Left Side */}
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg flex-shrink-0`}>
                          <div className="w-5 h-5 bg-white/20 rounded-sm backdrop-blur-sm"></div>
                        </div>
                        
                        {/* Typography - Right Side */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm md:text-base text-gray-900 group-hover:text-emerald-600 transition-colors leading-tight tracking-tight mb-1">
                            {category.title}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-500 group-hover:text-gray-700 transition-colors leading-relaxed font-medium">
                            {category.subtitle}
                          </p>
                        </div>
                        
                        {/* Modern Hover Indicator */}
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0 flex-shrink-0">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${category.bgColor} flex items-center justify-center shadow-lg`}>
                            <ChevronRight className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        
                        {/* Subtle Glow Effect */}
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Strip - Proper spacing */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 mt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="mb-2 md:mb-0">
              <h3 className="text-sm md:text-base font-semibold">Free Shipping on Orders Above ₹500</h3>
              <p className="text-emerald-100 text-xs md:text-sm">Premium quality products delivered to your doorstep</p>
            </div>
            <Button variant="outline" size="sm" className="bg-white text-emerald-700 hover:bg-emerald-50 border-white text-xs md:text-sm">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
