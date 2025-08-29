'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DollarSign, TrendingUp, Users, Eye, Filter, Download, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

interface Commission {
  id: string
  amount: number
  level: number
  type: 'REFERRAL' | 'LEVEL' | 'BONUS'
  status: 'PENDING' | 'APPROVED' | 'PAID' | 'CANCELLED'
  createdAt: string
  fromUser: {
    name: string
    email: string
  }
  order?: {
    id: string
    total: number
  }
}

interface CommissionStats {
  totalEarnings: number
  pendingAmount: number
  thisMonthEarnings: number
  totalCommissions: number
  byLevel: {
    level: number
    amount: number
    count: number
  }[]
}

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [stats, setStats] = useState<CommissionStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    status: 'all',
    type: 'all',
    level: 'all',
    search: ''
  })

  useEffect(() => {
    fetchCommissions()
    fetchStats()
  }, [])

  const fetchCommissions = async () => {
    try {
      const response = await fetch('/api/commissions')
      if (!response.ok) throw new Error('Failed to fetch commissions')
      const data = await response.json()
      setCommissions(data.commissions || [])
    } catch (error) {
      console.error('Error fetching commissions:', error)
      toast.error('Failed to load commissions')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/commissions/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500'
      case 'APPROVED': return 'bg-blue-500'
      case 'PAID': return 'bg-green-500'
      case 'CANCELLED': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'REFERRAL': return 'bg-blue-100 text-blue-800'
      case 'LEVEL': return 'bg-purple-100 text-purple-800'
      case 'BONUS': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredCommissions = commissions.filter(commission => {
    const matchesStatus = filter.status === 'all' || commission.status === filter.status
    const matchesType = filter.type === 'all' || commission.type === filter.type
    const matchesLevel = filter.level === 'all' || commission.level.toString() === filter.level
    const matchesSearch = !filter.search || 
      commission.fromUser.name.toLowerCase().includes(filter.search.toLowerCase()) ||
      commission.fromUser.email.toLowerCase().includes(filter.search.toLowerCase())
    
    return matchesStatus && matchesType && matchesLevel && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <DashboardHeader
          title="Commission Earnings"
          description="Track your referral commissions and earnings"
          icon={<DollarSign className="h-6 w-6 text-white" />}
        />

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Total Earnings</p>
                      <p className="text-2xl font-bold">₹{stats.totalEarnings.toFixed(2)}</p>
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
              <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100 text-sm font-medium">Pending Amount</p>
                      <p className="text-2xl font-bold">₹{stats.pendingAmount.toFixed(2)}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-yellow-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">This Month</p>
                      <p className="text-2xl font-bold">₹{stats.thisMonthEarnings.toFixed(2)}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Total Commissions</p>
                      <p className="text-2xl font-bold">{stats.totalCommissions}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Level Breakdown */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle>Earnings by Level</CardTitle>
                  <CardDescription>Commission breakdown by referral levels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.byLevel.map((level, index) => (
                    <div key={level.level} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Level {level.level}</p>
                        <p className="text-sm text-gray-500">{level.count} commissions</p>
                      </div>
                      <span className="font-bold text-green-600">₹{level.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Commissions List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-3"
          >
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Commission History</CardTitle>
                    <CardDescription>All your commission earnings and transactions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
                  <Input
                    placeholder="Search by name or email..."
                    value={filter.search}
                    onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                  />
                  
                  <Select value={filter.status} onValueChange={(value) => setFilter(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="PAID">Paid</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filter.type} onValueChange={(value) => setFilter(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="REFERRAL">Referral</SelectItem>
                      <SelectItem value="LEVEL">Level</SelectItem>
                      <SelectItem value="BONUS">Bonus</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filter.level} onValueChange={(value) => setFilter(prev => ({ ...prev, level: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="1">Level 1</SelectItem>
                      <SelectItem value="2">Level 2</SelectItem>
                      <SelectItem value="3">Level 3</SelectItem>
                      <SelectItem value="4">Level 4</SelectItem>
                      <SelectItem value="5">Level 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>

              <CardContent>
                {filteredCommissions.length === 0 ? (
                  <div className="text-center py-12">
                    <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No commissions found</h3>
                    <p className="text-gray-500">Start referring users to earn commissions!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredCommissions.map((commission, index) => (
                      <motion.div
                        key={commission.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge className={getTypeColor(commission.type)}>
                              {commission.type}
                            </Badge>
                            <Badge variant="outline">Level {commission.level}</Badge>
                            <Badge className={`${getStatusColor(commission.status)} text-white`}>
                              {commission.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{commission.fromUser.name}</p>
                              <p className="text-sm text-gray-500">{commission.fromUser.email}</p>
                              {commission.order && (
                                <p className="text-xs text-gray-400">
                                  Order: ₹{commission.order.total.toFixed(2)}
                                </p>
                              )}
                            </div>
                            
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">
                                ₹{commission.amount.toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(commission.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
