'use client'

import ProductCard from '@/components/ProductCard'
import { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  categoryFilter?: string
}

export default function ProductGrid({ products, categoryFilter }: ProductGridProps) {
  const filteredProducts = categoryFilter 
    ? products.filter(product => 
        product.category.name.toLowerCase().includes(categoryFilter.toLowerCase()) ||
        product.name.toLowerCase().includes(categoryFilter.toLowerCase())
      )
    : products

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <p className="text-gray-500 text-base sm:text-lg">No products found in this category.</p>
        <p className="text-gray-400 text-sm mt-2">Check back soon for new products!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 gap-8">
      {filteredProducts.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          index={index} 

        />
      ))}
    </div>
  )
}
