'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Star, Eye } from 'lucide-react'
import Link from 'next/link'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { motion } from 'framer-motion'
import { cartManager } from '@/lib/cart'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const router = useRouter()
  
  const getDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('Add to cart clicked for:', product.name) // Debug log
    
    if (product.stock === 0) {
      toast.error('Product is out of stock')
      return
    }

    try {
      const success = cartManager.addToCart(product, 1)
      if (success) {
        console.log('Item added successfully') // Debug log
        toast.success(`${product.name} added to cart!`)
      } else {
        toast.error('Not enough stock available')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add to cart')
    }
  }

  const handleCardClick = () => {
    router.push(`/products/${product.slug}`)
  }

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/products/${product.slug}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className="h-full hover:shadow-lg transition-all duration-300 group overflow-hidden cursor-pointer hover:scale-[1.02]"
        onClick={handleCardClick}
      >
        <div className="relative overflow-hidden">
          <OptimizedImage
            src={product.images[0] || 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg'}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            priority={index < 4} // Prioritize first 4 products
            quality={50}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {product.discount > 0 && (
            <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg text-xs">
              {product.discount}% OFF
            </Badge>
          )}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-lg">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs ml-1 font-medium">4.5</span>
          </div>
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-xs sm:text-sm">Out of Stock</Badge>
            </div>
          )}
          <Badge className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white/90 text-slate-700 border border-slate-200 text-xs font-medium shadow-lg backdrop-blur-sm">
              {product.category.name}
          </Badge>
        </div>
        
        <CardHeader className="pb-2 p-3 sm:p-6 sm:pb-2">
          <div className="flex items-start justify-between gap-2 mb-2">
            <CardTitle className="text-base sm:text-lg font-semibold truncate group-hover:text-blue-600 transition-colors flex-1 leading-tight">
              {product.name}
            </CardTitle>
          </div>
          <CardDescription className="line-clamp-2 md:text-xs text-sm text-gray-600 leading-relaxed">
            {product.description || 'Premium quality product from Padmaaja Rasooi Pvt. Ltd.'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0 p-3 sm:p-6 sm:pt-0 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {product.discount > 0 ? (
                <>
                  <span className="text-base sm:text-lg font-bold text-green-600">
                    ₹{getDiscountedPrice(product.price, product.discount).toFixed(2)}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                    ₹{product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-base sm:text-lg font-bold text-gray-900">
                  ₹{product.price.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm text-gray-500">
              Stock: <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>{product.stock}</span>
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
              <span className="sm:hidden">{product.stock === 0 ? 'Out' : 'Add'}</span>
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleViewDetails}
              className="px-2 sm:px-3 h-8 sm:h-9"
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
    