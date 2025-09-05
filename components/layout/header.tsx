'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, Wheat, Leaf, Package, Building2, Settings, ShoppingBag, LogOut, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useSession, signOut } from 'next-auth/react'
import CartSidebar from '@/components/CartSidebar'
import MegaMenu from '@/components/layout/MegaMenu'

interface MenuItem {
  name: string
  href: string
  description: string
}

interface MenuCategory {
  name: string
  icon: LucideIcon
  items: MenuItem[]
}

interface MegaMenuConfig {
  title: string
  type: 'categories'
  categories: MenuCategory[]
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navItems = [
    { name: 'Home', href: '/' },
    // { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const megaMenus: Record<string, MegaMenuConfig> = {
    products: {
      title: 'Products',
      type: 'categories' as const,
      categories: [] // Will be populated dynamically by MegaMenu component
    },
    company: {
      title: 'Company',
      type: 'categories' as const,
      categories: [
        {
          name: 'About Us',
          icon: Building2,
          items: [
            { name: 'Our Story', href: '/about', description: 'Company history and mission' },
            { name: 'Our Founder', href: '/about/founder', description: 'Meet our visionary leader' },
            { name: 'Certifications', href: '/about/certifications', description: 'Industry recognition' },
            { name: 'Sustainability', href: '/sustainability', description: 'Environmental commitment' },
          ]
        },
        {
          name: 'Business',
          icon: Settings,
          items: [
            { name: 'Partnership', href: '/partnership', description: 'Join our network' },
            { name: 'Bulk Supply', href: '/bulk-supply', description: 'Wholesale distribution' },
            { name: 'Wholesaler', href: '/wholesaler', description: 'Wholesaler program' },
          ]
        },
      ]
    }
  }

  const { data: session } = useSession()

  const adminNavigation = [
    { name: 'Admin Dashboard', href: '/admin', icon: Settings },
    { name: 'Manage Products', href: '/admin/products', icon: Package },
    { name: 'Manage Orders', href: '/admin/orders', icon: ShoppingBag },
  ]

  const memberNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Settings },
    { name: 'My Orders', href: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Profile', href: '/dashboard/profile', icon: Settings },
  ]

  // Removed scroll effect for solid header

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="PADMAAJA RASOOI PVT. LTD."
                width={50}
                height={50}
                className="object-contain"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-800 transition-colors duration-300 leading-tight">
                  PADMAAJA RASOOI
                </span>
                <span className="text-xs uppercase text-slate-600 transition-colors duration-300 leading-tight">
                  &quot;The careful choice&quot;
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Regular Nav Items */}
            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}

            {/* Mega Menu Items */}
            {Object.entries(megaMenus).map(([key, menu]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center space-x-1 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-200 ${
                    activeDropdown === key ? 'text-emerald-600' : ''
                  }`}
                >
                  <span>{menu.title}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === key ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Mega Menu Dropdown */}
                <MegaMenu
                  menuKey={key}
                  menu={menu}
                  isActive={activeDropdown === key}
                  onClose={() => setActiveDropdown(null)}
                />
              </div>
            ))}

            <div className="flex items-center space-x-4">
              <CartSidebar />

              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                        <AvatarFallback>
                          {session.user.name?.[0] || session.user.email?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session.user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    {session.user.role === 'ADMIN' && adminNavigation.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} className="flex items-center">
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    
                    {(session.user.role === 'MEMBER' || session.user.role === 'ADMIN') && 
                      memberNavigation.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                          <Link href={item.href} className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" asChild>
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors duration-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t bg-white border-slate-200 shadow-lg"
          >
            <div className="px-4 py-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Regular Nav Items */}
              {navItems.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-base font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Mega Menu Items */}
              {Object.entries(megaMenus).map(([key, menu]) => (
                <div key={key} className="space-y-3">
                  <h3 className="font-semibold text-slate-800 text-base sm:text-lg">{menu.title}</h3>
                  
                  {menu.type === 'categories' ? (
                    // Products with Categories - Mobile Responsive
                    <div className="space-y-4">
                      {menu.categories?.map((category: MenuCategory, idx: number) => {
                        const IconComponent = category.icon
                        return (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center space-x-2 text-emerald-600 font-medium text-sm sm:text-base">
                              <IconComponent className="w-4 h-4 flex-shrink-0" />
                              <span>{category.name}</span>
                            </div>
                            <div className="pl-6 space-y-1">
                              {category.items.map((item: MenuItem, itemIdx: number) => (
                                <Link
                                  key={itemIdx}
                                  href={item.href}
                                  className="block text-sm text-slate-600 hover:text-emerald-600 transition-colors duration-200 py-1"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-xs text-slate-500">{item.description}</div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              ))}

              {/* Mobile CTA */}
              <Link href="/contact#quote" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl px-4 py-3 mt-6 font-medium">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
