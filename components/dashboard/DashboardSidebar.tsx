'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard,
  Users,
  Network,
  Wallet,
  ShoppingBag,
  BarChart3,
  CreditCard,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Gift,
  TrendingUp,
  Package
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: SidebarItem[]
  roles?: string[] // Allowed roles for this item
}

// Role-based navigation items
const getSidebarItems = (userRole: string): SidebarItem[] => {
  const allItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      roles: ['CUSTOMER', 'MEMBER', 'WHOLESALER', 'PART_TIME', 'ADMIN']
    },
    {
      title: 'My Orders',
      href: '/dashboard/orders',
      icon: ShoppingBag,
      roles: ['CUSTOMER', 'MEMBER', 'WHOLESALER', 'PART_TIME', 'ADMIN']
    },
    {
      title: 'Network',
      href: '',
      icon: Network,
      roles: ['MEMBER', 'WHOLESALER'],
      children: [
        {
          title: 'Team Genealogy',
          href: '/dashboard/genealogy',
          icon: Users,
          roles: ['MEMBER', 'WHOLESALER']
        },
        {
          title: 'My Referrals',
          href: '/dashboard/referrals',
          icon: Gift,
          roles: ['MEMBER', 'WHOLESALER']
        },
        {
          title: 'Team Overview',
          href: '/dashboard/team',
          icon: TrendingUp,
          roles: ['MEMBER', 'WHOLESALER']
        },
      ]
    },
    {
      title: 'Achievements',
      href: '/dashboard/achievements',
      icon: Trophy,
      roles: ['MEMBER', 'WHOLESALER']
    },
    {
      title: 'Wallet & Earnings',
      href: '/dashboard/wallet',
      icon: Wallet,
      roles: ['MEMBER', 'WHOLESALER', 'PART_TIME'],
      children: [
        {
          title: 'My Wallet',
          href: '/dashboard/wallet',
          icon: Wallet,
          roles: ['MEMBER', 'WHOLESALER', 'PART_TIME']
        },
        {
          title: 'Commission History',
          href: '/dashboard/commissions',
          icon: TrendingUp,
          roles: ['MEMBER', 'WHOLESALER']
        },
        {
          title: 'Earnings',
          href: '/dashboard/earnings',
          icon: TrendingUp,
          roles: ['PART_TIME']
        },
        {
          title: 'Payout Requests',
          href: '/dashboard/payouts',
          icon: CreditCard,
          roles: ['MEMBER', 'WHOLESALER', 'PART_TIME']
        },
      ]
    },
    {
      title: 'Wholesale Portal',
      href: '/dashboard/wholesale',
      icon: Package,
      roles: ['WHOLESALER']
    },
    {
      title: 'Part-Time Jobs',
      href: '/dashboard/part-time',
      icon: Users,
      roles: ['PART_TIME']
    },
    {
      title: 'Reports & Analytics',
      href: '/dashboard/reports',
      icon: BarChart3,
      roles: ['MEMBER', 'ADMIN']
    },
    {
      title: 'Profile Settings',
      href: '/dashboard/profile',
      icon: User,
      roles: ['CUSTOMER', 'MEMBER', 'WHOLESALER', 'PART_TIME', 'ADMIN']
    },
  ]

  // Filter items based on user role
  const filterItemsByRole = (items: SidebarItem[]): SidebarItem[] => {
    return items
      .filter(item => !item.roles || item.roles.includes(userRole))
      .map(item => ({
        ...item,
        children: item.children ? filterItemsByRole(item.children) : undefined
      }))
      .filter(item => !item.children || item.children.length > 0) // Remove parent items with no visible children
  }

  return filterItemsByRole(allItems)
}

// Role display information
const getRoleInfo = (role: string) => {
  const roleMap: Record<string, { label: string; description: string; className: string }> = {
    ADMIN: { 
      label: 'Admin', 
      description: 'Full system access',
      className: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    MEMBER: { 
      label: 'Partner', 
      description: 'Marketing partner',
      className: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    WHOLESALER: { 
      label: 'Wholesaler', 
      description: 'Bulk distribution partner',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    PART_TIME: { 
      label: 'Part-time', 
      description: 'Delivery & support team',
      className: 'bg-green-100 text-green-800 border-green-200'
    },
    CUSTOMER: { 
      label: 'Customer', 
      description: 'Valued customer',
      className: 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }
  
  return roleMap[role] || roleMap.CUSTOMER
}

interface DashboardSidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()
  const { data: session } = useSession()

  // Get user role from session, default to CUSTOMER
  const userRole = session?.user?.role || 'CUSTOMER'
  const roleInfo = getRoleInfo(userRole)
  
  // Get sidebar items based on user role
  const sidebarItems = getSidebarItems(userRole)

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  const hasActiveChild = (children?: SidebarItem[]) => {
    if (!children) return false
    return children.some(child => isActive(child.href))
  }

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "bg-white/80 backdrop-blur-sm border-r border-gray-200 h-screen sticky top-0 overflow-y-auto transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center space-x-3"
              >
                  <div className='w-8 h-8 rounded-lg flex items-center justify-center'>
                  <Image src="/logo.png" alt="Padmaaja Logo" width={32} height={32} className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-gray-900">Padmaaja Rasooi</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* User Profile */}
        <AnimatePresence>
          {!isCollapsed && session && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {session.user.image ? (
                    <Image src={session.user.image} alt="User Avatar" width={40} height={40} className="rounded-full" />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {session.user.name || 'User'}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs", roleInfo.className)}
                    >
                      {roleInfo.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {roleInfo.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <div key={item.title}>
              <div
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer",
                  isActive(item.href) || hasActiveChild(item.children)
                    ? "bg-blue-100 text-blue-900"
                    : "text-gray-700 hover:bg-gray-100",
                  isCollapsed && "justify-center px-2"
                )}
                onClick={() => {
                  if (item.children) {
                    toggleExpanded(item.title)
                  }
                }}
              >
                <Link href={item.href} className="flex items-center space-x-3 flex-1">
                  <item.icon className="h-5 w-5" />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="truncate"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-2"
                    >
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {item.children && (
                        <ChevronRight 
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedItems.includes(item.title) && "rotate-90"
                          )} 
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submenu */}
              <AnimatePresence>
                {item.children && expandedItems.includes(item.title) && !isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-4 mt-2 space-y-1"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive(child.href)
                            ? "bg-blue-50 text-blue-700 border-l-2 border-blue-500"
                            : "text-gray-600 hover:bg-gray-50"
                        )}
                      >
                        <child.icon className="h-4 w-4" />
                        <span className="truncate">{child.title}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200 space-y-2">
          <Link
            href="/"
            target="_blank"
            className={cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100",
              isCollapsed && "justify-center px-2"
            )}
          >
            <Package className="h-5 w-5" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  View Site
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {session?.user?.role === 'ADMIN' && (
            <Link
              href="/admin"
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname.startsWith('/admin')
                ? "bg-purple-100 text-purple-900"
                : "text-gray-700 hover:bg-gray-100",
              isCollapsed && "justify-center px-2"
            )}
          >
            <Settings className="h-5 w-5" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  Admin Panel
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          )}

          <Button
            variant="ghost"
            onClick={() => signOut()}
            className={cn(
              "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50",
              isCollapsed && "justify-center px-2"
            )}
          >
            <LogOut className="h-5 w-5" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-3"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
