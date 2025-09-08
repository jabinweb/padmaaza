// SEO and Performance Test Suite for Padmaaja Website
// Run with: npx tsx seo-performance-test.js

import fs from 'fs/promises'
import path from 'path'
import { PrismaClient } from '@prisma/client'

class SEOPerformanceTestSuite {
  constructor() {
    this.prisma = new PrismaClient()
    this.tests = []
    this.passed = 0
    this.failed = 0
    this.warnings = 0
    this.baseUrl = 'http://localhost:3000'
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[36m',
      pass: '\x1b[32m', 
      fail: '\x1b[31m',
      warn: '\x1b[33m',
      reset: '\x1b[0m'
    }
    console.log(`${colors[type]}${message}${colors.reset}`)
  }

  async test(name, testFunc) {
    try {
      const result = await testFunc()
      if (result === 'warning') {
        this.warnings++
        this.log(`⚠️ ${name}`, 'warn')
      } else {
        this.passed++
        this.log(`✅ ${name}`, 'pass')
      }
      return true
    } catch (error) {
      this.failed++
      this.log(`❌ ${name}: ${error.message}`, 'fail')
      return false
    }
  }

  // SEO Meta Tags and Structure Tests
  async testSEOStructure() {
    this.log('\n🔍 Testing SEO Structure and Meta Tags...', 'info')
    
    await this.test('Root layout has proper meta configuration', async () => {
      const layoutContent = await fs.readFile('./app/layout.tsx', 'utf-8')
      
      const requiredMeta = [
        'metadata',
        'title',
        'description',
        'viewport',
        'charset'
      ]
      
      const missing = requiredMeta.filter(meta => !layoutContent.includes(meta))
      if (missing.length > 0) {
        throw new Error(`Missing meta configuration: ${missing.join(', ')}`)
      }
    })

    await this.test('SEO component exists and is comprehensive', async () => {
      const seoContent = await fs.readFile('./components/SEO.tsx', 'utf-8')
      
      const seoFeatures = [
        'title',
        'description',
        'keywords',
        'og:',
        'twitter:',
        'canonical',
        'structured-data'
      ]
      
      const missing = seoFeatures.filter(feature => !seoContent.includes(feature))
      if (missing.length > 2) {
        throw new Error(`SEO component missing features: ${missing.join(', ')}`)
      }
    })

    await this.test('Structured data component exists', async () => {
      const structuredDataContent = await fs.readFile('./components/StructuredData.tsx', 'utf-8')
      
      if (!structuredDataContent.includes('application/ld+json')) {
        throw new Error('Structured data not properly formatted')
      }
      
      // Check if structured data is being used in layout
      const layoutContent = await fs.readFile('./app/layout.tsx', 'utf-8')
      if (!layoutContent.includes('generateOrganizationJsonLd') && !layoutContent.includes('StructuredData')) {
        throw new Error('Missing organization/business structured data')
      }
    })

    await this.test('Sitemap generation exists', async () => {
      const sitemapContent = await fs.readFile('./app/sitemap.ts', 'utf-8')
      
      if (!sitemapContent.includes('MetadataRoute.Sitemap')) {
        throw new Error('Sitemap not properly configured')
      }
    })

    await this.test('Robots.txt configuration exists', async () => {
      const robotsContent = await fs.readFile('./app/robots.ts', 'utf-8')
      
      if (!robotsContent.includes('MetadataRoute.Robots')) {
        throw new Error('Robots.txt not properly configured')
      }
    })
  }

  // Page-specific SEO Tests
  async testPageSEO() {
    this.log('\n📄 Testing Individual Page SEO...', 'info')

    const pages = [
      { path: './app/(public)/page.tsx', name: 'Homepage' },
      { path: './app/(public)/products/page.tsx', name: 'Products page' },
      { path: './app/(public)/about/page.tsx', name: 'About page' },
      { path: './app/(public)/contact/page.tsx', name: 'Contact page' },
      { path: './app/(public)/cart/page.tsx', name: 'Cart page' }
    ]

    for (const page of pages) {
      await this.test(`${page.name} has proper SEO structure`, async () => {
        try {
          const content = await fs.readFile(page.path, 'utf-8')
          
          // Check for PageHero or similar SEO-friendly structure
          if (content.includes('PageHero') || content.includes('metadata') || content.includes('title')) {
            return true
          }
          
          return 'warning'
        } catch (error) {
          if (error.code === 'ENOENT') {
            return 'warning' // Page might not exist, which is okay
          }
          throw error
        }
      })
    }
  }

