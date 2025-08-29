'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WifiOff, RefreshCw, Home, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <motion.div
              animate={{ rotate: isOnline ? 0 : 360 }}
              transition={{ duration: 2, repeat: isOnline ? 0 : Infinity }}
              className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <WifiOff className="h-10 w-10 text-gray-500" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {isOnline ? 'Back Online!' : 'You\'re Offline'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-gray-600">
              {isOnline 
                ? 'Your internet connection has been restored. Click refresh to continue.'
                : 'It looks like you\'re not connected to the internet. Some features may not be available.'
              }
            </p>

            {!isOnline && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h3 className="font-semibold text-emerald-900 mb-2">Available Offline:</h3>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>• View cached rice products</li>
                  <li>• Browse your business dashboard</li>
                  <li>• Access earnings history</li>
                  <li>• Review partnership information</li>
                  <li>• Check your sales performance</li>
                </ul>
              </div>
            )}

            <div className="space-y-3">
              <Button 
                onClick={handleRefresh} 
                className="w-full"
                variant={isOnline ? 'default' : 'outline'}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                {isOnline ? 'Refresh Page' : 'Try Again'}
              </Button>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/products">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Products
                  </Link>
                </Button>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              {isOnline 
                ? 'Connection restored automatically.'
                : 'We\'ll automatically reconnect when your internet is back.'
              }
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
