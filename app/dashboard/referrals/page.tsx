'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Gift,
  Users,
  DollarSign,
  Calendar,
  Search,
  Copy,
  Share2,
  Mail,
  Phone,
  TrendingUp,
  User,
  Plus
} from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

interface Referral {
  id: string
  name: string
  email: string
  phone?: string
  joinedAt: string
  isActive: boolean
  totalOrders: number
  totalSpent: number
  commissionEarned: number
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
}

interface ReferralStats {
  totalReferrals: number
  activeReferrals: number
  pendingReferrals: number
  totalCommissionEarned: number
  thisMonthReferrals: number
  thisMonthCommission: number
}

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [stats, setStats] = useState<ReferralStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [referralCode, setReferralCode] = useState('')

  const fetchReferrals = useCallback(async () => {
    try {
      const [referralsRes, statsRes, userRes] = await Promise.all([
        fetch('/api/dashboard/referrals'),
        fetch('/api/dashboard/referrals/stats'),
        fetch('/api/user/profile')
      ])

      const [referralsData, statsData, userData] = await Promise.all([
        referralsRes.json(),
        statsRes.json(),
        userRes.json()
      ])

      setReferrals(referralsData.referrals || [])
      setStats(statsData)
      setReferralCode(userData.referralCode)
    } catch (error) {
      console.error('Error fetching referrals:', error)
      toast.error('Failed to load referrals data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReferrals()
  }, [fetchReferrals])

  const filteredReferrals = referrals.filter(referral =>
    referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}/auth/signup?ref=${referralCode}`
    navigator.clipboard.writeText(referralLink)
    toast.success('Referral link copied to clipboard!')
  }

  const shareReferralLink = () => {
    const referralLink = `${window.location.origin}/auth/signup?ref=${referralCode}`
    if (navigator.share) {
      navigator.share({
        title: 'Join Padmaaja Rasool',
        text: 'Join my team at Padmaaja Rasool and start your rice business!',
        url: referralLink
      })
    } else {
      copyReferralLink()
    }
  }

  const inviteViaEmail = () => {
    const referralLink = `${window.location.origin}/auth/signup?ref=${referralCode}`
    const subject = 'Join Padmaaja Rasool Rice Business Partnership!'
    const body = `Hi there!\n\nI'd like to invite you to join Padmaaja Rasool, a premium rice products business where you can earn through our partnership program.\n\nClick here to join: ${referralLink}\n\nBest regards!`
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  if (loading) {
    return (
        <div className="flex items-center justify-center h-full">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    )
  }

  return (
      <div className="p-3 sm:p-6 space-y-4 sm:space-y-8">
        {/* Header */}
        <DashboardHeader
          title="My Referrals"
          description="Manage your direct referrals and track commissions"
          icon={<Gift className="h-6 w-6 text-white" />}
          actions={
            <Button onClick={inviteViaEmail} size="sm" className="text-xs sm:text-sm">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Invite Friends</span>
              <span className="sm:hidden">Invite</span>
            </Button>
          }
        />

        {/* Stats Cards - Mobile Responsive Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-blue-100 text-xs sm:text-sm">Total Referrals</p>
                  <p className="text-xl sm:text-3xl font-bold">{stats?.totalReferrals || 0}</p>
                  <p className="text-blue-100 text-xs mt-1">
                    {stats?.thisMonthReferrals || 0} this month
                  </p>
                </div>
                <Users className="h-6 w-6 sm:h-10 sm:w-10 text-blue-200 self-end sm:self-auto" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-green-100 text-xs sm:text-sm">Active Referrals</p>
                  <p className="text-xl sm:text-3xl font-bold">{stats?.activeReferrals || 0}</p>
                  <p className="text-green-100 text-xs mt-1">
                    {stats?.pendingReferrals || 0} pending
                  </p>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-10 sm:w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-lg">
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-purple-100 text-xs sm:text-sm">Total Commission</p>
                  <p className="text-xl sm:text-3xl font-bold">₹{(stats?.totalCommissionEarned || 0).toFixed(0)}</p>
                  <p className="text-purple-100 text-xs mt-1">
                    ₹{(stats?.thisMonthCommission || 0).toFixed(0)} this month
                  </p>
                </div>
                <DollarSign className="h-6 w-6 sm:h-10 sm:w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 shadow-lg">
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-orange-100 text-xs sm:text-sm">Avg. Commission</p>
                  <p className="text-xl sm:text-3xl font-bold">
                    ₹{stats?.totalReferrals ? ((stats?.totalCommissionEarned || 0) / stats.totalReferrals).toFixed(0) : '0'}
                  </p>
                  <p className="text-orange-100 text-xs mt-1">Per referral</p>
                </div>
                <Gift className="h-6 w-6 sm:h-10 sm:w-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Referral Link Section - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Your Referral Link</h3>
                  <p className="text-blue-100 text-sm sm:text-base">Share this link to invite friends and earn commissions</p>
                  <div className="bg-white/20 px-3 sm:px-4 py-2 rounded-lg backdrop-blur-sm mt-3 overflow-hidden">
                    <code className="text-xs sm:text-sm break-all">
                      {`${typeof window !== 'undefined' ? window.location.origin : ''}/auth/signup?ref=${referralCode}`}
                    </code>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-row sm:items-center sm:gap-3">
                  <Button variant="secondary" onClick={copyReferralLink} size="sm" className="text-xs">
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Copy Link</span>
                    <span className="sm:hidden">Copy</span>
                  </Button>
                  <Button variant="secondary" onClick={shareReferralLink} size="sm" className="text-xs">
                    <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Share</span>
                    <span className="sm:hidden">Share</span>
                  </Button>
                  <Button variant="secondary" onClick={inviteViaEmail} size="sm" className="text-xs">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Email Invite</span>
                    <span className="sm:hidden">Email</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Referrals Management - Mobile Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
                <TabsTrigger value="active" className="text-xs sm:text-sm">Active</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs sm:text-sm">Pending</TabsTrigger>
              </TabsList>
              
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search referrals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
            </div>

            <TabsContent value="all">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl">All Referrals ({filteredReferrals.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredReferrals.length > 0 ? (
                    <div className="space-y-3 sm:space-y-4">
                      {filteredReferrals.map((referral) => (
                        <div key={referral.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border hover:shadow-md transition-shadow space-y-3 sm:space-y-0">
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{referral.name}</h4>
                              <p className="text-xs sm:text-sm text-gray-500 truncate">{referral.email}</p>
                              {referral.phone && (
                                <p className="text-xs text-gray-400 flex items-center mt-1">
                                  <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                                  <span className="truncate">{referral.phone}</span>
                                </p>
                              )}
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                <div className="flex items-center text-xs text-gray-400">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span className="whitespace-nowrap">Joined {new Date(referral.joinedAt).toLocaleDateString()}</span>
                                </div>
                                <Badge variant={referral.isActive ? 'default' : 'secondary'} className="text-xs">
                                  {referral.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                            <div>
                              <p className="text-xs font-medium text-gray-600">Orders</p>
                              <p className="text-sm sm:text-lg font-bold text-blue-600">{referral.totalOrders}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-600">Spent</p>
                              <p className="text-sm sm:text-lg font-bold text-green-600">₹{referral.totalSpent.toFixed(0)}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-600">Commission</p>
                              <p className="text-sm sm:text-lg font-bold text-purple-600">₹{referral.commissionEarned.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals yet</h3>
                      <p className="text-gray-500 mb-4">Start inviting friends to build your network</p>
                      <Button onClick={inviteViaEmail}>
                        <Plus className="h-4 w-4 mr-2" />
                        Invite Your First Referral
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl">Active Referrals ({filteredReferrals.filter(r => r.isActive).length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {filteredReferrals.filter(r => r.isActive).map((referral) => (
                      <div key={referral.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-white rounded-lg border">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{referral.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">{referral.email}</p>
                            <Badge variant="default" className="mt-2 text-xs">Active</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm sm:text-lg font-bold text-green-600">₹{referral.commissionEarned.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">Commission earned</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl">Pending Referrals ({filteredReferrals.filter(r => !r.isActive).length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {filteredReferrals.filter(r => !r.isActive).map((referral) => (
                      <div key={referral.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gradient-to-r from-yellow-50 to-white rounded-lg border">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{referral.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">{referral.email}</p>
                            <Badge variant="secondary" className="mt-2 text-xs">Pending</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
  )
}
