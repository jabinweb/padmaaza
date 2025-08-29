'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  BarChart3,
  FileText,
  Filter
} from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import Link from 'next/link'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

interface ReportData {
  commissions: {
    total: number
    thisMonth: number
    lastMonth: number
    growth: number
    byLevel: { level: number; amount: number; count: number }[]
    recent: {
      id: string
      amount: number
      level: number
      type: string
      status: string
      createdAt: string
      fromUser: { name: string; email: string }
    }[]
  }
  team: {
    totalMembers: number
    activeMembers: number
    newThisMonth: number
    byLevel: { level: number; count: number }[]
  }
  sales: {
    totalVolume: number
    personalVolume: number
    teamVolume: number
    ordersCount: number
  }
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30')
  const [reportType, setReportType] = useState('all')

  const fetchReportData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/dashboard/reports?range=${dateRange}&type=${reportType}`)
      const data = await response.json()
      setReportData(data)
    } catch (error) {
      console.error('Error fetching report data:', error)
      toast.error('Failed to load report data')
    } finally {
      setLoading(false)
    }
  }, [dateRange, reportType])

  useEffect(() => {
    fetchReportData()
  }, [fetchReportData])

  const downloadReport = async (type: 'pdf' | 'excel') => {
    try {
      const response = await fetch(`/api/dashboard/reports/download?type=${type}&range=${dateRange}`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `report-${Date.now()}.${type === 'pdf' ? 'pdf' : 'xlsx'}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success(`${type.toUpperCase()} report downloaded successfully`)
    } catch (error) {
      toast.error('Failed to download report')
    }
  }

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
          title="Reports & Analytics"
          description="Track your performance and download detailed reports"
          icon={<BarChart3 className="h-6 w-6 text-white" />}
          actions={
            <>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 3 months</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={() => downloadReport('excel')}>
                <Download className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
              
              <Button variant="outline" onClick={() => downloadReport('pdf')}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </>
          }
        />

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Commissions</p>
                  <p className="text-3xl font-bold">₹{reportData?.commissions.total.toFixed(2) || '0.00'}</p>
                  <p className="text-green-100 text-xs mt-1">
                    {(reportData?.commissions.growth || 0) > 0 ? '+' : ''}{(reportData?.commissions.growth || 0).toFixed(1)}% from last period
                  </p>
                </div>
                <DollarSign className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Team Members</p>
                  <p className="text-3xl font-bold">{reportData?.team.totalMembers || 0}</p>
                  <p className="text-blue-100 text-xs mt-1">
                    {reportData?.team.newThisMonth || 0} new this month
                  </p>
                </div>
                <Users className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Volume</p>
                  <p className="text-3xl font-bold">₹{(reportData?.sales.totalVolume || 0).toFixed(0)}</p>
                  <p className="text-purple-100 text-xs mt-1">
                    {reportData?.sales.ordersCount || 0} orders
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Active Members</p>
                  <p className="text-3xl font-bold">{reportData?.team.activeMembers || 0}</p>
                  <p className="text-orange-100 text-xs mt-1">
                    {((reportData?.team.activeMembers || 0) / Math.max(reportData?.team.totalMembers || 1, 1) * 100).toFixed(1)}% active rate
                  </p>
                </div>
                <BarChart3 className="h-10 w-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="commissions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="commissions">Commission Analysis</TabsTrigger>
              <TabsTrigger value="team">Team Performance</TabsTrigger>
              <TabsTrigger value="sales">Sales Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="commissions">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Commission by Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(reportData?.commissions.byLevel || []).map((levelData) => (
                        <div key={levelData.level} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border">
                          <div>
                            <p className="font-medium">Level {levelData.level}</p>
                            <p className="text-sm text-gray-500">{levelData.count} commissions</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">₹{levelData.amount.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Recent Commissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(reportData?.commissions.recent || []).slice(0, 5).map((commission) => (
                        <div key={commission.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-white rounded-lg border">
                          <div>
                            <p className="font-medium text-sm">Level {commission.level}</p>
                            <p className="text-xs text-gray-500">{commission.fromUser.name}</p>
                            <p className="text-xs text-gray-400">{new Date(commission.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">+₹{commission.amount.toFixed(2)}</p>
                            <Badge variant={commission.status === 'PAID' ? 'default' : 'secondary'} className="text-xs">
                              {commission.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="team">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Team Distribution by Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(reportData?.team.byLevel || []).map((levelData) => (
                        <div key={levelData.level} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border">
                          <div>
                            <p className="font-medium">Level {levelData.level}</p>
                            <p className="text-sm text-gray-500">Direct referrals</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-blue-600">{levelData.count} members</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Team Growth Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-white rounded-lg border">
                      <span className="text-gray-600">Total Team Size</span>
                      <span className="font-bold text-purple-600">{reportData?.team.totalMembers || 0}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-white rounded-lg border">
                      <span className="text-gray-600">Active Members</span>
                      <span className="font-bold text-green-600">{reportData?.team.activeMembers || 0}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border">
                      <span className="text-gray-600">New This Month</span>
                      <span className="font-bold text-blue-600">{reportData?.team.newThisMonth || 0}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sales">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border">
                      <h3 className="font-semibold text-gray-900 mb-2">Personal Volume</h3>
                      <p className="text-3xl font-bold text-green-600">₹{(reportData?.sales.personalVolume || 0).toFixed(2)}</p>
                      <p className="text-sm text-gray-500 mt-1">Your direct sales</p>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
                      <h3 className="font-semibold text-gray-900 mb-2">Team Volume</h3>
                      <p className="text-3xl font-bold text-blue-600">₹{(reportData?.sales.teamVolume || 0).toFixed(2)}</p>
                      <p className="text-sm text-gray-500 mt-1">Team sales volume</p>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
                      <h3 className="font-semibold text-gray-900 mb-2">Total Orders</h3>
                      <p className="text-3xl font-bold text-purple-600">{reportData?.sales.ordersCount || 0}</p>
                      <p className="text-sm text-gray-500 mt-1">Orders processed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
                      