import { 
  MobileOptimizedLazyHeroSection, 
  MobileOptimizedLazyOurValues, 
  MobileOptimizedLazyAboutSection, 
  MobileOptimizedLazyCertificationsSection, 
  MobileOptimizedLazyKashminaSection, 
  MobileOptimizedLazyManufacturingSection, 
  MobileOptimizedLazyStatsSection, 
  MobileOptimizedLazyNewsSection,
} from '@/components/MobileOptimizedLazyComponents'
import { Badge } from '@/components/ui/badge'
import { prisma } from '@/lib/prisma'
import ClientPageWrapper from '@/components/sections/ClientPageWrapper'
import ProductsSection from '@/components/sections/ProductsSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Padmaaja Rasooi - Premium Rice Products & Quality Grains | Home',
  description: 'Experience the finest quality rice with Padmaaja Rasooi. Premium rice varieties sourced from the best farms for exceptional taste and nutrition. Discover our sustainable farming practices and authentic Indian rice products.',
  keywords: ['padmaaja rasooi', 'premium rice', 'quality rice', 'organic rice', 'basmati rice', 'rice products', 'agriculture', 'quality grains', 'healthy food', 'sustainable farming', 'indian rice'],
  openGraph: {
    title: 'Padmaaja Rasooi - Premium Rice Products & Quality Grains',
    description: 'Experience the finest quality rice with Padmaaja Rasooi. Premium rice varieties sourced from the best farms for exceptional taste and nutrition.',
    type: 'website',
    images: ['/hero-bg.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Padmaaja Rasooi - Premium Rice Products & Quality Grains',
    description: 'Experience the finest quality rice with Padmaaja Rasooi. Premium rice varieties sourced from the best farms.',
    images: ['/hero-bg.jpg'],
  },
  alternates: {
    canonical: '/',
  },
}

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        stock: {
          gt: 0
        }
      },
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50 // Increased from 8 to show more products
    })
    return products
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
        products: {
          some: {
            isActive: true,
            stock: {
              gt: 0
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })
    console.log('Fetched categories:', categories)
    return categories
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

export default async function Home() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <ClientPageWrapper>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <header>
          <MobileOptimizedLazyHeroSection />
        </header>

        {/* Our Products Section */}
        <ProductsSection products={products} categories={categories} />


        {/* About Section */}
        <MobileOptimizedLazyAboutSection />

        {/* Kashmina Brand Section */}
        <MobileOptimizedLazyKashminaSection />

        {/* Manufacturing Excellence Section */}
        <MobileOptimizedLazyManufacturingSection />

        {/* Statistics & Achievements Section */}
        {/* <MobileOptimizedLazyStatsSection /> */}

        {/* Certifications Section */}
        <MobileOptimizedLazyCertificationsSection />

        {/* News & Updates Section */}
        <MobileOptimizedLazyNewsSection />

        {/* Our Values Section */}
        <MobileOptimizedLazyOurValues />
      </main>
    </ClientPageWrapper>
  )
}
