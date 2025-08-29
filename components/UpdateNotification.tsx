'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, X, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { registerUpdateHandler, forceReload } from '@/lib/cache-manager'

interface UpdateNotificationProps {
  autoShow?: boolean
  position?: 'top' | 'bottom'
}

export default function UpdateNotification({ 
  autoShow = true, 
  position = 'bottom' 
}: UpdateNotificationProps) {
  const [showUpdate, setShowUpdate] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (autoShow) {
      // Register for update notifications
      registerUpdateHandler(() => {
        setShowUpdate(true)
      })
    }
  }, [autoShow])

  const handleUpdate = async () => {
    setIsUpdating(true)
    try {
      // Force reload with cache clear
      forceReload()
    } catch (error) {
      console.error('Update failed:', error)
      setIsUpdating(false)
    }
  }

  const handleDismiss = () => {
    setShowUpdate(false)
  }

  const positionStyles = position === 'top' 
    ? 'top-4 left-4 right-4' 
    : 'bottom-4 left-4 right-4'

  return (
    <AnimatePresence>
      {showUpdate && (
        <motion.div
          initial={{ opacity: 0, y: position === 'top' ? -100 : 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'top' ? -100 : 100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed ${positionStyles} z-[9999] max-w-md mx-auto`}
        >
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-emerald-500 to-blue-500 text-white overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20" />
                
                {/* Content */}
                <div className="relative p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Download className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          Update Available!
                        </h3>
                        <Badge variant="secondary" className="bg-white/20 text-white text-xs mt-1">
                          Version 2.0
                        </Badge>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDismiss}
                      className="text-white hover:bg-white/20 p-1 h-auto"
                      disabled={isUpdating}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-white/90 text-sm mb-4 leading-relaxed">
                    A new version is available with improved features and bug fixes. 
                    Refresh to get the latest updates.
                  </p>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      size="sm"
                      className="bg-white text-emerald-600 hover:bg-white/90 flex-1"
                    >
                      {isUpdating ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <RefreshCw className="w-4 h-4 mr-2" />
                          </motion.div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Refresh Now
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDismiss}
                      disabled={isUpdating}
                      className="text-white hover:bg-white/20"
                    >
                      Later
                    </Button>
                  </div>
                </div>

                {/* Animated shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Development component to manually trigger updates
export function DevUpdateTrigger() {
  const [showUpdate, setShowUpdate] = useState(false)

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed top-20 right-4 z-[9999]">
      <Button
        onClick={() => setShowUpdate(!showUpdate)}
        size="sm"
        variant="outline"
        className="bg-yellow-100 border-yellow-300 text-yellow-700 hover:bg-yellow-200"
      >
        🚧 Test Update
      </Button>
      
      {showUpdate && (
        <UpdateNotification autoShow={false} />
      )}
    </div>
  )
}
