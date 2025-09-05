'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Wheat, Leaf, ShoppingBag, Building2, Settings, LucideIcon } from 'lucide-react'

interface MegaMenuItem {
  name: string
  href: string
  description: string
}

interface MegaMenuCategory {
  name: string
  id?: string
  icon: LucideIcon
  items: MegaMenuItem[]
}

interface MegaMenuData {
  title: string
  type: 'categories'
  categories: MegaMenuCategory[]
}

interface MegaMenuProps {
  menuKey: string
  menu: MegaMenuData
  isActive: boolean
  onClose: () => void
}

export default function MegaMenu({ menuKey, menu, isActive, onClose }: MegaMenuProps) {
  const [latestProducts, setLatestProducts] = useState<MegaMenuItem[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)

  // Fetch 4 latest products for Products menu on component mount
  useEffect(() => {
    if (menuKey === 'products') {
      const fetchLatestProducts = async () => {
        try {
          setIsLoadingProducts(true)
          
          // Fetch latest 4 products directly
          const productsResponse = await fetch('/api/products?limit=4&sort=latest')
          const productsData = await productsResponse.json()
          
          if (productsData && productsData.products) {
            const products = productsData.products.map((product: any) => ({
              name: product.name,
              href: `/products/${product.slug}`,
              description: product.description?.substring(0, 50) + '...' || 'Premium quality product'
            }))
            
            setLatestProducts(products)
          }
        } catch (error) {
          console.error('Error fetching latest products:', error)
          // Fallback to static data if API fails
          setLatestProducts([
            { name: 'Premium Basmati Rice', href: '/products', description: 'Aromatic long-grain rice' },
            { name: 'Kashmina Rice', href: '/products', description: 'Premium quality rice' },
            { name: 'Non-Basmati Rice', href: '/products', description: 'Traditional varieties' },
            { name: 'Multigrain Flour', href: '/products', description: 'Nutritious blend' },
          ])
        } finally {
          setIsLoadingProducts(false)
        }
      }

      fetchLatestProducts()
    } else {
      setIsLoadingProducts(false)
    }
  }, [menuKey]) // Only depend on menuKey, not isActive

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-200/50 backdrop-blur-lg overflow-hidden z-50 right-0"
          style={{ 
            width: 'auto',
            minWidth: menuKey === 'products' ? '320px' : '280px',
            maxWidth: '90vw'
          }}
        >
          <div className="p-3 sm:p-4">
            {menuKey === 'products' ? (
              // Latest Products - Simple List
              isLoadingProducts ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 pb-1.5 border-b border-slate-100">
                    <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-slate-200 rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="space-y-1">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="p-2">
                        <div className="h-3 bg-slate-200 rounded w-full mb-1 animate-pulse"></div>
                        <div className="h-2 bg-slate-100 rounded w-3/4 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 pb-1.5 border-b border-slate-100">
                    <ShoppingBag className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <h3 className="font-semibold text-slate-800 text-sm">Latest Products</h3>
                  </div>
                  <div className="space-y-1">
                    {latestProducts.map((product, idx) => (
                      <Link
                        key={idx}
                        href={product.href}
                        className="block p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 group"
                        onClick={onClose}
                      >
                        <div className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors duration-200 text-sm truncate">
                          {product.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {product.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            ) : (
              // Other menu types - Categories
              menu.type === 'categories' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {menu.categories?.map((category, idx) => {
                    const IconComponent = category.icon
                    return (
                      <div key={idx} className="space-y-2 sm:space-y-3">
                        <div className="flex items-center space-x-2 pb-1.5 border-b border-slate-100">
                          <IconComponent className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <h3 className="font-semibold text-slate-800 text-sm truncate">{category.name}</h3>
                        </div>
                        <div className="space-y-1">
                          {category.items?.map((item, itemIdx) => (
                            <Link
                              key={itemIdx}
                              href={item.href}
                              className="block p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 group"
                              onClick={onClose}
                            >
                              <div className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors duration-200 text-sm truncate">
                                {item.name}
                              </div>
                              <div className="text-xs text-slate-500 truncate">
                                {item.description}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            )}
            
            {/* View All Products Button - Only for Products Menu */}
            {menuKey === 'products' && !isLoadingProducts && (
              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  href="/products"
                  className="block w-full p-3 rounded-lg bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 group text-center font-medium"
                  onClick={onClose}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span>View All Products</span>
                  </div>
                </Link>
              </div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
