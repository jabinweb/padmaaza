'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Crown, Award, Star, Users, TrendingUp, ShoppingBag, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import PageHero from '@/components/PageHero'
import PartnershipApplicationForm from '@/components/PartnershipApplicationForm'

interface TierAvailability {
  name: string
  limit: number
  currentCount: number
  remaining: number
  available: boolean
  percentageFull: number
}

export default function PartnerPage() {
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState('Silver')
  const [tierAvailability, setTierAvailability] = useState<TierAvailability[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch tier availability on component mount
  useEffect(() => {
    async function fetchTierAvailability() {
      try {
        const response = await fetch('/api/partnership/tiers')
        const data = await response.json()
        if (data.success) {
          setTierAvailability(data.tiers)
        }
      } catch (error) {
        console.error('Failed to fetch tier availability:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTierAvailability()
  }, [])

  const partnershipTiers = [
    {
      name: 'Diamond',
      icon: Crown,
      maxUsers: 3000,
      color: '#3B82F6', // Blue for premium
      bgColor: '#EFF6FF',
      features: [
        'Maximum 3,000 customers',
        'Highest commission rates',
        'Premium marketing materials',
        'Direct company support',
        'Exclusive product launches',
        'Priority customer service',
        'Advanced analytics dashboard',
        'Custom branding options'
      ],
      benefits: 'First come, first served - No upgrades available'
    },
    {
      name: 'Gold',
      icon: Award,
      maxUsers: 1500,
      color: '#F59E0B', // Gold
      bgColor: '#FFFBEB',
      features: [
        'Maximum 1,500 customers',
        'High commission rates',
        'Standard marketing materials',
        'Regular company support',
        'Early product access',
        'Priority support queue',
        'Standard analytics',
        'Co-branded materials'
      ],
      benefits: 'Perfect for growing businesses'
    },
    {
      name: 'Silver',
      icon: Star,
      maxUsers: 500,
      color: '#6B7280', // Silver gray
      bgColor: '#F9FAFB',
      features: [
        'Maximum 500 customers',
        'Standard commission rates',
        'Basic marketing materials',
        'Email support',
        'Regular product updates',
        'Standard support',
        'Basic analytics',
        'Standard materials'
      ],
      benefits: 'Great starting point for new partners'
    }
  ]

  const whyPartner = [
    {
      icon: TrendingUp,
      title: 'Growing Market',
      description: 'Be part of India&apos;s fastest-growing authentic food market with increasing demand for traditional products.'
    },
    {
      icon: ShoppingBag,
      title: 'Quality Products',
      description: 'Market premium quality, FSSAI-certified traditional food products that customers trust and love.'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Get comprehensive support, training, and marketing materials to help you succeed.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Marketing Partner"
        subtitle="Be Our"
        description="Join Padmaaja Rasooi's exclusive marketing partnership program and help us bring authentic Indian flavors to kitchens across the nation."
        badge={{
          text: "Partnership Opportunity"
        }}
        actions={[
          {
            label: "Join Us Today",
            icon: ArrowRight,
            variant: "primary"
          }
        ]}
        backgroundGradient="from-slate-900/90 via-emerald-900/80 to-slate-800/85"
        titleGradient="from-orange-500 to-orange-400"
        className="bg-gradient-to-r from-emerald-600/20 to-orange-500/20"
      />

      {/* Partnership Tiers */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Partnership Level
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              First come, first served basis - No upgrades available. Secure your preferred tier today!
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              <CheckCircle className="h-4 w-4 mr-2" />
              Limited Spots Available - No Tier Upgrades
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTiers.map((tier, index) => {
              const availability = tierAvailability.find(t => t.name === tier.name)
              const isAvailable = availability?.available ?? true
              const remaining = availability?.remaining ?? 0
              
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={index === 0 ? 'md:scale-105' : ''}
                >
                  <Card className={`h-full border-2 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                    index === 0 ? 'border-blue-300' : 'border-gray-200'
                  } ${!isAvailable ? 'opacity-75' : ''}`}>
                    <CardHeader className="text-center pb-4" style={{backgroundColor: tier.bgColor}}>
                      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: `${tier.color}20`}}>
                        <tier.icon className="h-10 w-10" style={{color: tier.color}} />
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                        {tier.name} Partner
                      </CardTitle>
                      <div className="text-3xl font-bold mb-2" style={{color: tier.color}}>
                        {tier.maxUsers.toLocaleString()} Users
                      </div>
                      
                      {/* Availability Status */}
                      {!isLoading && availability && (
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          isAvailable 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {isAvailable ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {remaining} spots left
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-3 w-3 mr-1" />
                              FULL
                            </>
                          )}
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-600 mt-2">
                        {tier.benefits}
                      </p>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-3 mb-6">
                        {tier.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className="w-full text-white font-semibold"
                        style={{backgroundColor: isAvailable ? tier.color : '#9CA3AF'}}
                        disabled={!isAvailable}
                        onClick={() => {
                          if (isAvailable) {
                            setSelectedTier(tier.name)
                            setIsApplicationFormOpen(true)
                          }
                        }}
                      >
                        {isAvailable ? `Apply for ${tier.name}` : 'Tier Full'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Partner With Padmaaja Rasooi?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a trusted brand that&apos;s revolutionizing the traditional food market in India.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyPartner.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: '#F5873B20'}}>
                      <reason.icon className="h-8 w-8" style={{color: '#F5873B'}} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Partnership Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to become a Padmaaja Rasooi marketing partner.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Choose Tier', description: 'Select your preferred partnership tier based on customer capacity' },
              { step: '2', title: 'Apply', description: 'Submit your application with required documentation' },
              { step: '3', title: 'Get Approved', description: 'Our team reviews and approves qualified partners' },
              { step: '4', title: 'Start Marketing', description: 'Begin promoting our authentic food products to your network' }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#F5873B', color: 'white'}}>
                  <span className="text-xl font-bold">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your Partnership Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Don&apos;t miss this opportunity to be part of India&apos;s authentic food revolution. 
              Limited spots available on first-come, first-served basis.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-lg px-8 py-4"
                style={{backgroundColor: '#F5873B', color: 'white'}}
                onClick={() => {
                  setSelectedTier('Silver')
                  setIsApplicationFormOpen(true)
                }}
              >
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 py-4 border-gray-300"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Application Form */}
      <PartnershipApplicationForm
        isOpen={isApplicationFormOpen}
        onClose={() => setIsApplicationFormOpen(false)}
        selectedTier={selectedTier}
      />
    </div>
  )
}
