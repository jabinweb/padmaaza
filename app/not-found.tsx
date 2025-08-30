'use client'

import { m, motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Search, ArrowLeft, Package, ShoppingBag, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import MobileTabBar from '@/components/layout/MobileTabBar'

// Predefined positions to avoid hydration mismatch
const PARTICLE_POSITIONS = [
  { left: 25, top: 30, duration: 3.2, delay: 0 },
  { left: 70, top: 20, duration: 4.1, delay: 0.5 },
  { left: 15, top: 60, duration: 3.8, delay: 1.0 },
  { left: 80, top: 70, duration: 4.5, delay: 1.5 },
  { left: 40, top: 15, duration: 3.5, delay: 0.3 },
  { left: 60, top: 80, duration: 4.2, delay: 0.8 },
  { left: 30, top: 45, duration: 3.9, delay: 1.2 },
  { left: 85, top: 40, duration: 4.0, delay: 0.2 }
]

export default function NotFound() {
  const quickLinks = [
    {
      title: 'Homepage',
      description: 'Return to our main page',
      href: '/',
      icon: Home,
      color: 'bg-emerald-500'
    },
    {
      title: 'Products',
      description: 'Browse our product catalog',
      href: '/products',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'About Us',
      description: 'Learn about our company',
      href: '/about',
      icon: ShoppingBag,
      color: 'bg-purple-500'
    },
    {
      title: 'Contact',
      description: 'Get in touch with us',
      href: '/contact',
      icon: Phone,
      color: 'bg-orange-500'
    }
  ]

  return (
    <>
            <Header />

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated 404 Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <div className="relative mx-auto w-72 h-48 sm:w-96 sm:h-64 mb-6 sm:mb-8">
            {/* Rice grains scattered illustration */}
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                404
              </div>
            </motion.div>
            
            {/* Floating particles */}
            {PARTICLE_POSITIONS.map((position, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-3 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"
                style={{
                  left: `${position.left}%`,
                  top: `${position.top}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: position.duration,
                  repeat: Infinity,
                  delay: position.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex justify-center items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-red-100 rounded-xl sm:rounded-2xl">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <Badge variant="outline" className="text-red-700 border-red-200 text-xs sm:text-sm">
              Page Not Found
            </Badge>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3 sm:mb-4 px-2">
            Oops! Page Not Found
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed px-4">
            The page you&apos;re looking for seems to have gone missing, just like rice grains that fell off the bag! 
            Don&apos;t worry, we&apos;ll help you find what you need.
          </p>

          <div className="flex justify-center items-center space-x-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 px-4">
            <span>Error Code:</span>
            <Badge variant="secondary" className="font-mono text-xs">
              404
            </Badge>
            <span>•</span>
            <span>Resource Not Found</span>
          </div>
        </motion.div>

        {/* Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4"
        >
          <Button asChild size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 w-full sm:w-auto">
            <Link href="/">
              <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Go Home
            </Link>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="border-slate-300 w-full sm:w-auto">
            <Link href="javascript:history.back()">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Go Back
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="border-slate-300 w-full sm:w-auto">
            <Link href="/products">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Browse Products
            </Link>
          </Button>
        </motion.div>

        {/* Quick Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8 sm:mb-12 px-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">
            Or explore these popular sections:
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <Link href={link.href}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 shadow-lg cursor-pointer">
                      <CardContent className="p-4 sm:p-6 text-center">
                        <div className="mb-3 sm:mb-4">
                          <div className={`inline-flex p-3 sm:p-4 ${link.color} rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                        </div>
                        
                        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                          {link.title}
                        </h3>
                        
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {link.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-emerald-100 mx-4"
        >
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4">
            Still need help?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 leading-relaxed">
            If you were looking for something specific, our team is here to help you find it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button asChild variant="outline" className="border-emerald-200 hover:bg-emerald-50 w-full sm:w-auto">
              <Link href="/contact">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="border-blue-200 hover:bg-blue-50 w-full sm:w-auto">
              <Link href="tel:+919876543210">
                <Phone className="w-4 h-4 mr-2" />
                Call: +91 98765 43210
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
    <MobileTabBar />
    <Footer />
</>
  )
}