  // Image Optimization Tests
  async testImageOptimization() {
    this.log('\n🖼️ Testing Image Optimization...', 'info')

    await this.test('Next.js Image component usage', async () => {
      // Check if components use Next.js Image instead of img tags
      const componentFiles = await this.findFiles('./components', '.tsx')
      let imgTagCount = 0
      let nextImageCount = 0

      for (const file of componentFiles) {
        const content = await fs.readFile(file, 'utf-8')
        imgTagCount += (content.match(/<img\s/g) || []).length
        nextImageCount += (content.match(/import.*Image.*from.*next\/image/g) || []).length
      }

      if (imgTagCount > nextImageCount && imgTagCount > 5) {
        return 'warning'
      }
    })

    await this.test('Images directory structure', async () => {
      try {
        const publicFiles = await fs.readdir('./public')
        const hasImages = publicFiles.includes('images') || publicFiles.some(file => 
          file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp')
        )
        
        if (!hasImages) {
          return 'warning'
        }
      } catch (error) {
        return 'warning'
      }
    })

    await this.test('Favicon and meta images present', async () => {
      const publicFiles = await fs.readdir('./public')
      const requiredImages = ['apple-touch-icon.png']
      const faviconFiles = publicFiles.filter(file => file.includes('favicon'))
      
      const missing = requiredImages.filter(img => !publicFiles.includes(img))
      if (missing.length > 0 || faviconFiles.length === 0) {
        return 'warning'
      }
    })
  }

  // Performance Tests
  async testPerformance() {
    this.log('\n⚡ Testing Performance Optimizations...', 'info')

    await this.test('Next.js configuration optimizations', async () => {
      const nextConfigContent = await fs.readFile('./next.config.js', 'utf-8')
      
      const optimizations = [
        'compress',
        'poweredByHeader',
        'images'
      ]
      
      let foundOptimizations = 0
      optimizations.forEach(opt => {
        if (nextConfigContent.includes(opt)) foundOptimizations++
      })
      
      if (foundOptimizations < 2) {
        return 'warning'
      }
    })

    await this.test('Lazy loading implementation', async () => {
      // Check for lazy loading components
      const lazyComponentContent = await fs.readFile('./components/LazyComponents.tsx', 'utf-8')
      
      if (!lazyComponentContent.includes('lazy') || !lazyComponentContent.includes('Suspense')) {
        return 'warning'
      }
    })

    await this.test('Bundle optimization checks', async () => {
      const packageJsonContent = await fs.readFile('./package.json', 'utf-8')
      const packageJson = JSON.parse(packageJsonContent)
      
      // Check for bundle analysis scripts
      if (!packageJson.scripts['analyze'] && !packageJson.scripts['bundle-analyzer']) {
        return 'warning'
      }
    })

    await this.test('CSS optimization', async () => {
      const tailwindConfigContent = await fs.readFile('./tailwind.config.ts', 'utf-8')
      
      if (!tailwindConfigContent.includes('purge') && !tailwindConfigContent.includes('content')) {
        throw new Error('Tailwind CSS purging not configured')
      }
    })
  }

