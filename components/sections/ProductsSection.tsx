'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  description: string | null
  images: string[]
  category: {
    id: string
    name: string
  }
}

interface Category {
  id: string
  name: string
  displayName?: string
}

interface ProductsSectionProps {
  products: Product[]
  categories: Category[]
}

export default function ProductsSection({ products, categories }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [productsPerSlide, setProductsPerSlide] = useState(4)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Update products per slide based on window size
  useEffect(() => {
    const updateProductsPerSlide = () => {
      if (window.innerWidth < 640) {
        setProductsPerSlide(1) // mobile
      } else if (window.innerWidth < 1024) {
        setProductsPerSlide(2) // tablet
      } else {
        setProductsPerSlide(4) // desktop
      }
    }

    updateProductsPerSlide()
    window.addEventListener('resize', updateProductsPerSlide)
    return () => window.removeEventListener('resize', updateProductsPerSlide)
  }, [])

  // Create category display names mapping
  const getCategoryDisplayName = (category: Category) => {
    const displayNames: { [key: string]: string } = {
      'basmati': 'Perfectionist',
      'premium': 'Quality Seeker', 
      'organic': 'Taste Champion',
      'specialty': 'Smart Shopper',
      'kashmina steam': 'Kashmina Steam',
      'kashmina': 'Kashmina Steam',
      'steam': 'Kashmina Steam',
      'rice': 'Premium Rice'
    }
    return displayNames[category.name.toLowerCase()] || category.name
  }

  // Add "All" category with enhanced categories
  const allCategories = [
    { id: 'all', name: 'All', displayName: 'All' },
    ...categories.map(cat => ({
      ...cat,
      displayName: getCategoryDisplayName(cat)
    }))
  ]

  // Filter products based on active category
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category.id === activeCategory)

  // Products per slide (responsive)
  const getProductsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1 // mobile
      if (window.innerWidth < 1024) return 2 // tablet
      return 4 // desktop
    }
    return 4
  }

  const totalSlides = Math.ceil(filteredProducts.length / productsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setCurrentSlide(0) // Reset to first slide when category changes
  }

  // Touch handlers for mobile swipe
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe && currentSlide < totalSlides - 1) {
      nextSlide()
    } else if (isRightSwipe && currentSlide > 0) {
      prevSlide()
    }
  }

  const getCurrentProducts = () => {
    const startIndex = currentSlide * productsPerSlide
    return filteredProducts.slice(startIndex, startIndex + productsPerSlide)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-emerald-900 mb-4">
            BASMATI RICE
          </h2>
          <div className="flex justify-center mb-8">
            <div className="w-32 h-px bg-emerald-600 relative">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {allCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-medium ${
                activeCategory === category.id
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-emerald-700 border-emerald-600 hover:bg-emerald-50'
              }`}
            >
              {category.displayName || category.name}
            </button>
          ))}
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-6 h-6 text-emerald-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300"
                aria-label="Next products"
              >
                <ChevronRight className="w-6 h-6 text-emerald-700" />
              </button>
            </>
          )}

          {/* Products Grid */}
          <div 
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={`${activeCategory}-${currentSlide}`}
            >
              {getCurrentProducts().map((product) => (
                <motion.div
                  key={product.id}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center rounded-lg">
                        <div className="text-emerald-600 text-4xl font-bold">
                          {product.name.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="text-emerald-600 border-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-full px-6 py-2 font-medium"
                    >
                      <Link href={`/products/${product.slug}`}>
                        KNOW MORE →
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="hidden sm:flex justify-center mt-8 space-x-1.5">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-emerald-600' : 'bg-emerald-200'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-lg font-medium"
          >
            <Link href="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}