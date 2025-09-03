'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

interface ImageSliderProps {
  images: {
    src: string
    alt: string
    title?: string
  }[]
  autoPlayInterval?: number
}

export default function ImageSlider({ images, autoPlayInterval = 5000 }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(images.length).fill(false))
  const [isLoading, setIsLoading] = useState(true)

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((image, index) => {
        return new Promise<void>((resolve, reject) => {
          const img = new window.Image()
          img.onload = () => {
            setImagesLoaded(prev => {
              const newLoaded = [...prev]
              newLoaded[index] = true
              return newLoaded
            })
            resolve()
          }
          img.onerror = () => {
            console.warn(`Failed to load image: ${image.src}`)
            setImagesLoaded(prev => {
              const newLoaded = [...prev]
              newLoaded[index] = true // Mark as loaded even if failed to avoid infinite loading
              return newLoaded
            })
            resolve() // Don't reject to avoid breaking the Promise.all
          }
          img.src = image.src
        })
      })

      try {
        await Promise.all(imagePromises)
        setIsLoading(false)
      } catch (error) {
        console.error('Error preloading images:', error)
        setIsLoading(false)
      }
    }

    preloadImages()
  }, [images])

  useEffect(() => {
    if (autoPlayInterval > 0 && !isLoading) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, autoPlayInterval)

      return () => clearInterval(interval)
    }
  }, [images.length, autoPlayInterval, isLoading])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '21/9' }}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-2" />
            <p className="text-gray-600 text-sm">Loading images...</p>
          </div>
        </div>
      )}

      {/* Image Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            onLoad={() => {
              setImagesLoaded(prev => {
                const newLoaded = [...prev]
                newLoaded[currentIndex] = true
                return newLoaded
              })
            }}
          />
          
          {/* Image Loading Skeleton */}
          {!imagesLoaded[currentIndex] && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {/* Title Overlay */}
          {images[currentIndex].title && (
            <div className="absolute bottom-8 left-8 right-8">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg"
              >
                {images[currentIndex].title}
              </motion.h3>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Only show when not loading */}
      {!isLoading && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator - Only show when not loading */}
      {!isLoading && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
