import { LazyHeroSection, LazyProductGrid, LazyOurValues, LazyAboutSection, LazyCertificationsSection } from '@/components/LazyComponents'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { prisma } from '@/lib/prisma'
import ClientPageWrapper from '@/components/ClientPageWrapper'

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
      take: 8
    })
    return products
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

export default async function Home() {
  const products = await getProducts()

  return (
    <ClientPageWrapper>
      <div className="min-h-screen bg-white pt-16">
        {/* Hero Section */}
        <LazyHeroSection />

        {/* About Section */}
        <LazyAboutSection />

        {/* Our Products Section */}
        <section className="py-8 py-10 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 px-3 py-1 text-sm font-medium">Our Products</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 px-4">Premium Quality Products</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
                Discover our carefully curated selection of rice varieties, organic spices, and premium flour products, 
                all processed with the highest quality standards.
              </p>
            </div>
              <LazyProductGrid products={products} />
          </div>
        </section>

        {/* Certifications Section */}
        <LazyCertificationsSection />

        {/* Our Values Section */}
        <LazyOurValues />
      </div>
    </ClientPageWrapper>
  )
}
