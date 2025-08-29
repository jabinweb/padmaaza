'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp, 
  ArrowRight,
  Gift,
  Wallet,
  ShoppingCart
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { toast } from 'sonner'

interface DashboardStats {
  totalEarnings: number
  pendingCommissions: number
  totalReferrals: number
  activeReferrals: number
  currentBalance: number
  totalOrders: number
  thisMonthEarnings: number
  recentCommissions: {
    id: string
    amount: number
    level: number
    type: string
    status: string
    createdAt: string
    fromUser: {
      name: string
      email: string
    }
  }[]
  recentOrders: {
    id: string
    total: number
    status: string
    createdAt: string
    orderItems: {
      quantity: number
      product: {
        name: string
      }
    }[]
  }[]
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchDashboardStats = useCallback(async () => {
    try {
      const response = await fetch('/api/dashboard')
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/auth/signin?callbackUrl=/dashboard')
          return
        }
        throw new Error('Failed to fetch dashboard stats')
      }
      
      const data = await response.json()
      setStats(data.stats)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard')
      return
    }

    if (status === 'authenticated') {
      fetchDashboardStats()
    }
  }, [status, router, fetchDashboardStats])

  // Show loading spinner while checking authentication
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  // Redirect handled in useEffect, show nothing while redirecting
  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Welcome back, {session?.user?.name}!
            </h1>
            <p className="text-gray-600 mt-2">Here&apos;s your dashboard overview</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button asChild>
              <Link href="/products">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Shop Now
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Total Earnings</p>
                      <p className="text-2xl font-bold">₹{stats.totalEarnings.toFixed(2)}</p>
                      <p className="text-green-100 text-xs mt-1">
                        ₹{stats.thisMonthEarnings.toFixed(2)} this month
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Current Balance</p>
                      <p className="text-2xl font-bold">₹{stats.currentBalance.toFixed(2)}</p>
                      <p className="text-blue-100 text-xs mt-1">
                        ₹{stats.pendingCommissions.toFixed(2)} pending
                      </p>
                    </div>
                    <Wallet className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Total Referrals</p>
                      <p className="text-2xl font-bold">{stats.totalReferrals}</p>
                      <p className="text-purple-100 text-xs mt-1">
                        {stats.activeReferrals} active
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Total Orders</p>
                      <p className="text-2xl font-bold">{stats.totalOrders}</p>
                      <p className="text-orange-100 text-xs mt-1">Your purchases</p>
                    </div>
                    <Package className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Link href="/dashboard/commissions">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">View Commissions</h3>
                    <p className="text-sm text-gray-500">Track your earnings</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/referrals">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">My Referrals</h3>
                    <p className="text-sm text-gray-500">Manage your network</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/payouts">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Wallet className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Request Payout</h3>
                    <p className="text-sm text-gray-500">Withdraw earnings</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        {/* Recent Activity */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Commissions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Commissions</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/commissions">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {stats.recentCommissions.length === 0 ? (
                    <div className="text-center py-8">
                      <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No commissions yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {stats.recentCommissions.slice(0, 5).map((commission) => (
                        <div key={commission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">₹{commission.amount.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">
                              From {commission.fromUser.name} • Level {commission.level}
                            </p>
                          </div>
                          <Badge variant={commission.status === 'PAID' ? 'default' : 'secondary'}>
                            {commission.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Orders</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/orders">View All</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {stats.recentOrders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No orders yet</p>
                      <Button className="mt-4" asChild>
                        <Link href="/products">Start Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {stats.recentOrders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">₹{order.total.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">
                              {order.orderItems.length} items • {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={order.status === 'DELIVERED' ? 'default' : 'secondary'}>
                            {order.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
