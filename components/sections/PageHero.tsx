'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface HeroAction {
  label: string
  icon?: LucideIcon
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
}

interface HeroFeature {
  icon: LucideIcon
  label: string
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'emerald'
}

interface PageHeroProps {
  // Basic content
  title: string
  subtitle?: string
  description: string
  
  // Badge configuration
  badge?: {
    text: string
    variant?: 'default' | 'outline'
    className?: string
  }
  
  // Icon configuration
  icon?: {
    component: LucideIcon
    className?: string
    bgColor?: string
  }
  
  // Breadcrumb navigation
  breadcrumbs?: BreadcrumbItem[]
  
  // Features/highlights (small cards below description)
  features?: HeroFeature[]
  
  // Action buttons
  actions?: HeroAction[]
  
  // Styling customization
  backgroundGradient?: string
  titleGradient?: string
  className?: string
  
  // Content positioning
  alignment?: 'center' | 'left' | 'auto' // auto = smart defaults based on content
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '7xl'
}

const getIconColorClasses = (color: HeroFeature['color'] = 'blue') => {
  const colorMap = {
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    orange: 'text-orange-500',
    emerald: 'text-emerald-500'
  }
  return colorMap[color]
}

const getMaxWidthClass = (maxWidth: PageHeroProps['maxWidth'] = '5xl') => {
  const maxWidthMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '7xl': 'max-w-7xl'
  }
  return maxWidthMap[maxWidth]
}

export default function PageHero({
  title,
  subtitle,
  description,
  badge,
  icon,
  breadcrumbs,
  features,
  actions,
  backgroundGradient = 'from-blue-600/10 to-emerald-600/10',
  titleGradient = 'from-blue-600 to-emerald-600',
  className = '',
  alignment = 'auto',
  maxWidth = '4xl'
}: PageHeroProps) {
  const maxWidthClass = getMaxWidthClass(maxWidth)
  
  // Smart alignment logic - Modern approach (2024-2025)
  // Center: Marketing/brand pages, landing pages, promotional content
  // Left: Content-heavy pages, documentation, application interfaces
  const getAlignment = () => {
    if (alignment !== 'auto') return alignment
    
    // Auto-detect best alignment based on content
    const hasActions = actions && actions.length > 0
    const hasFeatures = features && features.length > 0
    const hasIcon = icon !== undefined
    const hasBadge = badge !== undefined
    
    // Marketing/promotional content -> center
    if (hasActions || hasFeatures || hasIcon || hasBadge) {
      return 'center'
    }
    
    // Long description -> left (better readability)
    if (description.length > 120) {
      return 'left'
    }
    
    // Default to center for brand/marketing pages
    return 'center'
  }
  
  const isCenter = getAlignment() === 'center'
  
  return (
    <section className="relative pt-28 pb-16 overflow-hidden min-h-[30vh] flex items-center">
      {/* Background Gradient - Standardized */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-emerald-600/10" />
      
      {/* Breadcrumb Navigation - Standardized positioning and styling */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="absolute top-20 left-0 right-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <div className="flex items-center space-x-2 text-sm">
                {breadcrumbs.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {item.href ? (
                      <Link 
                        href={item.href} 
                        className="text-slate-300 hover:text-white transition-colors font-medium"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-white font-semibold">{item.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}
      
      {/* Main Content - Standardized container and spacing */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={isCenter ? 'text-center' : 'text-left'}
        >
          {/* Badge with Icon - Standardized styling */}
          {badge && (
            <div className={`flex ${isCenter ? 'justify-center' : 'justify-start'} mb-6`}>
              <Badge 
                variant="outline"
                className="text-blue-700 border-blue-200 bg-blue-50/50 px-4 py-2 text-sm font-medium rounded-full flex items-center space-x-2"
              >
                {icon && (
                  <div className={`p-1.5 rounded-lg ${icon.bgColor || 'bg-blue-600'} ${icon.className || ''}`}>
                    <icon.component className="w-4 h-4 text-white" />
                  </div>
                )}
                <span>{badge.text}</span>
              </Badge>
            </div>
          )}

          {/* Icon (only when no badge) */}
          {icon && !badge && (
            <div className={`flex ${isCenter ? 'justify-center' : 'justify-start'} mb-6`}>
              <div className={`p-3 rounded-2xl ${icon.bgColor || 'bg-blue-600'} ${icon.className || ''}`}>
                <icon.component className="w-8 h-8 text-white" />
              </div>
            </div>
          )}
          
          {/* Title - Standardized typography scale */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            {subtitle ? (
              <>
                {subtitle}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  {title}
                </span>
              </>
            ) : title.includes(' ') ? (
              <>
                {title.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  {title.split(' ').slice(-1)}
                </span>
              </>
            ) : (
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {title}
              </span>
            )}
          </h1>
          
          {/* Description - Standardized typography */}
          <p className={`text-lg text-slate-600 ${maxWidthClass} ${isCenter ? 'mx-auto' : ''} ${
            (features && features.length > 0) || (actions && actions.length > 0) ? 'mb-8' : 'mb-0'
          } leading-relaxed`}>
            {description}
          </p>

          {/* Features */}
          {features && features.length > 0 && (
            <div className={`flex flex-wrap ${isCenter ? 'justify-center' : 'justify-start'} gap-4 ${
              (actions && actions.length > 0) ? 'mb-8' : 'mb-0'
            }`}>
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <feature.icon className={`w-5 h-5 ${getIconColorClasses(feature.color)}`} />
                  <span className="text-sm font-medium text-slate-700">{feature.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons - Standardized styling */}
          {actions && actions.length > 0 && (
            <div className={`flex flex-col sm:flex-row gap-4 ${isCenter ? 'justify-center' : 'justify-start'}`}>
              {actions.map((action, index) => {
                const ButtonContent = (
                  <>
                    {action.icon && <action.icon className="w-5 h-5 mr-2" />}
                    {action.label}
                  </>
                )

                const buttonClass = action.variant === 'secondary' 
                  ? "border-slate-300" 
                  : "bg-blue-600 text-white hover:bg-blue-700"

                if (action.href) {
                  return (
                    <Link key={index} href={action.href}>
                      <Button 
                        size="lg" 
                        variant={action.variant === 'secondary' ? 'outline' : 'default'}
                        className={`${buttonClass} ${action.className || ''}`}
                      >
                        {ButtonContent}
                      </Button>
                    </Link>
                  )
                }

                return (
                  <Button 
                    key={index}
                    size="lg" 
                    variant={action.variant === 'secondary' ? 'outline' : 'default'}
                    className={`${buttonClass} ${action.className || ''}`}
                    onClick={action.onClick}
                  >
                    {ButtonContent}
                  </Button>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
