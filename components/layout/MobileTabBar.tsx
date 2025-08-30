'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  ShoppingBag, 
  ShoppingCart,
  User, 
  MoreHorizontal
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import CartSidebar from '@/components/CartSidebar'
import { cartManager } from '@/lib/cart'

const tabs = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    href: '/',
    activeRoutes: ['/']
  },
  {
    id: 'products',
    label: 'Products',
    icon: ShoppingBag,
    href: '/products',
    activeRoutes: ['/products', '/products/[slug]']
  },
  {
    id: 'cart',
    label: 'Cart',
    icon: ShoppingCart,
    href: '/cart',
    activeRoutes: ['/cart', '/checkout']
  },
  {
    id: 'account',
    label: 'Account',
    icon: User,
    href: '/dashboard',
    activeRoutes: ['/dashboard']
  },
  {
    id: 'more',
    label: 'More',
    icon: MoreHorizontal,
    href: '/more',
    activeRoutes: ['/more', '/about', '/contact', '/partnership', '/bulk-supply']
  }
]

export default function MobileTabBar() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [cartItemCount, setCartItemCount] = useState(0)

  // Load cart count
  const loadCartCount = () => {
    const cart = cartManager.getCart()
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    setCartItemCount(count)
  }

  useEffect(() => {
    loadCartCount()
    
    const handleCartUpdate = () => loadCartCount()
    window.addEventListener('cartUpdated', handleCartUpdate)
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [])

  // Hide/show tab bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // Hide when scrolling down
      } else {
        setIsVisible(true) // Show when scrolling up
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const isActiveTab = (tab: typeof tabs[0]) => {
    if (tab.activeRoutes.includes(pathname)) return true
    return tab.activeRoutes.some(route => {
      if (route.includes('[slug]')) {
        const baseRoute = route.replace('/[slug]', '')
        return pathname.startsWith(baseRoute) && pathname !== baseRoute
      }
      return false
    })
  }

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 md:hidden",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = isActiveTab(tab)
          
          // Special handling for cart tab
          if (tab.id === 'cart') {
            return (
              <CartSidebar key={tab.id}>
                <div
                  className={cn(
                    "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1 relative cursor-pointer",
                    "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                  )}
                >
                  <div className="relative">
                    <Icon 
                      className="h-5 w-5 mb-1 transition-transform duration-200" 
                    />
                    {cartItemCount > 0 && (
                      <Badge 
                        className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 bg-red-500 text-white !text-xs"
                      >
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                      </Badge>
                    )}
                  </div>
                  <span 
                    className="text-xs font-medium truncate transition-colors duration-200 text-gray-600"
                  >
                    {tab.label}
                  </span>
                </div>
              </CartSidebar>
            )
          }
          
          // Regular tabs
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1",
                isActive
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
              )}
            >
              <Icon 
                className={cn(
                  "h-5 w-5 mb-1 transition-transform duration-200",
                  isActive ? "scale-110" : ""
                )} 
              />
              <span 
                className={cn(
                  "text-xs font-medium truncate transition-colors duration-200",
                  isActive ? "text-emerald-700" : "text-gray-600"
                )}
              >
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-emerald-600 rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
      
      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </div>
  )
}
