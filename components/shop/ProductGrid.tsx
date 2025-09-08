'use client'

import { useState } from 'react'
import ProductCard from '@/components/shop/ProductCard'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'

interface ProductGridProps {
  products: Product[]
  categoryFilter?: string
  initialLoadCount?: number
  loadMoreCount?: number
}

export default function ProductGrid({ 
  products, 
  categoryFilter,
  initialLoadCount = 8,
  loadMoreCount = 4
}: ProductGridProps) {
  const [displayCount, setDisplayCount] = useState(initialLoadCount)

  const filteredProducts = categoryFilter 
    ? products.filter(product => 
        product.category.name.toLowerCase().includes(categoryFilter.toLowerCase()) ||
        product.name.toLowerCase().includes(categoryFilter.toLowerCase())
      )
    : products

  const displayedProducts = filteredProducts.slice(0, displayCount)
  const hasMoreProducts = displayCount < filteredProducts.length
  const remainingProducts = filteredProducts.length - displayCount

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + loadMoreCount, filteredProducts.length))
  }

  const showLess = () => {
    setDisplayCount(initialLoadCount)
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <p className="text-gray-500 text-base sm:text-lg">No products found in this category.</p>
        <p className="text-gray-400 text-sm mt-2">Check back soon for new products!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 gap-8">
        {displayedProducts.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            index={index} 
          />
        ))}
      </div>

      {/* Load More / Show Less Controls */}
      {filteredProducts.length > initialLoadCount && (
        <div className="flex flex-col items-center gap-4 pt-4">
          {/* Products Counter */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{displayedProducts.length}</span> of{' '}
              <span className="font-semibold">{filteredProducts.length}</span> products
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {hasMoreProducts && (
              <Button 
                onClick={loadMore} 
                variant="outline" 
                className="px-6 py-2 rounded-lg border-gray-300 hover:border-gray-400 transition-colors"
              >
                Load {Math.min(loadMoreCount, remainingProducts)} More
                {remainingProducts > loadMoreCount && ` (${remainingProducts} remaining)`}
              </Button>
            )}
            
            {displayCount > initialLoadCount && (
              <Button 
                onClick={showLess} 
                variant="ghost" 
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Show Less
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
