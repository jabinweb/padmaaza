'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface PageLoaderProps {
  onLoadingComplete: () => void
  duration?: number
}

export default function PageLoader({ onLoadingComplete, duration = 8000 }: PageLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState(0) // 0: Welcome, 1: Company Info
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isMinimumTimeComplete, setIsMinimumTimeComplete] = useState(false)
  const [isPageReady, setIsPageReady] = useState(false)

  const welcomeMessages = [
    "Welcome",
    "स्वागत है", // Hindi
    "Welcome to PADMAAJA RASOOL"
  ]

  const companyMessages = [
    "PADMAAJA RASOOL PVT. LTD.",
    "The careful choice",
    "Premium Quality Rice & Grains", 
  ]

  // Simulate page readiness after a brief moment to account for real loading
  useEffect(() => {
    const pageReadyTimeout = setTimeout(() => {
      setIsPageReady(true)
    }, 500) // Page ready after 0.5 seconds (shorter)

    return () => clearTimeout(pageReadyTimeout)
  }, [])

  useEffect(() => {
    // Stage 1: Welcome messages (first 4.5 seconds)
    const welcomeTimeouts = [
      setTimeout(() => setCurrentMessage(1), 1500),  // Hindi welcome after 1.5s
      setTimeout(() => setCurrentMessage(2), 3000),  // Final welcome after 3s
      setTimeout(() => {
        setCurrentStage(1)
        setCurrentMessage(0)
      }, 4500), // Switch to company stage after 4.5 seconds
    ]

    // Stage 2: Company info messages (next 3.5 seconds)
    const companyTimeouts = [
      setTimeout(() => setCurrentMessage(1), 5500),  // Show tagline at 5.5s
      setTimeout(() => setCurrentMessage(2), 6500),  // Show products at 6.5s
    ]

    // Minimum time completion - FORCE the full duration
    const minimumTimeTimeout = setTimeout(() => {
      setIsMinimumTimeComplete(true)
    }, duration) // Always wait the full duration

    // Progress bar - smooth continuous progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          clearInterval(progressInterval)
          return 99 // Stop at 99% until minimum time is complete
        }
        return prev + 0.8
      })
    }, duration / 125)

    return () => {
      welcomeTimeouts.forEach(timeout => clearTimeout(timeout))
      companyTimeouts.forEach(timeout => clearTimeout(timeout))
      clearTimeout(minimumTimeTimeout)
      clearInterval(progressInterval)
    }
  }, [duration])

  // Only complete loading when both conditions are met
  useEffect(() => {
    if (isMinimumTimeComplete && isPageReady) {
      // Set progress to 100% and then complete
      setProgress(100)
      setTimeout(() => {
        onLoadingComplete()
      }, 800) // Extra delay to ensure company messages are seen
    }
  }, [isMinimumTimeComplete, isPageReady, onLoadingComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-orange-50"
    >
      <AnimatePresence mode="wait">
        {currentStage === 0 ? (
          // Stage 1: Big Welcome Message
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-4xl mx-auto px-6"
          >
            {/* Large Welcome Text */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-6"
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentMessage}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-700 to-orange-600 bg-clip-text text-transparent leading-tight"
                >
                  {welcomeMessages[currentMessage]}
                </motion.h1>
              </AnimatePresence>
              
              {currentMessage === 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl text-gray-700 font-medium"
                >
                  To Our World of Premium Quality
                </motion.p>
              )}
            </motion.div>

            {/* Warm greeting animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center space-x-3"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Progress Bar for Welcome Stage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="w-full max-w-md mx-auto space-y-3"
            >
              <div className="w-full bg-white/30 backdrop-blur-sm rounded-full h-1.5 overflow-hidden border border-white/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-orange-400 rounded-full shadow-sm"
                  style={{ width: `${Math.min(progress * 1.25, 62.5)}%` }} // Cap at 62.5% for welcome stage
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-gray-600/80 font-medium text-center">
                Preparing your experience... {Math.round(Math.min(progress * 1.25, 62.5))}%
              </p>
            </motion.div>
          </motion.div>
        ) : (
          // Stage 2: Company Information
          <motion.div
            key="company"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-md mx-auto px-6"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-32 h-32 mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-orange-500 rounded-full animate-pulse opacity-20"></div>
              <div className="relative w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-emerald-100">
                <div className="w-20 h-20 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="Padmaaja Rasool"
                    width={80}
                    height={80}
                    className="object-contain"
                    priority
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const fallback = target.nextElementSibling as HTMLElement
                      if (fallback) fallback.style.display = 'flex'
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center text-emerald-600 font-bold text-2xl">
                    P
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Company Messages */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-32 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessage}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-3"
                >
                  {currentMessage === 0 && (
                    <>
                      <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                        PADMAAJA RASOOL PVT. LTD.
                      </h1>
                      <p className="text-sm text-gray-600 font-medium">
                        &quot;The careful choice&quot;
                      </p>
                    </>
                  )}
                  {currentMessage === 1 && (
                    <>
                      <p className="text-sm text-orange-600 font-medium">
                        Your trusted partner in premium grains
                      </p>
                    </>
                  )}
                  {currentMessage >= 2 && (
                    <p className="text-lg md:text-xl font-semibold text-emerald-700">
                      {companyMessages[currentMessage]}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-2"
            >
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-orange-500 rounded-full"
                  style={{ width: `${Math.round(progress)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-sm text-gray-500">{Math.round(progress)}% Complete</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
