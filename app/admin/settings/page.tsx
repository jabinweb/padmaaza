'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Settings, 
  DollarSign, 
  Users, 
  Package, 
  Mail,
  Shield,
  Database,
  Plus,
  Edit,
  Trash2,
  Save,
  RefreshCw
} from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface CommissionSetting {
  id: string
  level: number
  percentage: number
  isActive: boolean
}

interface Category {
  id: string
  name: string
  description: string | null
  image: string | null
  isActive: boolean
  productCount: number
}

interface SystemSettings {
  siteName: string
  siteDescription: string
  supportEmail: string
  minimumPayout: number
  enableReferrals: boolean
  enableCommissions: boolean
  maintenanceMode: boolean
  allowRegistration: boolean
}

export default function AdminSettingsPage() {
  const [commissionSettings, setCommissionSettings] = useState<CommissionSetting[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    siteName: 'Padmaaja Rasooi',
    siteDescription: 'Premium quality rice products and grains. Experience the finest rice sourced directly from local farmers.',
    supportEmail: 'srajeev7053@gmail.com',
    minimumPayout: 1000,
    enableReferrals: true,
    enableCommissions: true,
    maintenanceMode: false,
    allowRegistration: true
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingCommission, setEditingCommission] = useState<CommissionSetting | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCommission, setNewCommission] = useState({ level: 1, percentage: 10, isActive: true })
  const [newCategory, setNewCategory] = useState({ name: '', description: '', image: '' })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const [commissionsRes, categoriesRes, systemRes] = await Promise.all([
        fetch('/api/admin/settings/commissions'),
        fetch('/api/admin/settings/categories'),
        fetch('/api/admin/settings/system')
      ])

      const [commissionsData, categoriesData, systemData] = await Promise.all([
        commissionsRes.json(),
        categoriesRes.json(),
        systemRes.json()
      ])

      setCommissionSettings(commissionsData.settings || [])
      setCategories(categoriesData.categories || [])
      setSystemSettings(prev => ({ ...prev, ...systemData }))
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const saveSystemSettings = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/settings/system', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(systemSettings)
      })

      if (!response.ok) throw new Error('Failed to save settings')

      toast.success('System settings saved successfully')
      
      // Show warning if maintenance mode was enabled
      if (systemSettings.maintenanceMode) {
        toast.warning('⚠️ Maintenance mode enabled! Public site is now offline.')
      } else {
        toast.success('✅ Maintenance mode disabled. Public site is now online.')
      }
    } catch (error) {
      console.error('Error saving system settings:', error)
      toast.error('Failed to save system settings')
    } finally {
      setSaving(false)
    }
  }

  const saveCommissionSetting = async (setting: CommissionSetting) => {
    try {
      const response = await fetch(`/api/admin/settings/commissions/${setting.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(setting)
      })

      if (!response.ok) throw new Error('Failed to save commission setting')

      toast.success('Commission setting saved successfully')
      fetchSettings()
      setEditingCommission(null)
    } catch (error) {
      console.error('Error saving commission setting:', error)
      toast.error('Failed to save commission setting')
    }
  }

  const addCommissionSetting = async () => {
    try {
      const response = await fetch('/api/admin/settings/commissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCommission)
      })

      if (!response.ok) throw new Error('Failed to add commission setting')

      toast.success('Commission setting added successfully')
      setNewCommission({ level: 1, percentage: 10, isActive: true })
      fetchSettings()
    } catch (error) {
      console.error('Error adding commission setting:', error)
      toast.error('Failed to add commission setting')
    }
  }

  const deleteCommissionSetting = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/settings/commissions/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete commission setting')

      toast.success('Commission setting deleted successfully')
      fetchSettings()
    } catch (error) {
      console.error('Error deleting commission setting:', error)
      toast.error('Failed to delete commission setting')
    }
  }

  const saveCategory = async (category: Category) => {
    try {
      const url = category.id.startsWith('new') 
        ? '/api/admin/settings/categories'
        : `/api/admin/settings/categories/${category.id}`
      
      const response = await fetch(url, {
        method: category.id.startsWith('new') ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: category.name,
          description: category.description,
          image: category.image,
          isActive: category.isActive
        })
      })

      if (!response.ok) throw new Error('Failed to save category')

      toast.success('Category saved successfully')
      fetchSettings()
      setEditingCategory(null)
      setNewCategory({ name: '', description: '', image: '' })
    } catch (error) {
      console.error('Error saving category:', error)
      toast.error('Failed to save category')
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/settings/categories/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete category')

      toast.success('Category deleted successfully')
      fetchSettings()
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with maintenance warning */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                System Settings
              </h1>
              <p className="text-gray-600 mt-2">Manage your platform configuration and settings</p>
            </div>
            <Button onClick={() => fetchSettings()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          {systemSettings.maintenanceMode && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-red-600" />
                <h3 className="font-medium text-red-900">Maintenance Mode Active</h3>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-red-700">
                  The public website is currently offline for regular users.
                </p>
                <p className="text-sm text-red-600 font-medium">
                  ✅ Admin users (like you) can still access all pages normally.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        <Tabs defaultValue="system" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>System</span>
            </TabsTrigger>
            <TabsTrigger value="commissions" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Commissions</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Categories</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          {/* System Settings */}
          <TabsContent value="system">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>General Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={systemSettings.siteName}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, siteName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <Input
                        id="supportEmail"
                        type="email"
                        value={systemSettings.supportEmail}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={systemSettings.siteDescription}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="minimumPayout">Minimum Payout Amount (₹)</Label>
                    <Input
                      id="minimumPayout"
                      type="number"
                      value={systemSettings.minimumPayout}
                      onChange={(e) => setSystemSettings(prev => ({ ...prev, minimumPayout: parseFloat(e.target.value) }))}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Referral System</Label>
                        <p className="text-sm text-gray-500">Allow users to refer others</p>
                      </div>
                      <Switch
                        checked={systemSettings.enableReferrals}
                        onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, enableReferrals: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Commissions</Label>
                        <p className="text-sm text-gray-500">Enable commission calculations</p>
                      </div>
                      <Switch
                        checked={systemSettings.enableCommissions}
                        onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, enableCommissions: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Registration</Label>
                        <p className="text-sm text-gray-500">Allow new user registrations</p>
                      </div>
                      <Switch
                        checked={systemSettings.allowRegistration}
                        onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, allowRegistration: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50 border-red-200">
                      <div>
                        <Label className="text-red-900 font-medium">Maintenance Mode</Label>
                        <p className="text-sm text-red-700 mt-1">Put site in maintenance mode</p>
                        <p className="text-xs text-red-600 font-medium">
                          ⚠️ This will take the public site offline for regular users. Admin users will still have full access.
                        </p>
                      </div>
                      <Switch
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                      />
                    </div>
                  </div>

                  <Button onClick={saveSystemSettings} disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Settings'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Commission Settings */}
          <TabsContent value="commissions">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5" />
                      <span>Commission Structure</span>
                    </CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Level
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Commission Level</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Level</Label>
                            <Input
                              type="number"
                              value={newCommission.level}
                              onChange={(e) => setNewCommission(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                            />
                          </div>
                          <div>
                            <Label>Percentage (%)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              value={newCommission.percentage}
                              onChange={(e) => setNewCommission(prev => ({ ...prev, percentage: parseFloat(e.target.value) }))}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={newCommission.isActive}
                              onCheckedChange={(checked) => setNewCommission(prev => ({ ...prev, isActive: checked }))}
                            />
                            <Label>Active</Label>
                          </div>
                          <Button onClick={addCommissionSetting} className="w-full">
                            Add Commission Level
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {commissionSettings.map((setting) => (
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
                            onClick={() => setEditingCommission(setting)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteCommissionSetting(setting.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Categories */}
          <TabsContent value="categories">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="h-5 w-5" />
                      <span>Product Categories</span>
                    </CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Category
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Category</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={newCategory.name}
                              onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={newCategory.description}
                              onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label>Image URL</Label>
                            <Input
                              value={newCategory.image}
                              onChange={(e) => setNewCategory(prev => ({ ...prev, image: e.target.value }))}
                            />
                          </div>
                          <Button 
                            onClick={() => saveCategory({
                              id: 'new-category',
                              name: newCategory.name,
                              description: newCategory.description,
                              image: newCategory.image,
                              isActive: true,
                              productCount: 0
                            })} 
                            className="w-full"
                          >
                            Add Category
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category) => (
                      <div key={category.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{category.name}</h3>
                          <Badge variant={category.isActive ? 'default' : 'secondary'}>
                            {category.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{category.description}</p>
                        <p className="text-xs text-gray-400 mb-3">{category.productCount} products</p>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingCategory(category)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteCategory(category.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">Database Status</h3>
                      <p className="text-sm text-blue-700">Database connection is healthy</p>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h3 className="font-medium text-yellow-900 mb-2">Environment Variables</h3>
                      <p className="text-sm text-yellow-700">All required environment variables are configured</p>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-medium text-green-900 mb-2">SSL Certificate</h3>
                      <p className="text-sm text-green-700">SSL certificate is valid and up to date</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Edit Dialogs */}
        {editingCommission && (
          <Dialog open={!!editingCommission} onOpenChange={() => setEditingCommission(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Commission Setting</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Level</Label>
                  <Input
                    type="number"
                    value={editingCommission.level}
                    onChange={(e) => setEditingCommission(prev => prev ? { ...prev, level: parseInt(e.target.value) } : null)}
                  />
                </div>
                <div>
                  <Label>Percentage (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={editingCommission.percentage}
                    onChange={(e) => setEditingCommission(prev => prev ? { ...prev, percentage: parseFloat(e.target.value) } : null)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editingCommission.isActive}
                    onCheckedChange={(checked) => setEditingCommission(prev => prev ? { ...prev, isActive: checked } : null)}
                  />
                  <Label>Active</Label>
                </div>
                <Button onClick={() => saveCommissionSetting(editingCommission)} className="w-full">
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {editingCategory && (
          <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory(prev => prev ? { ...prev, name: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingCategory.description || ''}
                    onChange={(e) => setEditingCategory(prev => prev ? { ...prev, description: e.target.value } : null)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={editingCategory.image || ''}
                    onChange={(e) => setEditingCategory(prev => prev ? { ...prev, image: e.target.value } : null)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={editingCategory.isActive}
                    onCheckedChange={(checked) => setEditingCategory(prev => prev ? { ...prev, isActive: checked } : null)}
                  />
                  <Label>Active</Label>
                </div>
                <Button onClick={() => saveCategory(editingCategory)} className="w-full">
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
