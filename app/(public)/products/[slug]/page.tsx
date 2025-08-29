'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart, Star, Truck, Shield, RefreshCw, ArrowLeft, Leaf, Clock, Award, MapPin, Thermometer, Package, Utensils, Heart, ChevronRight, Plus, Minus, Share2, Bookmark, Eye, TrendingUp, CheckCircle, Info, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { cartManager } from '@/lib/cart'
import Link from 'next/link'
import OptimizedImage from '@/components/ui/OptimizedImage'

interface Product {
  id: string
  name: string
  description: string
  price: number
  discount: number
  images: string[]
  stock: number
  sku: string
  slug: string
  brand?: string
  origin?: string
  weight?: string
  category: {
    id: string
    name: string
  }
}

const getDiscountedPrice = (price: number, discount: number) => {
  return price - (price * discount / 100)
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (params.slug) {
      // Decode the slug in case it's URL encoded
      const decodedSlug = decodeURIComponent(params.slug as string)
      fetchProduct(decodedSlug)
    }
  }, [params.slug])

  const fetchProduct = async (slug: string) => {
    try {
      setLoading(true)
    
        const response = await fetch(`/api/products/${slug}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || 'Product not found')
      }
      
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  // Food information helper function
  const getFoodInfo = (category: string, productName: string) => {
    const categoryLower = category.toLowerCase()
    const productLower = productName.toLowerCase()
    
    if (categoryLower.includes('rice') || productLower.includes('rice')) {
      return {
        nutritionalInfo: [
          { label: 'Calories', value: '130 per 100g', icon: '🔥' },
          { label: 'Carbohydrates', value: '28g per 100g', icon: '🌾' },
          { label: 'Protein', value: '2.7g per 100g', icon: '💪' },
          { label: 'Fat', value: '0.3g per 100g', icon: '🫒' },
          { label: 'Fiber', value: '0.4g per 100g', icon: '🌿' },
          { label: 'Glycemic Index', value: 'Medium (56-69)', icon: '📊' }
        ],
        benefits: [
          'Rich in essential carbohydrates for energy',
          'Naturally gluten-free grain',
          'Contains important minerals like manganese',
          'Low in fat and sodium',
          'Easy to digest and suitable for all ages'
        ],
        cookingInstructions: [
          'Rinse rice thoroughly until water runs clear',
          'Use 1:1.5 rice to water ratio for perfect texture',
          'Bring to boil, then reduce heat and simmer for 18-20 minutes',
          'Let it rest for 5 minutes before opening the lid',
          'Fluff gently with a fork for best results'
        ],
        storage: 'Store in airtight container in cool, dry place away from direct sunlight. Best consumed within 12-18 months of packaging.',
        origin: 'Sourced from premium rice fields in Punjab and Haryana, known for their fertile soil and ideal climate conditions.',
        certification: ['FSSAI Approved', 'Organic Certified', 'Pesticide Free', 'Premium Grade A']
      }
    } else if (categoryLower.includes('flour') || productLower.includes('flour') || productLower.includes('atta')) {
      return {
        nutritionalInfo: [
          { label: 'Calories', value: '340 per 100g', icon: '🔥' },
          { label: 'Carbohydrates', value: '72g per 100g', icon: '🌾' },
          { label: 'Protein', value: '12g per 100g', icon: '💪' },
          { label: 'Fat', value: '1.7g per 100g', icon: '🫒' },
          { label: 'Fiber', value: '11g per 100g', icon: '🌿' },
          { label: 'Iron', value: '4.6mg per 100g', icon: '⚡' }
        ],
        benefits: [
          'High fiber content supports digestive health',
          'Rich in protein for muscle development',
          'Contains essential B vitamins',
          'Good source of minerals like iron and magnesium',
          'Helps maintain stable blood sugar levels'
        ],
        cookingInstructions: [
          'Knead with warm water for soft, pliable dough',
          'Add a pinch of salt and oil for better texture',
          'Rest the dough for 15-20 minutes before rolling',
          'Roll evenly for uniform cooking',
          'Cook on medium heat for golden, soft rotis'
        ],
        storage: 'Store in cool, dry place in airtight containers. Use within 6-8 months for best quality and freshness.',
        origin: 'Milled from premium wheat grains sourced from the fertile plains of Punjab, Haryana, and Uttar Pradesh.',
        certification: ['FSSAI Approved', 'Whole Grain', 'Stone Ground', 'Chemical Free']
      }
    } else if (categoryLower.includes('spice') || categoryLower.includes('masala') || productLower.includes('spice')) {
      return {
        nutritionalInfo: [
          { label: 'Antioxidants', value: 'High', icon: '🛡️' },
          { label: 'Vitamins', value: 'A, C, K', icon: '💊' },
          { label: 'Minerals', value: 'Iron, Calcium', icon: '⚡' },
          { label: 'Calories', value: '10-15 per tsp', icon: '🔥' },
          { label: 'Sodium', value: 'Low', icon: '🧂' }
        ],
        benefits: [
          'Rich in antioxidants and anti-inflammatory compounds',
          'Supports digestive health and metabolism',
          'Natural antimicrobial and antibacterial properties',
          'Enhances flavor without adding calories',
          'May help regulate blood sugar and cholesterol levels'
        ],
        cookingInstructions: [
          'Dry roast whole spices for enhanced aroma and flavor',
          'Add spices at the right time during cooking',
          'Store ground spices in airtight containers',
          'Use within 6-12 months for best potency',
          'Combine with oil or ghee for better absorption'
        ],
        storage: 'Store in cool, dry place away from light and heat. Keep in airtight containers to preserve aroma and potency.',
        origin: 'Sourced from spice gardens of Kerala, Karnataka, Tamil Nadu, and Kashmir - regions known for their aromatic spices.',
        certification: ['FSSAI Approved', 'Pure & Natural', 'Chemical Free', 'Hand Picked']
      }
    } else {
      return {
        nutritionalInfo: [
          { label: 'Quality', value: 'Premium Grade', icon: '⭐' },
          { label: 'Freshness', value: 'Farm Fresh', icon: '🌱' },
          { label: 'Processing', value: 'Minimal', icon: '🏭' },
          { label: 'Shelf Life', value: '12 months', icon: '📅' }
        ],
        benefits: [
          'High nutritional value with natural goodness',
          'Carefully processed to retain nutrients',
          'Free from artificial preservatives',
          'Supports healthy lifestyle and balanced diet',
          'Trusted quality from Padmaaja Rasool'
        ],
        cookingInstructions: [
          'Follow traditional cooking methods for best results',
          'Use fresh ingredients for enhanced taste',
          'Store properly after opening to maintain quality',
          'Cook as per package instructions',
          'Enjoy fresh preparations for optimal nutrition'
        ],
        storage: 'Store in cool, dry place away from direct sunlight and moisture. Keep in original packaging or airtight containers.',
        origin: 'Sourced from trusted farmers and suppliers across India, ensuring authenticity and quality.',
        certification: ['FSSAI Approved', 'Quality Assured', 'Safe for Consumption', 'Hygienically Processed']
      }
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    
    setAddingToCart(true)
    
    if (product.stock === 0) {
      toast.error('Product is out of stock')
      setAddingToCart(false)
      return
    }

    if (quantity > product.stock) {
      toast.error('Not enough stock available')
      setAddingToCart(false)
      return
    }

    try {
      const success = cartManager.addToCart(product, quantity)
      if (success) {
        toast.success(`${product.name} added to cart!`)
      } else {
        toast.error('Failed to add to cart')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add to cart')
    } finally {
      setAddingToCart(false)
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    const title = `${product?.name} - Padmaaja Rasool`
    const text = `Check out this premium ${product?.name} from Padmaaja Rasool!`

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        })
        toast.success('Shared successfully!')
      } catch (error) {
        console.error('Error sharing:', error)
        // Fallback to copy URL
        handleCopyUrl()
      }
    } else {
      // Fallback to copy URL
      handleCopyUrl()
    }
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('URL copied to clipboard!')
    } catch (error) {
      console.error('Error copying URL:', error)
      toast.error('Failed to copy URL')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="space-y-6">
              <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="flex space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-200 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 text-lg mb-8">The product you're looking for doesn't exist or has been moved.</p>
          </div>
          <div className="space-x-4">
            <Button onClick={() => router.back()} variant="outline" size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Link href="/products">
              <Button size="lg">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Navigation Bar */}
      <nav className="mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-emerald-600 transition-colors font-medium">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              <Link href="/products" className="text-gray-500 hover:text-emerald-600 transition-colors font-medium">
                Products
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-gray-900 font-semibold">{product.category.name}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          
          {/* Product Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 group">
              <OptimizedImage
                src={product.images[selectedImage] || product.images[0] || '/logo.png'}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                priority
                quality={95}
              />
              
              {/* Floating Badges */}
              <div className="absolute top-6 left-6 flex flex-col space-y-2">
                {product.discount > 0 && (
                  <Badge className="bg-red-500 text-white px-3 py-1.5 text-sm font-semibold shadow-lg">
                    -{product.discount}% OFF
                  </Badge>
                )}
                {product.stock < 10 && product.stock > 0 && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 px-3 py-1.5 text-sm font-medium shadow-lg">
                    Only {product.stock} left
                  </Badge>
                )}
              </div>

              {/* Image Counter */}
              {product.images.length > 1 && (
                <div className="absolute bottom-6 right-6 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {selectedImage + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index 
                        ? 'border-emerald-500 ring-2 ring-emerald-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <OptimizedImage
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      quality={80}
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Information */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Header Section */}
            <div className="space-y-4">
              {/* Category & Stock Status */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50 px-3 py-1">
                  {product.category.name}
                </Badge>
                <div className="flex items-center space-x-2">
                  {product.stock > 0 ? (
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">In Stock</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-red-600">
                      <Info className="h-4 w-4" />
                      <span className="text-sm font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">4.8 (2,547 reviews)</span>
                <button className="text-emerald-600 text-sm font-medium hover:underline">
                  Write a review
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description || `Premium quality ${product.name} sourced directly from trusted suppliers. Experience the authentic taste and exceptional quality that Padmaaja is known for.`}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-3">
                    {product.discount > 0 ? (
                      <>
                        <span className="text-3xl font-bold text-emerald-600">
                          ₹{getDiscountedPrice(product.price, product.discount).toFixed(2)}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          ₹{product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-emerald-600">
                        ₹{product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.discount > 0 && (
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Save ₹{(product.price * product.discount / 100).toFixed(2)}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        ({product.discount}% off)
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Stock Indicator */}
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>{product.stock} available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Section */}
            {product.stock > 0 ? (
              <div className="space-y-6">
                {/* Quantity Selector */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-gray-50 transition-colors border-r border-gray-300"
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <div className="px-6 py-3 bg-white min-w-[80px] text-center font-semibold text-gray-900">
                        {quantity}
                      </div>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="p-3 hover:bg-gray-50 transition-colors border-l border-gray-300"
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.stock} available
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {addingToCart ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Adding to Cart...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <ShoppingCart className="h-5 w-5" />
                        <span>Add to Cart - ₹{(getDiscountedPrice(product.price, product.discount) * quantity).toFixed(2)}</span>
                      </div>
                    )}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-12 border-gray-300 hover:bg-gray-50" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" className="h-12 border-gray-300 hover:bg-gray-50">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Out of Stock</h3>
                <p className="text-gray-600 mb-4">This product is currently unavailable</p>
                <Button variant="outline" className="h-12">
                  <Eye className="h-4 w-4 mr-2" />
                  Notify When Available
                </Button>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Truck className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-600">Orders above ₹500</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <Shield className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Quality Assured</p>
                <p className="text-xs text-gray-600">Premium products</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <Zap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Fresh & Pure</p>
                <p className="text-xs text-gray-600">No additives</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modern Product Information Tabs */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: Info },
                { id: 'nutrition', label: 'Nutrition', icon: Utensils },
                { id: 'benefits', label: 'Benefits', icon: Heart },
                { id: 'instructions', label: 'Instructions', icon: Clock },
                { id: 'specifications', label: 'Specifications', icon: Package }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {(() => {
                const foodInfo = getFoodInfo(product.category.name, product.name)
                
                switch (activeTab) {
                  case 'overview':
                    return (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900">Product Description</h3>
                            <p className="text-gray-700 leading-relaxed text-lg">
                              {product.description || `Experience the finest quality ${product.name} from Padmaaja. Our products are carefully sourced and processed to maintain their natural goodness and authentic flavor. Perfect for your daily cooking needs with guaranteed freshness and purity.`}
                            </p>
                            
                            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <Award className="h-5 w-5 text-emerald-600 mr-2" />
                                Quality Promise
                              </h4>
                              <ul className="space-y-2 text-gray-700">
                                <li className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span>100% authentic and pure</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span>No artificial preservatives</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span>Hygienically processed</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span>Quality tested</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900">Product Details</h3>
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500 mb-1">SKU</p>
                                  <p className="font-semibold text-gray-900">{product.sku}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500 mb-1">Category</p>
                                  <p className="font-semibold text-gray-900">{product.category.name}</p>
                                </div>
                                {product.brand && (
                                  <div>
                                    <p className="text-sm text-gray-500 mb-1">Brand</p>
                                    <p className="font-semibold text-gray-900">{product.brand}</p>
                                  </div>
                                )}
                                {product.weight && (
                                  <div>
                                    <p className="text-sm text-gray-500 mb-1">Weight</p>
                                    <p className="font-semibold text-gray-900">{product.weight}</p>
                                  </div>
                                )}
                                {product.origin && (
                                  <div className="col-span-2">
                                    <p className="text-sm text-gray-500 mb-1">Origin</p>
                                    <p className="font-semibold text-gray-900">{product.origin}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="bg-blue-50 rounded-2xl p-6">
                              <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                                <Truck className="h-5 w-5 text-blue-600 mr-2" />
                                Shipping Information
                              </h4>
                              <ul className="space-y-2 text-blue-800 text-sm">
                                <li>• Free delivery on orders above ₹500</li>
                                <li>• Standard delivery: 2-4 business days</li>
                                <li>• Express delivery available</li>
                                <li>• Secure packaging guaranteed</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )

                  case 'nutrition':
                    return (
                      <motion.div
                        key="nutrition"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        <div className="text-center mb-8">
                          <h3 className="text-3xl font-bold text-gray-900 mb-4">Nutritional Information</h3>
                          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Discover the nutritional value and health benefits of our premium {product.name.toLowerCase()}.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {foodInfo.nutritionalInfo.map((info, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                            >
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl">
                                  {info.icon}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{info.label}</h4>
                                  <p className="text-emerald-600 font-bold text-lg">{info.value}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )

                  case 'benefits':
                    return (
                      <motion.div
                        key="benefits"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        <div className="text-center mb-8">
                          <h3 className="text-3xl font-bold text-gray-900 mb-4">Health Benefits</h3>
                          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Discover why {product.name.toLowerCase()} is an excellent choice for your health and wellness.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {foodInfo.benefits.map((benefit, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start space-x-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-white" />
                              </div>
                              <p className="text-gray-800 leading-relaxed">{benefit}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )

                  case 'instructions':
                    return (
                      <motion.div
                        key="instructions"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Cooking Instructions */}
                          <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                              <Clock className="h-6 w-6 text-blue-600 mr-3" />
                              Cooking Instructions
                            </h3>
                            <div className="space-y-4">
                              {foodInfo.cookingInstructions.map((instruction, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl border border-blue-200"
                                >
                                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                  </div>
                                  <p className="text-gray-800 leading-relaxed">{instruction}</p>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Storage Instructions */}
                          <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                              <Package className="h-6 w-6 text-purple-600 mr-3" />
                              Storage Guidelines
                            </h3>
                            <div className="p-6 bg-purple-50 rounded-2xl border border-purple-200">
                              <p className="text-gray-800 leading-relaxed mb-6">{foodInfo.storage}</p>
                              
                              <div className="space-y-3">
                                <h4 className="font-semibold text-purple-900 flex items-center">
                                  <Thermometer className="h-5 w-5 mr-2" />
                                  Storage Tips
                                </h4>
                                <ul className="space-y-2 text-purple-800">
                                  <li className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                    <span>Keep away from direct sunlight</span>
                                  </li>
                                  <li className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                    <span>Store in cool, dry place</span>
                                  </li>
                                  <li className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                    <span>Use airtight containers</span>
                                  </li>
                                  <li className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                                    <span>Check expiry dates regularly</span>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            {/* Origin & Certification */}
                            <div className="p-6 bg-orange-50 rounded-2xl border border-orange-200">
                              <h4 className="font-semibold text-orange-900 mb-3 flex items-center">
                                <MapPin className="h-5 w-5 text-orange-600 mr-2" />
                                Origin & Quality
                              </h4>
                              <p className="text-orange-800 mb-4">{foodInfo.origin}</p>
                              
                              <div className="flex flex-wrap gap-2">
                                {foodInfo.certification.map((cert, index) => (
                                  <Badge key={index} variant="outline" className="border-orange-300 text-orange-700 bg-orange-100">
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )

                  case 'specifications':
                    return (
                      <motion.div
                        key="specifications"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        <div className="text-center mb-8">
                          <h3 className="text-3xl font-bold text-gray-900 mb-4">Product Specifications</h3>
                          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Detailed specifications and technical information about {product.name.toLowerCase()}.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
                            <Package className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                            <p className="text-sm text-gray-500 mb-1">SKU</p>
                            <p className="font-bold text-gray-900 font-mono">{product.sku}</p>
                          </div>
                          
                          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
                            <Award className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                            <p className="text-sm text-gray-500 mb-1">Category</p>
                            <p className="font-bold text-gray-900">{product.category.name}</p>
                          </div>
                          
                          {product.weight && (
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
                              <TrendingUp className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                              <p className="text-sm text-gray-500 mb-1">Weight</p>
                              <p className="font-bold text-gray-900">{product.weight}</p>
                            </div>
                          )}
                          
                          {product.brand && (
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
                              <Star className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                              <p className="text-sm text-gray-500 mb-1">Brand</p>
                              <p className="font-bold text-gray-900">{product.brand}</p>
                            </div>
                          )}
                          
                          {product.origin && (
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
                              <MapPin className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                              <p className="text-sm text-gray-500 mb-1">Origin</p>
                              <p className="font-bold text-gray-900">{product.origin}</p>
                            </div>
                          )}
                          
                          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
                            <Shield className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                            <p className="text-sm text-gray-500 mb-1">Quality</p>
                            <p className="font-bold text-gray-900">Premium Grade</p>
                          </div>
                        </div>
                      </motion.div>
                    )

                  default:
                    return null
                }
              })()}
            </AnimatePresence>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
