'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PageLoaderProps {
  onLoadingComplete: () => void
  duration?: number
}

export default function PageLoader({ onLoadingComplete, duration = 1500 }: PageLoaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 6.67 // Will complete in 1.5 seconds
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
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/2154216/pexels-photo-2154216.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-6">
        {/* Main Heading */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg"
        >
          Welcome Padmaaza Rasooi
        </motion.h1>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="w-full max-w-md mx-auto space-y-3"
        >
          <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-2 overflow-hidden border border-white/20">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full"
              style={{ width: `${Math.round(progress)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-sm text-white/80 font-medium text-center drop-shadow">
            {Math.round(progress)}% Complete
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
