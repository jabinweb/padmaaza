'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ShoppingCart, Star, Eye, X } from 'lucide-react'
import Link from 'next/link'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { motion } from 'framer-motion'
import { cartManager } from '@/lib/cart'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Product } from '@/types'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const router = useRouter()
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  
  const getDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100)
  }

  // Helper function to calculate per kg price
  const getPerKgPrice = (price: number, weight: string | null, discount: number = 0) => {
    if (!weight) return null
    
    // Extract numeric value from weight string (e.g., "1kg", "500g", "2.5 kg")
    const weightMatch = weight.toLowerCase().match(/(\d+(?:\.\d+)?)\s*(kg|g|gram|kilos?)/i)
    if (!weightMatch) return null
    
    const value = parseFloat(weightMatch[1])
    const unit = weightMatch[2].toLowerCase()
    
    // Convert to kg
    let weightInKg = value
    if (unit.startsWith('g')) {
      weightInKg = value / 1000
    }
    
    const finalPrice = discount > 0 ? getDiscountedPrice(price, discount) : price
    return Math.round(finalPrice / weightInKg)
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
    setIsQuickViewOpen(true)
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
          
          {/* Per kg price badge - Top Left */}
          {getPerKgPrice(product.price, product.weight, product.discount) && (
            <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-lg text-base">
              ₹{getPerKgPrice(product.price, product.weight, product.discount)}/kg
            </Badge>
          )}
          
          {/* Discount badge - Top Left, below per kg badge if both exist */}
          {product.discount > 0 && (
            <Badge className={`absolute ${getPerKgPrice(product.price, product.weight, product.discount) ? 'top-8 sm:top-10' : 'top-2 sm:top-3'} left-2 sm:left-3 bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg text-xs`}>
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
        
        <CardHeader className="pb-2 p-3 sm:pb-2">
          <div className="flex items-start justify-between gap-2 mb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CardTitle className="text-base sm:text-lg font-semibold truncate group-hover:text-blue-600 transition-colors flex-1 leading-tight cursor-help">
                    {product.name}
                  </CardTitle>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>{product.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
            {/* <span className="text-xs sm:text-sm text-gray-500">
              Stock: <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>{product.stock}</span>
            </span> */}
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

      {/* Quick View Dialog */}
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <OptimizedImage
                  src={product.images[0] || 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg'}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-contain"
                  quality={80}
                />
                {product.discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white font-semibold">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>
              
              {/* Additional Images if available */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1, 5).map((image, idx) => (
                    <div key={idx} className="aspect-square rounded border overflow-hidden">
                      <OptimizedImage
                        src={image}
                        alt={`${product.name} ${idx + 2}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-contain"
                        quality={60}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || 'Premium quality product from Padmaaja Rasooi Pvt. Ltd.'}
                </p>
              </div>

              {/* Category and Brand */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Category</span>
                  <p className="font-semibold">{product.category?.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Brand</span>
                  <p className="font-semibold">{product.brand || 'Padmaaja Rasooi'}</p>
                </div>
                {product.weight && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Weight</span>
                    <p className="font-semibold">{product.weight}</p>
                  </div>
                )}
                {product.origin && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Origin</span>
                    <p className="font-semibold">{product.origin}</p>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="border-t pt-4">
                <div className="flex items-center space-x-3 mb-4">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-green-600">
                        ₹{getDiscountedPrice(product.price, product.discount).toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                
                {/* Per kg price in quick view */}
                {getPerKgPrice(product.price, product.weight, product.discount) && (
                  <div className="mb-4 text-sm text-gray-600">
                    <span className="font-medium">Per kg: </span>
                    ₹{getPerKgPrice(product.price, product.weight, product.discount)}/kg
                  </div>
                )}
                
                {/* Stock Status */}
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-500">Availability: </span>
                  <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="w-full"
                    size="lg"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsQuickViewOpen(false)
                      router.push(`/products/${product.slug}`)
                    }}
                    className="w-full"
                    size="lg"
                  >
                    View Full Details
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 pt-4 border-t">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.5 (123 reviews)</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
    