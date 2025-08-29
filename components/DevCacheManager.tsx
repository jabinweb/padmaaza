'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, RefreshCw, Info, Zap, Minimize2, Maximize2 } from 'lucide-react'
import { clearAllCaches, getCacheStatus, forceReload } from '@/lib/cache-manager'

export default function DevCacheManager() {
  const [cacheStatus, setCacheStatus] = useState<any[]>([])
  const [isClearing, setIsClearing] = useState(false)
  const [lastCleared, setLastCleared] = useState<string | null>(null)
  const [isMinimized, setIsMinimized] = useState(false)

  // Always call hooks first, before any conditional logic
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      loadCacheStatus()
    }
  }, [])

  // Only show in development - conditional rendering after hooks
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const loadCacheStatus = async () => {
    try {
      const status = await getCacheStatus()
      setCacheStatus(status)
    } catch (error) {
      console.error('Failed to load cache status:', error)
    }
  }

  const handleClearCaches = async () => {
    setIsClearing(true)
    try {
      await clearAllCaches()
      setLastCleared(new Date().toLocaleTimeString())
      await loadCacheStatus()
    } catch (error) {
      console.error('Failed to clear caches:', error)
    } finally {
      setIsClearing(false)
    }
  }

  const handleForceReload = () => {
    forceReload()
  }

  return (
    <div className="fixed top-4 left-4 z-[9999] max-w-sm">
      <Card className="bg-yellow-50 border-yellow-200 shadow-lg">
        <CardHeader className="pb-3 p-0">
          <CardTitle className="text-lg font-bold text-yellow-800 flex items-center justify-between">
            {isMinimized ? (
              <Button
                onClick={() => setIsMinimized(!isMinimized)}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-yellow-700 hover:bg-yellow-100"
                title="Expand Dev Cache Manager"
              >
                <Zap className="w-5 h-5" />
              </Button>
            ) : (
              <>
                <div className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Dev Cache Manager
                </div>
                <Button
                  onClick={() => setIsMinimized(!isMinimized)}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-yellow-700 hover:bg-yellow-100"
                  title="Minimize Dev Cache Manager"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </CardTitle>
        </CardHeader>
        {!isMinimized && (
          <CardContent className="space-y-4">
          {/* Cache Status */}
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2 flex items-center">
              <Info className="w-4 h-4 mr-1" />
              Cache Status
            </h4>
            {cacheStatus.length > 0 ? (
              <div className="space-y-1">
                {cacheStatus.map((cache, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-yellow-600 truncate">{cache.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {cache.size} items
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-yellow-600">No caches found</p>
            )}
          </div>

          {/* Last Cleared */}
          {lastCleared && (
            <div className="text-xs text-yellow-600">
              Last cleared: {lastCleared}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={handleClearCaches}
              disabled={isClearing}
              size="sm"
              variant="outline"
              className="flex-1 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
            >
              {isClearing ? (
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-1" />
              )}
              Clear Caches
            </Button>

            <Button
              onClick={handleForceReload}
              size="sm"
              className="bg-yellow-600 text-white hover:bg-yellow-700"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Force Reload
            </Button>
          </div>

          {/* Refresh Cache Status */}
          <Button
            onClick={loadCacheStatus}
            variant="ghost"
            size="sm"
            className="w-full text-yellow-600 hover:bg-yellow-100"
          >
            Refresh Status
          </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
