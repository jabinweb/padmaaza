// Performance monitoring utility
export class PerformanceMonitor {
  private static marks: Map<string, number> = new Map()

  static mark(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      const now = performance.now()
      this.marks.set(name, now)
      performance.mark(name)
    }
  }

  static measure(name: string, startMark: string, endMark?: string) {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        if (endMark) {
          performance.measure(name, startMark, endMark)
        } else {
          performance.measure(name, startMark)
        }
        
        const measure = performance.getEntriesByName(name, 'measure')[0]
        console.log(`⚡ ${name}: ${measure.duration.toFixed(2)}ms`)
        return measure.duration
      } catch (error) {
        console.warn('Performance measurement failed:', error)
      }
    }
    return 0
  }

  static getMetrics() {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      return {
        // Core Web Vitals approximations
        FCP: navigation.responseEnd - navigation.fetchStart,
        LCP: navigation.loadEventEnd - navigation.fetchStart,
        TTFB: navigation.responseStart - navigation.requestStart,
        
        // Loading metrics
        DOMContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        
        // Network metrics
        DNSLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        TCPConnection: navigation.connectEnd - navigation.connectStart,
        
        // Page lifecycle
        totalTime: navigation.loadEventEnd - navigation.fetchStart
      }
    }
    return null
  }

  static logMetrics() {
    const metrics = this.getMetrics()
    if (metrics) {
      console.group('📊 Performance Metrics')
      console.log('🎨 First Contentful Paint (approx):', metrics.FCP.toFixed(2) + 'ms')
      console.log('🖼️ Largest Contentful Paint (approx):', metrics.LCP.toFixed(2) + 'ms') 
      console.log('⚡ Time to First Byte:', metrics.TTFB.toFixed(2) + 'ms')
      console.log('📄 DOM Content Loaded:', metrics.DOMContentLoaded.toFixed(2) + 'ms')
      console.log('✅ Load Complete:', metrics.loadComplete.toFixed(2) + 'ms')
      console.log('🌐 DNS Lookup:', metrics.DNSLookup.toFixed(2) + 'ms')
      console.log('🔗 TCP Connection:', metrics.TCPConnection.toFixed(2) + 'ms')
      console.log('⏱️ Total Page Load:', metrics.totalTime.toFixed(2) + 'ms')
      console.groupEnd()
    }
  }
}