'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home, Mail, Bug } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error)
  }, [error])

  const errorDetails = {
    message: error.message || 'An unexpected error occurred',
    digest: error.digest || 'Unknown',
    timestamp: new Date().toISOString(),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Error Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative mx-auto w-32 h-32 mb-6">
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="p-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full shadow-2xl">
                <AlertTriangle className="w-16 h-16 text-white" />
              </div>
            </motion.div>
            
            {/* Pulse effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-red-400 rounded-full"
            />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center items-center space-x-3 mb-6">
            <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">
              <Bug className="w-4 h-4 mr-1" />
              Application Error
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Something went wrong!
          </h1>
          
          <p className="text-xl text-slate-600 mb-6 leading-relaxed">
            We&apos;re sorry, but something unexpected happened. Our team has been notified and we&apos;re working to fix this issue.
          </p>
        </motion.div>

        {/* Error Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-red-800 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Error Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert className="border-red-200 bg-white/50">
                <AlertDescription className="text-sm">
                  <strong>Message:</strong> {errorDetails.message}
                </AlertDescription>
              </Alert>
              
              {process.env.NODE_ENV === 'development' && (
                <>
                  <Alert className="border-orange-200 bg-white/50">
                    <AlertDescription className="text-sm font-mono">
                      <strong>Error ID:</strong> {errorDetails.digest}
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-orange-200 bg-white/50">
                    <AlertDescription className="text-sm">
                      <strong>Timestamp:</strong> {new Date(errorDetails.timestamp).toLocaleString()}
                    </AlertDescription>
                  </Alert>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <Button 
            onClick={reset}
            size="lg" 
            className="bg-red-600 text-white hover:bg-red-700"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          
          <Button 
            asChild
            size="lg" 
            variant="outline" 
            className="border-slate-300"
          >
            <a href="/">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </a>
          </Button>

          <Button 
            asChild
            size="lg" 
            variant="outline" 
            className="border-slate-300"
          >
            <a href="/contact">
              <Mail className="w-5 h-5 mr-2" />
              Report Issue
            </a>
          </Button>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-slate-50 to-emerald-50 rounded-2xl p-6 border border-slate-200"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-3">
            Need immediate assistance?
          </h3>
          <p className="text-slate-600 mb-4 text-sm">
            If this error persists, please contact our support team with the error details above.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
            <div className="flex items-center justify-center space-x-2 text-slate-600">
              <Mail className="w-4 h-4" />
              <span>support@padmaaja.com</span>
            </div>
            <div className="hidden sm:block text-slate-400">•</div>
            <div className="flex items-center justify-center space-x-2 text-slate-600">
              <span>📞</span>
              <span>+91 98765 43210</span>
            </div>
          </div>
        </motion.div>

        {/* Debug Information (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8"
          >
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-yellow-800">
                  🚧 Development Mode - Debug Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs text-yellow-700 bg-yellow-100 p-3 rounded overflow-auto max-h-32">
                  {error.stack || 'No stack trace available'}
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-slate-500">
            © 2024 Padmaaja Rasooi Pvt. Ltd. • &quot;The careful choice&quot;
          </p>
        </motion.div>
      </div>
    </div>
  )
}
