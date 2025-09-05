'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PageLoader from '@/components/ui/page-loader'

interface ClientPageWrapperProps {
  children: React.ReactNode
}

export default function ClientPageWrapper({ children }: ClientPageWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <PageLoader
            onLoadingComplete={handleLoadingComplete}
            duration={3000}
          />
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <div className="animate-in fade-in duration-500">
          {children}
        </div>
      )}
    </>
  )
}
