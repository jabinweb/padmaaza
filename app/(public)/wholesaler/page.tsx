'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Package, 
  Send, 
  CheckCircle, 
  ShoppingCart, 
  Phone, 
  Handshake, 
  CreditCard, 
  Truck, 
  Gift,
  TrendingUp,
  Shield,
  Store,
  UserCheck,
  FileText,
  Star
} from 'lucide-react'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

export default function WholesalerPage() {
  const wholesalerProcess = [
    {
      id: 1,
      icon: UserCheck,
      title: "Distributor Registration",
      description: "Join our network as an authorized distributor",
      details: ["Complete business verification", "Territory assignment", "Documentation setup", "Account activation"],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: Phone,
      title: "Receive Initial Call",
      description: "Our team contacts you for onboarding",
      details: ["Partnership discussion", "Product catalog overview", "Pricing structure", "Support process"],
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      icon: Package,
      title: "Sample Products Sent",
      description: "Free quality samples delivered to your location",
      details: ["Premium rice samples", "Quality testing", "Customer feedback", "Market evaluation"],
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      icon: CheckCircle,
      title: "Quality Approval",
      description: "Sample approval and order confirmation",
      details: ["Quality validation", "Product selection", "Order specifications", "Quantity confirmation"],
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      icon: ShoppingCart,
      title: "Place Bulk Orders",
      description: "Order products directly from buyers",
      details: ["Direct buyer orders", "Bulk quantities", "Competitive pricing", "Fast processing"],
      color: "from-red-500 to-red-600"
    },
    {
      id: 6,
      icon: Phone,
      title: "Call Buyers at Corporate Office",
      description: "Connect buyers with our manufacturing unit",
      details: ["Direct buyer contact", "Corporate office coordination", "Manufacturing visit", "Quality assurance"],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      id: 7,
      icon: Gift,
      title: "Welcome Demo",
      description: "Comprehensive product demonstration and agreement",
      details: ["Product demonstration", "Partnership agreement", "Welcome package", "Support materials"],
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 8,
      icon: FileText,
      title: "Formal Agreement",
      description: "Sign official partnership agreement",
      details: ["Contract terms", "Pricing agreement", "Territory rights", "Support commitments"],
      color: "from-teal-500 to-teal-600"
    },
    {
      id: 9,
      icon: CreditCard,
      title: "Payment Terms",
      description: "100% advance payment with refundable deposit",
      details: ["100% advance payment", "Refundable security", "Flexible terms", "Secure transactions"],
      color: "from-cyan-500 to-cyan-600"
    },
    {
      id: 10,
      icon: Truck,
      title: "Product Dispatch",
      description: "100% quality products delivered",
      details: ["Quality assurance", "Timely dispatch", "Secure packaging", "Tracking support"],
      color: "from-emerald-500 to-emerald-600"
    },
    {
      id: 11,
      icon: TrendingUp,
      title: "Low Cost Forever",
      description: "Guaranteed lowest wholesale prices",
      details: ["Competitive pricing", "Volume discounts", "Long-term benefits", "Price protection"],
      color: "from-violet-500 to-violet-600"
    },
    {
      id: 12,
      icon: Shield,
      title: "Guaranteed Products",
      description: "100% quality assurance and satisfaction guarantee",
      details: ["Quality guarantee", "Product authenticity", "Customer satisfaction", "Support assurance"],
      color: "from-rose-500 to-rose-600"
    }
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "High Profit Margins",
      description: "Earn substantial margins with our competitive wholesale pricing"
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "100% quality assurance on all products with FSSAI certification"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Personal account manager for all your business needs"
    },
    {
      icon: Truck,
      title: "Reliable Supply",
      description: "Consistent product availability and timely deliveries"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="Wholesaler Partnership Program"
        description="Join India's leading Basmati rice manufacturer as an authorized distributor. Experience guaranteed profits with our comprehensive wholesaler program."
        backgroundGradient="from-orange-600 to-orange-700"
        badge={{
          text: "Partnership Program",
          variant: "outline"
        }}
        actions={[
          {
            label: "Start Partnership",
            href: "/contact",
            variant: "primary"
          },
          {
            label: "Call Now: +91-9454906009",
            href: "tel:+91-9454906009",
            variant: "secondary"
          }
        ]}
      />

      {/* Partnership Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Why Partner With Padmaaja?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Join our network of successful distributors and enjoy guaranteed profits with India's premium Basmati rice brand
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group-hover:-translate-y-2">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-300">
                      <benefit.icon className="h-8 w-8 text-orange-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesaler Process Flow */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Wholesaler Partnership Process
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Our streamlined 12-step process ensures a smooth onboarding and profitable partnership
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wholesalerProcess.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group-hover:-translate-y-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center`}>
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="outline" className="text-xs font-semibold">
                          Step {step.id}
                        </Badge>
                        <CardTitle className="text-lg font-bold text-gray-900 mt-1">
                          {step.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-4">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment & Returns */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Investment & Returns
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Transparent pricing with guaranteed returns and low-cost forever commitment
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full bg-white shadow-xl border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Advance Payment</h3>
                  <p className="text-gray-600 mb-4">
                    Secure your orders with full advance payment and enjoy priority processing
                  </p>
                  <Badge className="bg-blue-100 text-blue-800">Refundable Deposit</Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full bg-white shadow-xl border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Low Cost Forever</h3>
                  <p className="text-gray-600 mb-4">
                    Guaranteed lowest wholesale prices with no hidden charges or price increases
                  </p>
                  <Badge className="bg-green-100 text-green-800">Price Protection</Badge>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="h-full bg-white shadow-xl border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Guaranteed</h3>
                  <p className="text-gray-600 mb-4">
                    Complete quality assurance and satisfaction guarantee on all products
                  </p>
                  <Badge className="bg-purple-100 text-purple-800">Quality Assured</Badge>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Ready to Start Your Wholesaler Journey?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto"
          >
            Join hundreds of successful distributors across India. Start your profitable partnership with Padmaaja today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              asChild
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
            >
              <Link href="/contact">Start Partnership</Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-4 text-lg"
            >
              <Link href="tel:+91-9454906009">Call Now: +91-9454906009</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