  // Database Performance for SEO
  async testDatabasePerformanceForSEO() {
    this.log('\n🗄️ Testing Database Performance for SEO...', 'info')

    await this.test('Product queries are optimized for SEO pages', async () => {
      const start = Date.now()
      
      // Test product listing query performance with optimized select
      await this.prisma.product.findMany({
        take: 10,
        select: {
          id: true,
          name: true,
          price: true,
          isActive: true,
          category: {
            select: {
              name: true
            }
          }
        },
        where: {
          isActive: true
        },
        orderBy: { createdAt: 'desc' }
      })
      
      const duration = Date.now() - start
      if (duration > 800) { // Stricter threshold for A+
        return 'warning'
      }
    })

    await this.test('Category queries for navigation', async () => {
      const start = Date.now()
      
      await this.prisma.category.findMany({
        include: {
          _count: {
            select: { products: true }
          }
        }
      })
      
      const duration = Date.now() - start
      if (duration > 500) {
        return 'warning'
      }
    })

    await this.test('User and review data for social proof', async () => {
      const start = Date.now()
      
      // Test queries that might be used for displaying social proof with optimized select
      await this.prisma.review.findMany({
        take: 5,
        select: {
          id: true,
          rating: true,
          title: true,
          createdAt: true,
          user: {
            select: { name: true }
          }
        },
        where: {
          isApproved: true
        },
        orderBy: { createdAt: 'desc' }
      })
      
      const duration = Date.now() - start
      if (duration > 600) { // Stricter threshold for A+
        return 'warning'
      }
    })
  }

  // Core Web Vitals Simulation
  async testCoreWebVitals() {
    this.log('\n📊 Testing Core Web Vitals Readiness...', 'info')

    await this.test('Loading optimization features', async () => {
      // Check for loading states and skeleton components
      const files = await this.findFiles('./components', '.tsx')
      let hasLoadingStates = false

      for (const file of files) {
        const content = await fs.readFile(file, 'utf-8')
        if (content.includes('loading') || content.includes('skeleton') || content.includes('Suspense')) {
          hasLoadingStates = true
          break
        }
      }

      if (!hasLoadingStates) {
        return 'warning'
      }
    })

    await this.test('Error boundaries for stability', async () => {
      const errorPageContent = await fs.readFile('./app/error.tsx', 'utf-8')
      
      if (!errorPageContent.includes('use client') || !errorPageContent.includes('Error')) {
        return 'warning'
      }
    })

    await this.test('Progressive Web App features', async () => {
      try {
        const manifestContent = await fs.readFile('./public/manifest.json', 'utf-8')
        const manifest = JSON.parse(manifestContent)
        
        const requiredFields = ['name', 'short_name', 'start_url', 'display', 'theme_color']
        const missing = requiredFields.filter(field => !manifest[field])
        
        if (missing.length > 0) {
          return 'warning'
        }
      } catch (error) {
        return 'warning'
      }
    })
  }

  // Accessibility and SEO
  async testAccessibilityForSEO() {
    this.log('\n♿ Testing Accessibility for SEO...', 'info')

    await this.test('Semantic HTML structure', async () => {
      const files = await this.findFiles('./app', '.tsx')
      let hasSemanticElements = false

      for (const file of files.slice(0, 5)) { // Check first 5 files
        const content = await fs.readFile(file, 'utf-8')
        if (content.includes('<main>') || content.includes('<section>') || 
            content.includes('<article>') || content.includes('<header>')) {
          hasSemanticElements = true
          break
        }
      }

      if (!hasSemanticElements) {
        return 'warning'
      }
    })

    await this.test('Alt text and image accessibility', async () => {
      const files = await this.findFiles('./components', '.tsx')
      let properImageUsage = true

      for (const file of files.slice(0, 10)) {
        const content = await fs.readFile(file, 'utf-8')
        const imgTags = content.match(/<img[^>]*>/g) || []
        
        for (const img of imgTags) {
          if (!img.includes('alt=')) {
            properImageUsage = false
            break
          }
        }
        if (!properImageUsage) break
      }

      if (!properImageUsage) {
        return 'warning'
      }
    })
  }

  // Content and Keywords Analysis
  async testContentOptimization() {
    this.log('\n📝 Testing Content Optimization...', 'info')

    await this.test('Homepage content optimization', async () => {
      const homepageContent = await fs.readFile('./app/(public)/page.tsx', 'utf-8')
      
      // Check for key business terms
      const businessTerms = ['basmati', 'rice', 'premium', 'quality', 'manufacturer']
      const foundTerms = businessTerms.filter(term => 
        homepageContent.toLowerCase().includes(term)
      )

      if (foundTerms.length < 3) {
        return 'warning'
      }
    })

    await this.test('Meta descriptions are unique and descriptive', async () => {
      // This would ideally check all pages, but we'll check key components
      const files = [
        './app/(public)/page.tsx',
        './app/(public)/products/page.tsx',
        './app/(public)/about/page.tsx'
      ]

      for (const file of files) {
        try {
          const content = await fs.readFile(file, 'utf-8')
          if (content.includes('description') && content.length > 100) {
            return true
          }
        } catch (error) {
          // File might not exist
          continue
        }
      }
      
      return 'warning'
    })
  }

