import { LazyHeroSection, LazyProductGrid, LazyOurValues, LazyAboutSection } from '@/components/LazyComponents'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Wheat, 
  Shield, 
  Award, 
  ArrowRight,
  Star,
  Leaf
} from 'lucide-react'
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 px-3 py-1 text-sm font-medium">Our Products</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Premium Quality Products</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Discover our carefully curated selection of rice varieties, organic spices, and premium flour products, 
                all processed with the highest quality standards.
              </p>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-12 bg-slate-100 p-1 rounded-xl">
                <TabsTrigger value="all" className="rounded-lg py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">All Products</TabsTrigger>
                <TabsTrigger value="flour" className="rounded-lg py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">Flour</TabsTrigger>
                <TabsTrigger value="basmati" className="rounded-lg py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">Basmati Rice</TabsTrigger>
                <TabsTrigger value="nonbasmati" className="rounded-lg py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">Non-Basmati Rice</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-8">
                <LazyProductGrid products={products} />
              </TabsContent>
              
              <TabsContent value="flour" className="space-y-8">
                <LazyProductGrid products={products} categoryFilter="flour" />
              </TabsContent>
              
              <TabsContent value="basmati" className="space-y-8">
                <LazyProductGrid products={products} categoryFilter="basmati" />
              </TabsContent>
              
              <TabsContent value="nonbasmati" className="space-y-8">
                <LazyProductGrid products={products} categoryFilter="rice" />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Our Values Section */}
        <LazyOurValues />
      </div>
    </ClientPageWrapper>
  )
}
