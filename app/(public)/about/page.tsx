'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Users, Award, Target, Globe, Leaf, Shield, Heart, Factory } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AboutPage() {
  const features = [
    {
      icon: Leaf,
      title: 'Natural Ingredients',
      description: 'We source the finest natural ingredients to create authentic, traditional flavors in every product.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'FSSAI certified facilities with strict quality control measures ensuring food safety and excellence.'
    },
    {
      icon: Heart,
      title: 'Traditional Recipes',
      description: 'Time-tested family recipes passed down through generations, now available for your kitchen.'
    },
    {
      icon: Factory,
      title: 'Modern Processing',
      description: 'State-of-the-art food processing technology maintaining nutritional value and authentic taste.'
    }
  ]

  const team = [
    {
      name: 'Rajeev Sharma',
      role: 'Founder & CEO',
      image: '/images/team/rajeev.jpg',
      description: 'With over 20 years in food processing industry, Rajeev founded Padmaaja Rasooi to bring authentic Indian flavors to every home.',
      email: 'srajeev7053@gmail.com'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Quality Control',
      image: '/images/team/priya.jpg',
      description: 'Food technologist ensuring every product meets the highest quality standards and safety regulations.'
    },
    {
      name: 'Amit Kumar',
      role: 'Production Manager',
      image: '/images/team/amit.jpg',
      description: 'Operations expert managing our production facilities to deliver consistent quality and timely delivery.'
    }
  ]

  const milestones = [
    { year: '2018', title: 'Company Founded', description: 'Started with a vision to preserve traditional Indian food culture and provide authentic products' },
    { year: '2019', title: 'FSSAI Certification', description: 'Obtained food safety certification and established quality standards for all products' },
    { year: '2020', title: 'Product Range Expansion', description: 'Expanded from flour to rice, spices, and other traditional food products' },
    { year: '2021', title: 'Regional Growth', description: 'Expanded operations across Uttar Pradesh and neighboring states with increased distribution' },
    { year: '2022', title: 'Quality Excellence', description: 'Achieved ISO certifications and implemented advanced quality control systems' },
    { year: '2023', title: 'Market Leadership', description: 'Became a trusted name in authentic food products with growing customer base' },
    { year: '2024', title: 'Innovation Drive', description: 'Introduced new product lines and sustainable packaging solutions' },
    { year: '2025', title: 'Digital Transformation', description: 'Launched e-commerce platform and expanded online presence for better customer reach' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-emerald-900/80 to-slate-800/85 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-orange-500/20" style={{background: 'linear-gradient(to right, rgba(16, 185, 129, 0.2), rgba(245, 135, 59, 0.2))'}}></div>
        </div>
        
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 text-lg px-6 py-2" style={{backgroundColor: '#F5873B', color: 'white'}}>
              Authentic • Traditional • Quality
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              About 
              <span className="block" style={{color: '#F5873B'}}>Padmaaja Rasooi</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-slate-200">
              Preserving the authentic taste of traditional Indian cuisine through premium food products, 
              crafted with love and delivered with care to kitchens across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full border-0 shadow-xl">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#F5873B20'}}>
                    <Target className="h-8 w-8" style={{color: '#F5873B'}} />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-600 leading-relaxed text-center">
                    To preserve and share the authentic flavors of traditional Indian cuisine by creating 
                    premium food products that bring families together around the dining table. We are 
                    committed to maintaining the highest quality standards while making traditional 
                    recipes accessible to modern kitchens across India and beyond.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full border-0 shadow-xl">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-emerald-100">
                    <Globe className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-gray-900">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-600 leading-relaxed text-center">
                    To become India&apos;s most trusted name in traditional food products, establishing 
                    Padmaaja Rasooi as the go-to brand for authentic flavors. We envision a future where 
                    every household can enjoy the rich heritage of Indian cuisine through our carefully 
                    crafted products, while supporting sustainable farming practices and local communities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Padmaaja Rasooi?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re committed to delivering authentic flavors through traditional recipes 
              and modern food processing excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#F5873B20'}}>
                      <feature.icon className="h-8 w-8" style={{color: '#F5873B'}} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate food experts dedicated to preserving traditional Indian cuisine 
              and delivering exceptional quality products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 bg-gradient-to-br from-orange-100 to-emerald-100 flex items-center justify-center">
                    <Users className="h-20 w-20" style={{color: '#F5873B'}} />
                  </div>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <Badge className="mb-3" style={{backgroundColor: '#F5873B20', color: '#F5873B'}}>
                        {member.role}
                      </Badge>
                      <p className="text-gray-600 mb-4">
                        {member.description}
                      </p>
                      {member.email && (
                        <p className="text-sm text-emerald-600 font-medium">
                          {member.email}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey & Milestones Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small family kitchen to a trusted brand across India - 
              here&apos;s how we&apos;ve grown while staying true to our roots.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2" style={{color: '#F5873B'}}>
                      {milestone.year}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Padmaaja Rasooi.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#F5873B20'}}>
                    <Shield className="h-8 w-8" style={{color: '#F5873B'}} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Authenticity
                  </h3>
                  <p className="text-gray-600">
                    We stay true to traditional recipes and cooking methods, ensuring every product 
                    delivers the authentic taste that connects you to India&apos;s rich culinary heritage.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Quality
                  </h3>
                  <p className="text-gray-600">
                    From sourcing the finest ingredients to maintaining strict quality controls, 
                    we ensure every product meets the highest standards of safety and excellence.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#F5873B20'}}>
                    <Heart className="h-8 w-8" style={{color: '#F5873B'}} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Family First
                  </h3>
                  <p className="text-gray-600">
                    We believe food brings families together. Every product is crafted with the same 
                    love and care we put into our own family&apos;s meals.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
