'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FloatingWhatsAppProps {
  phoneNumber: string
  message?: string
  position?: 'bottom-right' | 'bottom-left'
  showTooltip?: boolean
}

export default function FloatingWhatsApp({ 
  phoneNumber, 
  message = "Hello! I'm interested in your products.",
  position = 'bottom-right',
  showTooltip = true 
}: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltipState, setShowTooltipState] = useState(false)

  useEffect(() => {
    // Show the button after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
      
      // Show tooltip after button appears (if enabled)
      if (showTooltip) {
        setTimeout(() => {
          setShowTooltipState(true)
        }, 1000)

        // Hide tooltip after 5 seconds
        setTimeout(() => {
          setShowTooltipState(false)
        }, 6000)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [showTooltip])

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          className={`fixed ${positionClasses[position]} z-50`}
        >
          <div className="relative">
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltipState && (
                <motion.div
                  initial={{ opacity: 0, x: position === 'bottom-right' ? 20 : -20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: position === 'bottom-right' ? 20 : -20, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute ${
                    position === 'bottom-right' 
                      ? 'right-16 bottom-0' 
                      : 'left-16 bottom-0'
                  } mb-2`}
                >
                  <div className="bg-white rounded-lg shadow-lg p-3 max-w-xs relative border">
                    <button
                      onClick={() => setShowTooltipState(false)}
                      className="absolute -top-2 -right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-1 transition-colors"
                    >
                      <X className="h-3 w-3 text-gray-600" />
                    </button>
                    <p className="text-sm text-gray-700 mb-2">
                      👋 Need help? Chat with us on WhatsApp!
                    </p>
                    <p className="text-xs text-gray-500">
                      We typically reply within minutes
                    </p>
                    {/* Arrow */}
                    <div className={`absolute top-1/2 transform -translate-y-1/2 ${
                      position === 'bottom-right' 
                        ? '-right-2 border-l-white border-l-8 border-t-transparent border-b-transparent border-t-8 border-b-8' 
                        : '-left-2 border-r-white border-r-8 border-t-transparent border-b-transparent border-t-8 border-b-8'
                    } w-0 h-0`}></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* WhatsApp Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <Button
                onClick={handleWhatsAppClick}
                className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 p-0 relative overflow-hidden group"
                aria-label="Contact us on WhatsApp"
              >
                {/* Ripple effect background */}
                <div className="absolute inset-0 bg-green-400 rounded-full opacity-75 animate-ping"></div>
                
                {/* WhatsApp icon */}
                <div className="relative z-10">
                  <svg
                    className="h-7 w-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                  </svg>
                </div>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
