'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundImage: "url('/main-loading.jpg')",
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
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg"
        >
          Welcome Padmaaja Rasooi
        </motion.h1>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="w-full max-w-md mx-auto space-y-3"
        >
          <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-2 overflow-hidden border border-white/20">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full"
              style={{ width: `${Math.round(progress)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
