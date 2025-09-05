'use client'

import { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import StructuredData from '@/components/StructuredData'
import { generateProductListJsonLd, generateBreadcrumbJsonLd } from '@/lib/structured-data'
import { Product, Category } from '@/types'
import PageHero from '@/components/PageHero'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [page, setPage] = useState(1)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
      })
      
      if (search) params.append('search', search)
      if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory)

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()
      setProducts(data.products)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }, [search, selectedCategory, page])

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [fetchProducts])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  // Generate structured data
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://padmaajarasooi.com'
  const productListData = generateProductListJsonLd(products, baseUrl)
  const breadcrumbData = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' }
  ], baseUrl)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data */}
      <StructuredData data={productListData} id="product-list-data" />
      <StructuredData data={breadcrumbData} id="breadcrumb-data" />
      
      {/* Hero Section */}
      <PageHero
        title="Products"
        subtitle="Our"
        description="Discover our premium collection of authentic food products, carefully crafted to bring traditional flavors to your kitchen."
        badge={{
          text: "Premium • Authentic • Quality"
        }}
        alignment="left"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}