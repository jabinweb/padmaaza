'use client'

import { motion } from 'framer-motion'
import { Settings, Shield, BarChart3 } from 'lucide-react'

export default function AdminLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Admin Loading Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="relative mx-auto w-24 h-24 mb-4">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 border-3 border-blue-200 border-t-blue-600 rounded-full"
            />
            
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-3 border-2 border-purple-200 border-b-purple-500 rounded-full"
            />
            
            {/* Center icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-6 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-full shadow-sm"
            >
              <Settings className="w-6 h-6 text-blue-600" />
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <div className="flex items-center justify-center space-x-2 text-blue-600 font-semibold text-lg">
            <Shield className="w-5 h-5" />
            <span>Loading Admin Panel</span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Preparing dashboard data...
          </p>
        </motion.div>

        {/* Progress indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center space-x-2"
        >
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Stats preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto"
        >
          {[
            { icon: BarChart3, label: 'Analytics' },
            { icon: Settings, label: 'Settings' },
            { icon: Shield, label: 'Security' }
          ].map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={item.label}
                animate={{ 
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut"
                }}
                className="text-center p-3 bg-white rounded-lg shadow-sm border border-slate-100"
              >
                <IconComponent className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span className="text-xs text-slate-500">{item.label}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
