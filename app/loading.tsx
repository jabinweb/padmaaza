'use client'

import { motion } from 'framer-motion'
import { Loader2, Package, Wheat } from 'lucide-react'

// Predefined positions and animation parameters to avoid hydration mismatch
const RICE_GRAIN_CONFIG = [
  { left: 35, top: 25, xOffset: -8, duration: 4.2, delay: 0 },
  { left: 65, top: 30, xOffset: 5, duration: 4.8, delay: 0.5 },
  { left: 45, top: 70, xOffset: -3, duration: 5.2, delay: 1.0 },
  { left: 70, top: 60, xOffset: 8, duration: 4.5, delay: 1.5 },
  { left: 40, top: 45, xOffset: -5, duration: 4.0, delay: 0.3 },
  { left: 60, top: 80, xOffset: 6, duration: 5.0, delay: 0.8 }
]

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animated Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative mx-auto w-32 h-32 mb-6">
            {/* Main loader circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 border-4 border-emerald-200 border-t-emerald-600 rounded-full"
            />
            
            {/* Inner animated icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-4 flex items-center justify-center bg-white rounded-full shadow-lg"
            >
              <Package className="w-12 h-12 text-emerald-600" />
            </motion.div>

            {/* Outer pulse effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-emerald-200 rounded-full"
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Loading...
          </h2>
          <p className="text-lg text-slate-600">
            Preparing your experience
          </p>
        </motion.div>

        {/* Animated Progress Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center space-x-2 mb-8"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-emerald-600 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Floating Elements */}
        <div className="relative">
          {/* Rice grain animations */}
          {RICE_GRAIN_CONFIG.map((config, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-4 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full opacity-60"
              style={{
                left: `${config.left}%`,
                top: `${config.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, config.xOffset, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: config.duration,
                repeat: Infinity,
                delay: config.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Loading States */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-sm text-slate-500"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Please wait while we load your content...
          </motion.div>
        </motion.div>

        {/* Brand Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-12 pt-6 border-t border-slate-200"
        >
          <div className="flex items-center justify-center space-x-2 text-slate-500 text-sm">
            <Wheat className="w-4 h-4" />
            <span>Padmaaja Rasooi Pvt. Ltd.</span>
            <span>•</span>
            <span>&quot;The careful choice&quot;</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
