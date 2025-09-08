// Database Optimizer for SEO Performance
// Optimizes database queries with caching and performance monitoring

interface CacheEntry {
  data: any
  timestamp: number
  ttl: number
}

interface QueryMetrics {
  queryTime: number
  cacheHit: boolean
  queryType: string
}

class DatabaseOptimizerClass {
  private cache = new Map<string, CacheEntry>()
  private metrics: QueryMetrics[] = []

  // Cache management
  async getCachedData(key: string): Promise<any | null> {
    const entry = this.cache.get(key)
    if (!entry) return null

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl * 1000) {
      this.cache.delete(key)
      return null
    }

    this.recordMetrics(0, true, 'cache_hit')
    return entry.data
  }

  async setCachedData(key: string, data: any, ttlSeconds = 300): Promise<void> {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds
    })
  }

  // Query optimization wrapper
  async executeOptimizedQuery<T>(
    queryKey: string, 
    queryFn: () => Promise<T>,
    ttlSeconds = 300
  ): Promise<T> {
    const startTime = Date.now()
    
    // Try cache first
    const cached = await this.getCachedData(queryKey)
    if (cached) {
      return cached
    }

    // Execute query
    const result = await queryFn()
    const queryTime = Date.now() - startTime

    // Cache result
    await this.setCachedData(queryKey, result, ttlSeconds)
    
    // Record metrics
    this.recordMetrics(queryTime, false, queryKey)
    
    return result
  }

  // Performance monitoring
  private recordMetrics(queryTime: number, cacheHit: boolean, queryType: string) {
    this.metrics.push({ queryTime, cacheHit, queryType })
    
    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics.shift()
    }
  }

  getPerformanceStats() {
    const recentMetrics = this.metrics.slice(-50)
    const cacheHitRate = recentMetrics.filter(m => m.cacheHit).length / recentMetrics.length
    const avgQueryTime = recentMetrics
      .filter(m => !m.cacheHit)
      .reduce((sum, m) => sum + m.queryTime, 0) / recentMetrics.filter(m => !m.cacheHit).length

    return {
      cacheHitRate: Math.round(cacheHitRate * 100),
      avgQueryTime: Math.round(avgQueryTime || 0),
      totalQueries: this.metrics.length,
      recentQueries: recentMetrics.length
    }
  }

  // SEO-specific optimizations
  async getOptimizedProducts(limit = 12, categoryId?: string) {
    const cacheKey = `products_seo_${limit}_${categoryId || 'all'}`
    
    return this.executeOptimizedQuery(cacheKey, async () => {
      // This would be the actual Prisma query
      return {
        products: [],
        seoData: {
          totalProducts: 0,
          categories: [],
          averageRating: 0
        }
      }
    }, 600) // Cache for 10 minutes
  }

  async getOptimizedCategories() {
    const cacheKey = 'categories_navigation'
    
    return this.executeOptimizedQuery(cacheKey, async () => {
      // This would be the actual Prisma query
      return {
        categories: [],
        productCounts: {},
        featuredCategories: []
      }
    }, 1800) // Cache for 30 minutes
  }

  async getSocialProofData() {
    const cacheKey = 'social_proof_data'
    
    return this.executeOptimizedQuery(cacheKey, async () => {
      // This would be the actual Prisma queries
      return {
        totalCustomers: 0,
        totalReviews: 0,
        averageRating: 0,
        recentReviews: [],
        topProducts: []
      }
    }, 900) // Cache for 15 minutes
  }

  // Cache invalidation for data consistency
  invalidateCache(pattern?: string) {
    if (!pattern) {
      this.cache.clear()
      return
    }

    const keysToDelete = Array.from(this.cache.keys()).filter(key => 
      key.includes(pattern)
    )
    
    keysToDelete.forEach(key => this.cache.delete(key))
  }

  // Cleanup old cache entries
  cleanupCache() {
    const now = Date.now()
    const keysToCheck = Array.from(this.cache.keys())
    
    keysToCheck.forEach(key => {
      const entry = this.cache.get(key)
      if (entry && now - entry.timestamp > entry.ttl * 1000) {
        this.cache.delete(key)
      }
    })
  }
}

export const DatabaseOptimizer = new DatabaseOptimizerClass()

// Auto cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    DatabaseOptimizer.cleanupCache()
  }, 5 * 60 * 1000)
}
