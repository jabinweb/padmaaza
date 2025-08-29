'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Wallet, Target } from 'lucide-react'

export default function DashboardLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Dashboard Loading Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="relative mx-auto w-24 h-24 mb-4">
            {/* Main circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-0 border-3 border-emerald-200 border-t-emerald-600 rounded-full"
            />
            
            {/* Secondary circle */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ 
                duration: 1.8, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute inset-2 border-2 border-blue-200 border-r-blue-500 rounded-full"
            />
            
            {/* Center icon */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-6 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 rounded-full shadow-sm"
            >
              <TrendingUp className="w-6 h-6 text-emerald-600" />
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
          <div className="flex items-center justify-center space-x-2 text-emerald-600 font-semibold text-lg">
            <TrendingUp className="w-5 h-5" />
            <span>Loading Dashboard</span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Fetching your latest data...
          </p>
        </motion.div>

        {/* Progress dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center space-x-2 mb-8"
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Dashboard Cards Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-md mx-auto"
        >
          {[
            { icon: TrendingUp, label: 'Earnings', color: 'text-emerald-500' },
            { icon: Users, label: 'Team', color: 'text-blue-500' },
            { icon: Wallet, label: 'Wallet', color: 'text-purple-500' },
            { icon: Target, label: 'Goals', color: 'text-orange-500' }
          ].map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={item.label}
                animate={{ 
                  opacity: [0.4, 1, 0.4],
                  scale: [0.95, 1, 0.95]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
                className="text-center p-3 bg-white rounded-lg shadow-sm border border-slate-100"
              >
                <IconComponent className={`w-5 h-5 ${item.color} mx-auto mb-1`} />
                <span className="text-xs text-slate-600 font-medium">{item.label}</span>
                <div className="mt-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"
                    animate={{ 
                      width: ['0%', '100%', '0%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Loading message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 text-xs text-slate-400"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Syncing your network data...
          </motion.span>
        </motion.div>
      </div>
    </div>
  )
}
