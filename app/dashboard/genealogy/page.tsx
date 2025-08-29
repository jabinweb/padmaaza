'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Search, 
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  User,
  DollarSign,
  Calendar,
  Expand,
  Minimize,
  Download,
  Eye,
  Network
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { toast } from 'sonner'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

interface TeamMember {
  id: string
  name: string
  email: string
  joinedAt: string
  totalEarnings: number
  directReferrals: number
  level: number
  children?: TeamMember[]
  isExpanded?: boolean
  isActive?: boolean
}

interface GenealogyData {
  user: TeamMember
  teamSize: number
  totalVolume: number
  levels: number
}

export default function GenealogyPage() {
  const [genealogyData, setGenealogyData] = useState<GenealogyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'tree' | 'compact'>('tree')

  const addToAutoExpand = useCallback((node: TeamMember, set: Set<string>, levelsLeft: number) => {
    if (levelsLeft > 0 && node.children && node.children.length > 0) {
      set.add(node.id)
      node.children.forEach(child => addToAutoExpand(child, set, levelsLeft - 1))
    }
  }, [])

  const fetchGenealogyData = useCallback(async () => {
    try {
      const response = await fetch('/api/dashboard/genealogy')
      if (!response.ok) throw new Error('Failed to fetch genealogy')
      const data = await response.json()
      setGenealogyData(data)
      
      // Auto-expand first few levels
      const autoExpand = new Set<string>()
      addToAutoExpand(data.user, autoExpand, 2) // Expand first 2 levels
      setExpandedNodes(autoExpand)
    } catch (error) {
      console.error('Error fetching genealogy data:', error)
      toast.error('Failed to load genealogy tree')
    } finally {
      setLoading(false)
    }
  }, [addToAutoExpand])

  useEffect(() => {
    fetchGenealogyData()
  }, [fetchGenealogyData])

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const expandAll = () => {
    if (!genealogyData?.user) return
    const allNodes = new Set<string>()
    const collectAllNodes = (node: TeamMember) => {
      if (node.children && node.children.length > 0) {
        allNodes.add(node.id)
        node.children.forEach(collectAllNodes)
      }
    }
    collectAllNodes(genealogyData.user)
    setExpandedNodes(allNodes)
  }

  const collapseAll = () => {
    setExpandedNodes(new Set())
  }

  const renderTreeNode = (member: TeamMember, depth = 0) => {
    const hasChildren = member.children && member.children.length > 0
    const isExpanded = expandedNodes.has(member.id)
    const isSearchMatch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (searchTerm && !isSearchMatch && depth > 0) {
      return null
    }

    const marginClass = depth === 0 ? '' : 
                       depth === 1 ? 'ml-8' :
                       depth === 2 ? 'ml-16' :
                       depth === 3 ? 'ml-24' : 'ml-32'

    return (
      <motion.div
        key={member.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, delay: depth * 0.05 }}
        className={marginClass}
      >
        <Card className={`mb-4 relative overflow-hidden ${
          isSearchMatch && searchTerm ? 'ring-2 ring-blue-500 shadow-lg' : 'shadow-md hover:shadow-lg'
        } transition-all duration-300 ${
          member.level === 0 ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200' :
          member.level === 1 ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' :
          member.level === 2 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' :
          'bg-white/90 backdrop-blur-sm border-gray-200'
        }`}>
          
          {/* Level indicator line */}
          {depth > 0 && (
            <div className="absolute -left-8 top-6 w-8 h-px bg-gray-300"></div>
          )}
          
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleNode(member.id)}
                    className="p-2 h-8 w-8 rounded-full hover:bg-white/80 transition-colors"
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  </Button>
                )}
                
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                    member.level === 0 ? 'bg-gradient-to-r from-blue-500 to-purple-600' :
                    member.level === 1 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                    member.level === 2 ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                    member.level === 3 ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                    'bg-gradient-to-r from-gray-400 to-gray-600'
                  }`}>
                    <User className="h-8 w-8 text-white" />
                  </div>
                  {member.level === 0 && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-yellow-900">👑</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                    {member.level > 0 && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs font-medium ${
                          member.level === 1 ? 'bg-green-100 text-green-800' :
                          member.level === 2 ? 'bg-yellow-100 text-yellow-800' :
                          member.level === 3 ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        Level {member.level}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{member.email}</p>
                  <div className="flex items-center space-x-6 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Joined {new Date(member.joinedAt).toLocaleDateString()}
                    </div>
                    {hasChildren && (
                      <div className="flex items-center">
                        <Network className="h-3 w-3 mr-1" />
                        {member.children!.length} direct referrals
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-2">
                <div className="flex items-center justify-end text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="font-medium">{member.directReferrals} referrals</span>
                </div>
                <div className="flex items-center justify-end text-lg font-bold text-green-600">
                  <DollarSign className="h-5 w-5 mr-1" />
                  ₹{member.totalEarnings.toFixed(2)}
                </div>
                {member.level === 0 && (
                  <Button size="sm" variant="outline" className="text-xs" asChild>
                    <Link href={`/dashboard/profile/${member.id}`}>
                      <Eye className="h-3 w-3 mr-1" />
                      View Profile
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Vertical connector line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-300"></div>
              
              <div className="ml-8 space-y-2">
                {member.children!.map(child => renderTreeNode(child, depth + 1))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
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
        {/* Enhanced Header */}
        <DashboardHeader
          title="Team Genealogy"
          description="Visualize and manage your network structure"
          icon={<Network className="h-6 w-6 text-white" />}
          actions={
            <>
              <Button variant="outline" onClick={expandAll}>
                <Expand className="h-4 w-4 mr-2" />
                Expand All
              </Button>
              <Button variant="outline" onClick={collapseAll}>
                <Minimize className="h-4 w-4 mr-2" />
                Collapse All
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </>
          }
        />

        {/* Enhanced Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Team Size</p>
                  <p className="text-3xl font-bold">{genealogyData?.teamSize || 0}</p>
                </div>
                <Users className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Network Levels</p>
                  <p className="text-3xl font-bold">{genealogyData?.levels || 0}</p>
                </div>
                <Network className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Team Volume</p>
                  <p className="text-2xl font-bold">₹{genealogyData?.totalVolume?.toFixed(0) || '0'}</p>
                </div>
                <DollarSign className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Active Members</p>
                  <p className="text-3xl font-bold">{genealogyData?.teamSize || 0}</p>
                </div>
                <User className="h-10 w-10 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 text-base border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Genealogy Tree */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-xl font-bold flex items-center">
                <Network className="h-6 w-6 mr-3 text-blue-600" />
                Network Tree
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {genealogyData?.user ? (
                <div className="space-y-4">
                  {renderTreeNode(genealogyData.user)}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Network className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No team data available</h3>
                  <p className="text-gray-500">Start building your network to see the genealogy tree</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
