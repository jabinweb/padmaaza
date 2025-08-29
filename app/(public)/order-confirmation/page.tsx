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
      case 'PENDING': return 'bg-yellow-500'
      case 'PAID': return 'bg-blue-500'
      case 'SHIPPED': return 'bg-purple-500'
      case 'DELIVERED': return 'bg-green-500'
      case 'CANCELLED': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
            colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316']}
            shapeSize={12}
            spreadDeg={60}
            effectInterval={300}
          />
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Enhanced Header with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <CheckCircle className="h-8 w-8 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4"
            >
              Order Confirmed! 
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Thank you <span className="font-semibold text-gray-800">{orderData.customer.name}</span> for your purchase! 
              Your order has been confirmed and our team is preparing it with care.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-6 inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200"
            >
              <Package className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-700">Order #{orderData.orderId.slice(-8)}</span>
            </motion.div>

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
                <Gift className="h-8 w-8 text-purple-500 opacity-70" />
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enhanced Order Details */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center text-xl">
                    <Package className="h-6 w-6 mr-3" />
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  {/* Order Info Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <span className="text-gray-600 font-medium">Order ID</span>
                        <span className="font-bold text-gray-900">#{orderData.orderId.slice(-8)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                        <span className="text-blue-700 font-medium">Status</span>
                        <Badge className={`${getStatusColor(orderData.status)} text-white px-4 py-2 font-semibold`}>
                          {orderData.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                        <span className="text-green-700 font-medium">Total</span>
                        <span className="font-bold text-2xl text-green-600">
                          ₹{orderData.total.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                        <span className="text-purple-700 font-medium">Delivery</span>
                        <span className="font-bold text-purple-900">
                          {new Date(orderData.estimatedDelivery).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Enhanced Items List */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Ordered</h3>
                    {orderData.items.map((item, index) => {
                      const discountedPrice = item.discount > 0 
                        ? item.price - (item.price * item.discount / 100)
                        : item.price
                      
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                          className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300"
                        >
                          <div className="relative">
                            <Image
                              src={item.image || 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg'}
                              alt={item.name}
                              width={70}
                              height={70}
                              className="rounded-lg object-cover shadow-md"
                            />
                            {item.discount > 0 && (
                              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                {item.discount}% OFF
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded">
                                Qty: {item.quantity}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-green-600">
                                  ₹{discountedPrice.toFixed(2)}
                                </span>
                                {item.discount > 0 && (
                                  <span className="text-sm text-gray-500 line-through">
                                    ₹{item.price.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-lg text-gray-900">
                              ₹{(discountedPrice * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Status & Next Steps */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Order Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Customer: {orderData.customer.name}</p>
                    <p className="text-gray-500">Email: {orderData.customer.email}</p>
                    <div className="mt-3">
                      <Badge className={`${getStatusColor(orderData.status)} text-white`}>
                        Current Status: {orderData.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    What&apos;s Next?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        ['PAID', 'SHIPPED', 'DELIVERED'].includes(orderData.status) 
                          ? 'bg-green-100' 
                          : 'bg-blue-100'
                      }`}>
                        <span className={`text-xs font-bold ${
                          ['PAID', 'SHIPPED', 'DELIVERED'].includes(orderData.status)
                            ? 'text-green-600'
                            : 'text-blue-600'
                        }`}>
                          1
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Order Processing</p>
                        <p className="text-xs text-gray-500">
                          {orderData.status === 'PENDING' 
                            ? "We're preparing your items" 
                            : "✓ Complete"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        ['SHIPPED', 'DELIVERED'].includes(orderData.status)
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      }`}>
                        <span className={`text-xs font-bold ${
                          ['SHIPPED', 'DELIVERED'].includes(orderData.status)
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}>
                          2
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Shipped</p>
                        <p className="text-xs text-gray-500">
                          {orderData.status === 'SHIPPED' 
                            ? "Your order is on the way" 
                            : orderData.status === 'DELIVERED' 
                            ? "✓ Complete"
                            : "You'll receive tracking information"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        orderData.status === 'DELIVERED'
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      }`}>
                        <span className={`text-xs font-bold ${
                          orderData.status === 'DELIVERED'
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}>
                          3
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Delivered</p>
                        <p className="text-xs text-gray-500">
                          {orderData.status === 'DELIVERED' 
                            ? "✓ Your order has arrived!" 
                            : "Your order arrives!"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg" asChild>
                    <Link href="/orders">
                      View All Orders
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="outline" className="w-full border-2 border-gray-300 hover:border-gray-400 font-semibold py-3 rounded-xl" asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
