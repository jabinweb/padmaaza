'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Settings, 
  Search, 
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  Plus
} from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface Commission {
  id: string
  amount: number
  level: number
  type: 'REFERRAL' | 'LEVEL' | 'BONUS'
  status: 'PENDING' | 'APPROVED' | 'PAID' | 'CANCELLED'
  createdAt: string
  user: {
    id: string
    name: string
    email: string
  }
  fromUser: {
    id: string
    name: string
    email: string
  }
  order?: {
    id: string
    total: number
  }
}

interface CommissionStats {
  totalCommissions: number
  pendingAmount: number
  approvedAmount: number
  paidAmount: number
  thisMonthCommissions: number
  averageCommission: number
}

interface CommissionSetting {
  id: string
  level: number
  percentage: number
  isActive: boolean
}

const statusConfig = {
  PENDING: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  APPROVED: { label: 'Approved', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  PAID: { label: 'Paid', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle }
}

export default function AdminCommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [stats, setStats] = useState<CommissionStats | null>(null)
  const [settings, setSettings] = useState<CommissionSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({
    status: 'all',
    type: 'all',
    level: 'all',
    search: ''
  })
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const [editingSetting, setEditingSetting] = useState<CommissionSetting | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const [commissionsRes, statsRes, settingsRes] = await Promise.all([
        fetch('/api/admin/commissions'),
        fetch('/api/admin/commissions/stats'),
        fetch('/api/admin/commissions/settings')
      ])

      // Check if responses are ok and contain valid JSON
      const commissionsData = commissionsRes.ok ? await commissionsRes.json() : { commissions: [] }
      const statsData = statsRes.ok ? await statsRes.json() : {
        totalCommissions: 0,
        pendingAmount: 0,
        approvedAmount: 0,
        paidAmount: 0,
        thisMonthCommissions: 0,
        averageCommission: 0
      }
      const settingsData = settingsRes.ok ? await settingsRes.json() : { settings: [] }

      setCommissions(commissionsData.commissions || [])
      setStats(statsData)
      setSettings(settingsData.settings || [])
    } catch (error) {
      console.error('Error fetching commission data:', error)
      toast.error('Failed to load commission data')
      // Set fallback data
      setCommissions([])
      setStats({
        totalCommissions: 0,
        pendingAmount: 0,
        approvedAmount: 0,
        paidAmount: 0,
        thisMonthCommissions: 0,
        averageCommission: 0
      })
      setSettings([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleStatusUpdate = async (commissionId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/commissions/${commissionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) throw new Error('Failed to update commission')

      toast.success('Commission status updated successfully')
      fetchData()
    } catch (error) {
      console.error('Error updating commission:', error)
      toast.error('Failed to update commission status')
    }
  }

  const handleSettingUpdate = async (setting: CommissionSetting) => {
    try {
      const response = await fetch(`/api/admin/commissions/settings/${setting.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: setting.level,
          percentage: setting.percentage,
          isActive: setting.isActive
        })
      })

      if (!response.ok) throw new Error('Failed to update setting')

      toast.success('Commission setting updated successfully')
      fetchData()
      setEditingSetting(null)
      setSettingsDialogOpen(false)
    } catch (error) {
      console.error('Error updating setting:', error)
      toast.error('Failed to update commission setting')
    }
  }

  const filteredCommissions = commissions.filter(commission => {
    const matchesStatus = filter.status === 'all' || commission.status === filter.status
    const matchesType = filter.type === 'all' || commission.type === filter.type
    const matchesLevel = filter.level === 'all' || commission.level.toString() === filter.level
    const matchesSearch = !filter.search || 
      commission.user.name.toLowerCase().includes(filter.search.toLowerCase()) ||
      commission.user.email.toLowerCase().includes(filter.search.toLowerCase()) ||
      commission.fromUser.name.toLowerCase().includes(filter.search.toLowerCase())
    
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Commission Management
            </h1>
            <p className="text-gray-600 mt-2">Monitor and manage all commission transactions</p>
          </div>
          <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                <Settings className="h-4 w-4 mr-2" />
                Commission Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Commission Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {settings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Level {setting.level}</p>
                      <p className="text-sm text-gray-500">{setting.percentage}% commission</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={setting.isActive ? 'default' : 'secondary'}>
                        {setting.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingSetting(setting)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats Cards */}
        {stats && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Commissions</p>
                    <p className="text-2xl font-bold">{stats.totalCommissions}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm">Pending Amount</p>
                    <p className="text-2xl font-bold">₹{stats.pendingAmount.toFixed(0)}</p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Paid Amount</p>
                    <p className="text-2xl font-bold">₹{stats.paidAmount.toFixed(0)}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Avg Commission</p>
                    <p className="text-2xl font-bold">₹{stats.averageCommission.toFixed(0)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Main Commission Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <CardTitle className="text-2xl font-bold">All Commissions</CardTitle>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      value={filter.search}
                      onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                      className="pl-10 w-64 bg-white shadow-sm"
                    />
                  </div>
                  <Select value={filter.status} onValueChange={(value) => setFilter(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger className="w-40 bg-white shadow-sm">
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
                    <SelectTrigger className="w-40 bg-white shadow-sm">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="REFERRAL">Referral</SelectItem>
                      <SelectItem value="LEVEL">Level</SelectItem>
                      <SelectItem value="BONUS">Bonus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-semibold">Recipient</TableHead>
                      <TableHead className="font-semibold">From User</TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="font-semibold">Level</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Date</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCommissions.map((commission, index) => (
                      <motion.tr
                        key={commission.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {commission.user.name?.charAt(0) || 'U'}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{commission.user.name}</p>
                              <p className="text-sm text-gray-500">{commission.user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{commission.fromUser.name}</p>
                            <p className="text-sm text-gray-500">{commission.fromUser.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            ₹{commission.amount.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Level {commission.level}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{commission.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig[commission.status].color}>
                            {statusConfig[commission.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">
                            {new Date(commission.createdAt).toLocaleDateString()}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {commission.status === 'PENDING' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusUpdate(commission.id, 'APPROVED')}
                                  className="text-blue-600 hover:bg-blue-50"
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusUpdate(commission.id, 'CANCELLED')}
                                  className="text-red-600 hover:bg-red-50"
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            {commission.status === 'APPROVED' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(commission.id, 'PAID')}
                                className="text-green-600 hover:bg-green-50"
                              >
                                Mark Paid
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredCommissions.length === 0 && (
                <div className="text-center py-12">
                  <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No commissions found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit Setting Dialog */}
        {editingSetting && (
          <Dialog open={!!editingSetting} onOpenChange={() => setEditingSetting(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Commission Setting</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Level</Label>
                  <Input
                    type="number"
                    value={editingSetting.level}
                    onChange={(e) => setEditingSetting(prev => prev ? { ...prev, level: parseInt(e.target.value) } : null)}
                  />
                </div>
                <div>
                  <Label>Percentage (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={editingSetting.percentage}
                    onChange={(e) => setEditingSetting(prev => prev ? { ...prev, percentage: parseFloat(e.target.value) } : null)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={editingSetting.isActive}
                    onChange={(e) => setEditingSetting(prev => prev ? { ...prev, isActive: e.target.checked } : null)}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditingSetting(null)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleSettingUpdate(editingSetting)}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
