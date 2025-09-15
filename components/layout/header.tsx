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
import CartSidebar from '@/components/shop/CartSidebar'
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
    // { name: 'Home', href: '/' },
    { name: 'Recipes', href: '/recipes' },
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
          ]
        },
        {
          name: 'Business',
          icon: Settings,
          items: [
            { name: 'Partnership', href: '/partnership', description: 'Join our network' },
            { name: 'Wholesaler', href: '/wholesaler', description: 'Wholesaler program' },
            { name: 'Sustainability', href: '/sustainability', description: 'Environmental commitment' },
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

  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center z-10">
            <div className="flex items-center space-x-3">
              <Image
                src="/kashmina-logo.png"
                alt="PADMAAJA RASOOI PVT. LTD."
                width={150}
                height={150}
                className="object-contain"
              />
              {/* <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-800 transition-colors duration-300 leading-tight">
                  KASHMINA RICE
                </span>
                <span className="text-xs uppercase text-slate-600 transition-colors duration-300 leading-tight">
                  &quot;Premium Rice&quot;
                </span>
              </div> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Regular Nav Items */}
            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-200"
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
                  className={`flex items-center space-x-1 text-base font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-200 ${
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
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
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
                  <Button variant="ghost" className="h-10 px-4 py-2 text-base font-medium" asChild>
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                  <Button className="h-10 px-4 py-2 text-base font-medium" asChild>
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={handleMobileMenuClick}
              className="p-4 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors duration-200 touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
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
            className="lg:hidden border-t bg-white border-slate-200 shadow-lg relative z-50"
          >
            <div className="px-4 py-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Regular Nav Items */}
              {navItems.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="mobile-nav-item block text-lg font-medium text-slate-700 hover:text-emerald-600 transition-colors duration-200 py-3 px-2 rounded-lg hover:bg-slate-50 touch-manipulation"
                  onClick={handleMobileLinkClick}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Mega Menu Items */}
              {Object.entries(megaMenus).map(([key, menu]) => (
                <div key={key} className="space-y-3">
                  <h3 className="font-semibold text-slate-800 text-lg sm:text-xl">{menu.title}</h3>
                  
                  {menu.type === 'categories' ? (
                    // Products with Categories - Mobile Responsive
                    <div className="space-y-4">
                      {menu.categories?.map((category: MenuCategory, idx: number) => {
                        const IconComponent = category.icon
                        return (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center space-x-2 text-emerald-600 font-medium text-base sm:text-lg">
                              <IconComponent className="w-4 h-4 flex-shrink-0" />
                              <span>{category.name}</span>
                            </div>
                            <div className="pl-6 space-y-1">
                              {category.items.map((item: MenuItem, itemIdx: number) => (
                                <Link
                                  key={itemIdx}
                                  href={item.href}
                                  className="mobile-nav-item block text-base text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-colors duration-200 py-2 px-2 rounded-md touch-manipulation"
                                  onClick={handleMobileLinkClick}
                                >
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-xs text-slate-500 mt-0.5">{item.description}</div>
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
              <Link href="/contact#quote" onClick={handleMobileLinkClick}>
                <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl px-6 py-4 mt-6 font-medium text-lg touch-manipulation">
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
