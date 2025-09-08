'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Package, Truck, Clock, ArrowRight, Star, Gift, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import ConfettiBoom from 'react-confetti-boom'

interface OrderConfirmation {
  orderId: string
  total: number
  status: string
  estimatedDelivery: string
  createdAt: string
  items: {
    id: string
    name: string
    quantity: number
    price: number
    image: string
    discount: number
  }[]
  customer: {
    name: string
    email: string
  }
  shippingAddress?: {
    name: string
    address: string
    address2?: string
    city: string
    state: string
    zipCode: string
    phone?: string
  }
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [orderData, setOrderData] = useState<OrderConfirmation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const fetchOrderData = useCallback(async (orderId: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/order-confirmation/${orderId}`)
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/auth/signin?callbackUrl=/order-confirmation?orderId=' + orderId)
          return
        }
        throw new Error('Order not found')
      }
      
      const data = await response.json()
      setOrderData(data)
    } catch (error) {
      console.error('Error fetching order:', error)
      setError('Failed to load order details')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    const orderId = searchParams.get('orderId')
    if (!orderId) {
      router.push('/products')
      return
    }
    
    fetchOrderData(orderId)
  }, [searchParams, router, fetchOrderData])

  useEffect(() => {
    if (orderData) {
      // Trigger confetti after data loads
      setShowConfetti(true)
      
      // Show success toast
      toast.success('🎉 Order placed successfully!')
      
      // Stop confetti after 4 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [orderData])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-500'
      case 'PAID': return 'bg-emerald-500'
      case 'SHIPPED': return 'bg-emerald-600'
      case 'DELIVERED': return 'bg-green-500'
      case 'CANCELLED': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Skeleton */}
          <div className="text-center mb-10">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-lg mb-3 max-w-md mx-auto animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg mb-6 max-w-lg mx-auto animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-xl max-w-xs mx-auto animate-pulse"></div>
          </div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Content Skeleton - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary Card Skeleton */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-16 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  {/* Order header info skeleton */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-20 mx-auto"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Items list skeleton */}
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                          <div className="flex space-x-4">
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                          </div>
                        </div>
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shipping Address Card Skeleton */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-16 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              {/* Status Card Skeleton */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-16 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Progress Card Skeleton */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-16 bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="space-y-3">
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Order not found'}
          </h1>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Confetti Animation with highest z-index */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          <ConfettiBoom
            particleCount={150}
            effectCount={3}
            colors={['#10B981', '#059669', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5']}
            shapeSize={12}
            spreadDeg={60}
            effectInterval={300}
          />
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Professional Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-emerald-100">
                <CheckCircle className="h-10 w-10 text-emerald-500" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Order Confirmed!
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg mx-auto mb-6">
              Thank you <span className="font-semibold text-emerald-600">{orderData.customer.name}</span>! 
              Your order has been confirmed and is being prepared.
            </p>
            
            <div className="inline-flex items-center bg-emerald-50 text-emerald-700 px-6 py-3 rounded-xl border border-emerald-200 shadow-sm">
              <Package className="h-5 w-5 mr-2" />
              <span className="font-semibold">Order #{orderData.orderId.slice(-8).toUpperCase()}</span>
          </div>

            {/* Floating Celebration Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-20 left-1/4 transform -translate-x-1/2"
              >
                <Star className="h-8 w-8 text-yellow-400 fill-current opacity-70" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-32 right-1/4 transform translate-x-1/2"
              >
                <Gift className="h-8 w-8 text-emerald-500 opacity-70" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -25, 0],
                  rotate: [0, 15, -15, 0],
                  scale: [1, 0.9, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-16 left-2/3"
              >
                <Heart className="h-6 w-6 text-red-500 fill-current opacity-70" />
              </motion.div>
            </div>
          </motion.div>

          {/* Professional Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Order Information - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Order Summary Card */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                  <CardTitle className="flex items-center text-lg font-semibold">
                    <Package className="h-5 w-5 mr-3" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Order Header Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center md:text-left">
                      <div className="text-sm text-gray-500 mb-1">Order ID</div>
                      <div className="font-semibold text-gray-900">#{orderData.orderId.slice(-8).toUpperCase()}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500 mb-1">Status</div>
                      <Badge className={`${getStatusColor(orderData.status)} text-white px-3 py-1 text-xs font-medium`}>
                        {orderData.status}
                      </Badge>
                    </div>
                    <div className="text-center md:text-right">
                      <div className="text-sm text-gray-500 mb-1">Total Amount</div>
                      <div className="text-xl font-bold text-emerald-600">₹{orderData.total.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  {/* Items List */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Items Ordered</h3>
                    {orderData.items.map((item, index) => {
                      const discountedPrice = item.discount > 0 
                        ? item.price - (item.price * item.discount / 100)
                        : item.price
                      
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                          className="flex items-center space-x-4 p-4 bg-white border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="relative flex-shrink-0">
                            <Image
                              src={item.image || 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg'}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="rounded-lg object-cover"
                            />
                            {item.discount > 0 && (
                              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                {item.discount}% OFF
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-emerald-600">₹{discountedPrice.toFixed(2)}</span>
                                {item.discount > 0 && (
                                  <span className="text-sm text-gray-400 line-through">₹{item.price.toFixed(2)}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">₹{(discountedPrice * item.quantity).toFixed(2)}</div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address Card */}
              {orderData.shippingAddress && (
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                    <CardTitle className="flex items-center text-lg font-semibold">
                      <Truck className="h-5 w-5 mr-3" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-2 text-gray-700">
                      <p className="font-semibold text-gray-900">{orderData.shippingAddress.name}</p>
                      <p>{orderData.shippingAddress.address}</p>
                      {orderData.shippingAddress.address2 && (
                        <p>{orderData.shippingAddress.address2}</p>
                      )}
                      <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}</p>
                      {orderData.shippingAddress.phone && (
                        <p className="flex items-center mt-3">
                          <span className="text-gray-500 mr-2">Phone:</span>
                          {orderData.shippingAddress.phone}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>

            {/* Sidebar - Order Status & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Customer & Status Card */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                  <CardTitle className="flex items-center text-lg font-semibold">
                    <Clock className="h-5 w-5 mr-3" />
                    Order Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Customer</div>
                      <div className="font-medium text-gray-900">{orderData.customer.name}</div>
                      <div className="text-sm text-gray-600">{orderData.customer.email}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Expected Delivery</div>
                      <div className="font-medium text-gray-900">
                        {new Date(orderData.estimatedDelivery).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Card */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                  <CardTitle className="flex items-center text-lg font-semibold">
                    <ArrowRight className="h-5 w-5 mr-3" />
                    Order Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Order Processing</div>
                        <div className="text-sm text-gray-600">We're preparing your items</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <div className="font-medium text-gray-500">Shipped</div>
                        <div className="text-sm text-gray-500">You'll receive tracking information</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <div className="font-medium text-gray-500">Delivered</div>
                        <div className="text-sm text-gray-500">Your order arrives!</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-2">
                <Link href="/orders">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors">
                    View All Orders
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 py-3 rounded-lg font-medium transition-colors">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
