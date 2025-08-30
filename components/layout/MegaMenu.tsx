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
  const [dynamicCategories, setDynamicCategories] = useState<MegaMenuCategory[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  // Fetch latest categories and products for Products menu on component mount
  useEffect(() => {
    if (menuKey === 'products') {
      const fetchLatestCategoriesAndProducts = async () => {
        try {
          setIsLoadingCategories(true)
          
          // Fetch all categories first
          const categoriesResponse = await fetch('/api/categories')
          const categoriesData = await categoriesResponse.json()
          
          if (categoriesData && categoriesData.length > 0) {
            // Take the first 2 categories
            const latestCategories = categoriesData.slice(0, 2)
            
            // Fetch latest products for each category
            const categoriesWithProducts = await Promise.all(
              latestCategories.map(async (category: any) => {
                const productsResponse = await fetch(`/api/products?categoryId=${category.id}&limit=4`)
                const productsData = await productsResponse.json()
                
                return {
                  name: category.name,
                  id: category.id,
                  icon: category.name.toLowerCase().includes('spice') || category.name.toLowerCase().includes('pulse') ? Leaf : 
                        category.name.toLowerCase().includes('rice') || category.name.toLowerCase().includes('grain') ? Wheat : ShoppingBag,
                  items: productsData.products?.slice(0, 4).map((product: any) => ({
                    name: product.name,
                    href: `/products/${product.slug}`,
                    description: product.description?.substring(0, 50) + '...' || 'Premium quality product'
                  })) || []
                }
              })
            )
            
            setDynamicCategories(categoriesWithProducts)
          }
        } catch (error) {
          console.error('Error fetching categories and products:', error)
          // Fallback to static data if API fails
          setDynamicCategories([
            {
              name: 'Rice & Grains',
              icon: Wheat,
              items: [
                { name: 'Premium Basmati Rice', href: '/products', description: 'Aromatic long-grain rice' },
                { name: 'Non-Basmati Rice', href: '/products', description: 'Traditional varieties' },
                { name: 'Multigrain Flour', href: '/products', description: 'Nutritious blend' },
                { name: 'Wheat Flour', href: '/products', description: 'Premium quality flour' },
              ]
            },
            {
              name: 'Spices & Pulses',
              icon: Leaf,
              items: [
                { name: 'Turmeric Powder', href: '/products', description: 'Pure and aromatic' },
                { name: 'Red Chili Powder', href: '/products', description: 'Spicy and flavorful' },
                { name: 'Toor Dal', href: '/products', description: 'Yellow lentils' },
                { name: 'All Spices', href: '/products', description: 'View all spices' },
              ]
            }
          ])
        } finally {
          setIsLoadingCategories(false)
        }
      }

      fetchLatestCategoriesAndProducts()
    } else {
      setIsLoadingCategories(false)
    }
  }, [menuKey]) // Only depend on menuKey, not isActive

  const categoriesToShow = menuKey === 'products' ? dynamicCategories : menu.categories

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
            minWidth: menu.type === 'categories' ? '320px' : '280px',
            maxWidth: '90vw'
          }}
        >
          <div className="p-3 sm:p-4">
            {menu.type === 'categories' ? (
              // Categories Mega Menu - Compact Responsive Grid
              isLoadingCategories && menuKey === 'products' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Loading skeleton */}
                  {[1, 2].map((skeleton) => (
                    <div key={skeleton} className="space-y-2 animate-pulse">
                      <div className="flex items-center space-x-2 pb-1.5 border-b border-slate-100">
                        <div className="w-4 h-4 bg-slate-200 rounded"></div>
                        <div className="h-4 bg-slate-200 rounded w-20"></div>
                      </div>
                      <div className="space-y-1">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="p-2">
                            <div className="h-3 bg-slate-200 rounded w-full mb-1"></div>
                            <div className="h-2 bg-slate-100 rounded w-3/4"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {categoriesToShow?.map((category, idx) => {
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
            ) : null}
            
            {/* View All Products Button - Only for Products Menu */}
            {menuKey === 'products' && !isLoadingCategories && (
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
