'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface PageLoaderProps {
  onLoadingComplete: () => void
  duration?: number
}

export default function PageLoader({ onLoadingComplete, duration = 800 }: PageLoaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress bar animation - faster completion
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 12.5 // Will complete in 0.8 seconds (100/12.5 * 100ms)
      })
    }, 100)

    // Complete loading after duration
    const loadingTimeout = setTimeout(() => {
      onLoadingComplete()
    }, duration)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(loadingTimeout)
    }
  }, [duration, onLoadingComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
    >
      <div className="text-center space-y-8 max-w-4xl mx-auto px-6">
        {/* Kashmina Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <Image
              src="/kashmina-logo.png"
              alt="Kashmina Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 128px, 160px"
            />
          </div>
        </motion.div>

        {/* Welcome Heading */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
            Welcome to Padmaaja Rasooi
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            Premium Rice • Authentic Quality • From Farm to Kitchen
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="w-full max-w-md mx-auto space-y-3"
        >
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden border border-slate-300/50">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full shadow-sm"
              style={{ width: `${Math.round(progress)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Loading your premium rice experience...
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
