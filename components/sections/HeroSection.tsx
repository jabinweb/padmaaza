'use client'

import { useState, useEffect } from 'react'
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

  const banners: Banner[] = [
    {
      id: 1,
      title: "Premium Basmati Rice Collection",
      subtitle: "Up to 25% off",
      description: "Authentic aged basmati rice varieties with extra-long grains and distinctive aroma",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&h=400&fit=crop&crop=center",
      cta: "Shop Rice",
      ctaLink: "/products?category=rice",
      bgColor: "from-emerald-600 via-emerald-700 to-emerald-900"
    },
    {
      id: 3,
      title: "Multigrain Flour Range",
      subtitle: "Healthy nutrition",
      description: "Nutritious multigrain flour blends for wholesome family meals and baking",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=400&fit=crop&crop=center",
      cta: "Shop Flour",
      ctaLink: "/products?category=flour",
      bgColor: "from-amber-500 via-yellow-600 to-orange-700"
    }
  ]

  const featuredCategories = [
    {
      title: "Rice & Grains",
      subtitle: "Premium varieties",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=200&fit=crop",
      link: "/products?category=rice",
      bgColor: "from-emerald-50 to-emerald-100"
    },
    {
      title: "Spices & Masalas",
      subtitle: "Authentic flavors",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=200&fit=crop",
      link: "/products?category=spices",
      bgColor: "from-orange-50 to-orange-100"
    },
    {
      title: "Flour & Grains",
      subtitle: "Nutritious blends",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=200&fit=crop",
      link: "/products?category=flour",
      bgColor: "from-amber-50 to-amber-100"
    },
    {
      title: "Premium Products",
      subtitle: "Best sellers",
      image: "https://images.unsplash.com/photo-1633636146152-62c47d194ed3?w=400&h=200&fit=crop",
      link: "/products",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      title: "Organic Range",
      subtitle: "Natural & pure",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=200&fit=crop",
      link: "/products?category=organic",
      bgColor: "from-green-50 to-green-100"
    },
    {
      title: "Bulk Orders",
      subtitle: "Wholesale deals",
      image: "https://images.unsplash.com/photo-1594736797933-d0d6483cae4d?w=400&h=200&fit=crop",
      link: "/wholesale",
      bgColor: "from-purple-50 to-purple-100"
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
                {/* Subtle Extended Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${banners[currentSlide].bgColor} opacity-88 z-10`}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent z-15"></div>
                
                <Image
                  src={banners[currentSlide].image}
                  alt={banners[currentSlide].title}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Content positioned in center-left */}
                <div className="absolute inset-0 z-20 flex items-center">
                  <div className="max-w-lg px-4 sm:px-6 md:px-8 lg:px-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="space-y-2 sm:space-y-3 md:space-y-4"
                    >
                      <p className="text-yellow-300 font-medium text-xs sm:text-sm md:text-base">
                        {banners[currentSlide].subtitle}
                      </p>
                      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white leading-tight">
                        {banners[currentSlide].title}
                      </h1>
                      <p className="text-white/90 text-xs sm:text-sm md:text-base leading-relaxed max-w-xs sm:max-w-sm md:max-w-md">
                        {banners[currentSlide].description}
                      </p>
                      <div className="pt-1 sm:pt-2">
                        <Button asChild size="sm" className="bg-white text-gray-900 hover:bg-gray-100 text-xs sm:text-sm font-medium px-3 sm:px-4 md:px-6 rounded-md">
                          <Link href={banners[currentSlide].ctaLink}>
                            {banners[currentSlide].cta}
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
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

          {/* Category Grid - Right Side (1/4 width) - Match slider height */}
          <div className="lg:col-span-1 aspect-video lg:aspect-auto">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3 h-full">
              {featuredCategories.slice(0, 4).map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Link href={category.link}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-0 overflow-hidden group hover:scale-105">
                      <div className="relative h-full min-h-[60px] sm:min-h-[70px] md:min-h-[80px] lg:min-h-[100px]">
                        {/* Strong dark overlay for better text visibility */}
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors z-10"></div>
                        <div className={`absolute inset-0 bg-gradient-to-r ${category.bgColor} opacity-30 group-hover:opacity-40 transition-opacity z-5`}></div>
                        <Image
                          src={category.image}
                          alt={category.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-center z-20 p-2 sm:p-3 md:p-4">
                          <div>
                            <h3 className="font-bold text-xs sm:text-sm md:text-sm lg:text-base text-white drop-shadow-2xl leading-tight group-hover:text-yellow-100 transition-colors">
                              {category.title}
                            </h3>
                            <p className="text-xs sm:text-xs md:text-xs lg:text-sm text-white/95 drop-shadow-xl mt-0.5 sm:mt-1 group-hover:text-yellow-50 transition-colors font-medium">
                              {category.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
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