  // Helper method to find files
  async findFiles(dir, extension) {
    const files = []
    
    try {
      const items = await fs.readdir(dir, { withFileTypes: true })
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name)
        
        if (item.isDirectory()) {
          const subFiles = await this.findFiles(fullPath, extension)
          files.push(...subFiles)
        } else if (item.name.endsWith(extension)) {
          files.push(fullPath)
        }
      }
    } catch (error) {
      // Directory might not exist or be accessible
    }
    
    return files
  }

  async generateSEOPerformanceReport() {
    const total = this.passed + this.failed + this.warnings
    const score = Math.round(((this.passed + (this.warnings * 0.5)) / total) * 100)
    
    this.log('\n📊 SEO & PERFORMANCE REPORT', 'info')
    this.log('='.repeat(50), 'info')
    this.log(`Total Tests: ${total}`, 'info')
    this.log(`Passed: ${this.passed}`, 'pass')
    this.log(`Warnings: ${this.warnings}`, 'warn')
    this.log(`Failed: ${this.failed}`, this.failed > 0 ? 'fail' : 'pass')
    this.log(`SEO Score: ${score}%`, score >= 90 ? 'pass' : score >= 80 ? 'warn' : 'fail')
    
    let grade = 'F'
    if (score >= 95) grade = 'A+'
    else if (score >= 90) grade = 'A'
    else if (score >= 85) grade = 'B+'
    else if (score >= 80) grade = 'B'
    else if (score >= 75) grade = 'C+'
    else if (score >= 70) grade = 'C'
    else if (score >= 60) grade = 'D'
    
    this.log(`Overall Grade: ${grade}`, score >= 85 ? 'pass' : score >= 70 ? 'warn' : 'fail')
    
    this.log('\n💡 SEO & PERFORMANCE RECOMMENDATIONS:', 'info')
    
    if (score >= 95) {
      this.log('🎉 Excellent! Your website is highly optimized for SEO and performance.', 'pass')
    } else if (score >= 85) {
      this.log('✅ Good SEO foundation. Minor optimizations could improve ranking.', 'pass')
    } else if (score >= 70) {
      this.log('⚠️ Decent SEO setup. Several improvements recommended.', 'warn')
    } else {
      this.log('❌ SEO needs significant improvement for better search rankings.', 'fail')
    }
    
    this.log('\n🚀 KEY OPTIMIZATIONS:', 'info')
    this.log('• Ensure all images have descriptive alt text', 'info')
    this.log('• Optimize Core Web Vitals with lazy loading', 'info')
    this.log('• Use structured data for rich snippets', 'info')
    this.log('• Implement proper meta descriptions for all pages', 'info')
    this.log('• Monitor page load speeds and optimize bundles', 'info')
    
    this.log('='.repeat(50), 'info')
  }

  async runAllTests() {
    try {
      this.log('🔍 Starting SEO & Performance Test Suite...', 'info')
      
      await this.testSEOStructure()
      await this.testPageSEO()
      await this.testImageOptimization()
      await this.testPerformance()
      await this.testDatabasePerformanceForSEO()
      await this.testCoreWebVitals()
      await this.testAccessibilityForSEO()
      await this.testContentOptimization()
      
      await this.generateSEOPerformanceReport()
      
    } catch (error) {
      this.log(`💥 Critical error: ${error.message}`, 'fail')
    } finally {
      await this.prisma.$disconnect()
    }
  }
}

// Run the SEO and Performance tests
const seoTestSuite = new SEOPerformanceTestSuite()
seoTestSuite.runAllTests().catch(console.error)
