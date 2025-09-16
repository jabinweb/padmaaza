'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Award, Target, Globe, Leaf, Shield, Heart, Factory, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import ImageSlider from '@/components/ImageSlider'

export default function AboutPage() {
  const sliderImages = [
    {
      src: 'https://images.pexels.com/photos/164504/pexels-photo-164504.jpeg',
      alt: 'Rice Fields',
      title: 'Premium Basmati Rice Fields'
    },
    {
      src: 'https://images.pexels.com/photos/2804327/pexels-photo-2804327.jpeg', 
      alt: 'Rice Grains',
      title: 'High Quality Rice Grains'
    },
    {
      src: 'https://images.pexels.com/photos/8108170/pexels-photo-8108170.jpeg',
      alt: 'Agriculture',
      title: 'Modern Agricultural Practices'
    },
    {
      src: '/farmer.png',
      alt: 'Farmer',
      title: 'Dedicated Farming Excellence'
    },
    // {
    //   src: '/lab.png',
    //   alt: 'Quality Control Lab',
    //   title: 'Advanced Quality Control Laboratory'
    // },
    {
      src: '/factory.png',
      alt: 'Manufacturing Facility',
      title: 'Manufacturing Facility'
    }
  ]

  const features = [
    {
      icon: Leaf,
      title: 'Premium Basmati Rice',
      description: 'We source the finest Basmati rice from Haryana, known as the hub of premium quality Basmati rice.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'FSSAI certified facilities with strict quality control measures ensuring food safety and excellence.'
    },
    {
      icon: Heart,
      title: 'Traditional Excellence',
      description: 'Founded by experienced professionals with deep knowledge of rice processing and quality standards.'
    },
    {
      icon: Factory,
      title: 'Modern Processing',
      description: 'Our manufacturing unit in Kaithal, Siwan, Haryana uses state-of-the-art technology for processing.'
    }
  ]

  const team = [
    {
      name: 'Rajeev Singh',
      role: 'Founder & Director',
      image: '/Rajeev Singh.jpg',
      description: 'Ex-army professional who founded Padmaaja with extensive experience in real estate since 2018 and now leading FMCG operations.',
      background: 'Ex-Army • Real Estate Expert • Visionary Leader'
    },
    {
      name: 'Smt. Padmasha Singh',
      role: 'Chairman',
      image: '/Padmaja Singh.png',
      description: 'Experienced leader providing strategic direction and ensuring the company maintains its commitment to quality and excellence.',
      background: 'Strategic Leader • Quality Advocate • Industry Expert'
    }
  ]

  const milestones = [
    { year: '2018', title: 'Real Estate Journey', description: 'Started our business journey in real estate sector with successful operations' },
    { year: '2024 Q1', title: 'FMCG Expansion', description: 'Transitioned into FMCG products, focusing on premium Basmati rice processing' },
    { year: '2024 Q2', title: 'Manufacturing Setup', description: 'Established manufacturing unit in Kaithal, Siwan, Haryana - the hub of Basmati rice' },
    { year: '2025', title: 'Brand Launch', description: 'Launched Kashmina Basmati Rice brand with guaranteed quality standards' }
  ]

  return (
    <div className="min-h-screen">
      {/* Image Slider Section */}
      <section className="pb-8 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImageSlider images={sliderImages} />
        </div>
      </section>

      {/* Navigation Links */}
      <section className="sticky top-[95px] z-50 py-4 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="#who-we-are">
              <Button variant="outline" className="hover:bg-orange-50 hover:border-orange-200">
                Who We Are
              </Button>
            </Link>
            <Link href="#mission-vision">
              <Button variant="outline" className="hover:bg-orange-50 hover:border-orange-200">
                Mission & Vision
              </Button>
            </Link>
            <Link href="/about/founder">
              <Button variant="outline" className="hover:bg-orange-50 hover:border-orange-200">
                Our Founders
              </Button>
            </Link>
            <Link href="#team">
              <Button variant="outline" className="hover:bg-orange-50 hover:border-orange-200">
                Our Team
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" className="hover:bg-orange-50 hover:border-orange-200">
                Why Choose Us
              </Button>
            </Link>
            <Link href="#journey">
              <Button variant="outline" className="hover:bg-orange-50 hover:border-orange-200">
                Our Journey
              </Button>
            </Link>
            <Link href="#process">
              <Button variant="outline" className="hover:bg-orange-50 hover:border-orange-200">
                Our Process
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="who-we-are" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Who We Are
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-start space-x-3">
                  <MapPin className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-orange-600 mb-2">
                      Based in Lucknow, Uttar Pradesh, India
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      We are an India-based company headquartered in <strong>Lucknow, Uttar Pradesh</strong>. 
                      Founded by an ex-army professional, <strong>Rajeev Singh (Founder and Director)</strong> and 
                      his wife <strong>Smt. Padmasha Singh (Chairman)</strong>, we bring discipline, quality, 
                      and excellence to everything we do.
                    </p>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <h4 className="font-semibold text-gray-900">Our Journey</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded">2018</span>
                      <span className="text-gray-700">Started our business journey in real estate</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded">2024</span>
                      <span className="text-gray-700">Expanded into FMCG products, focusing on premium rice</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded">Present</span>
                      <span className="text-gray-700">Leading manufacturer of Kashmina Basmati Rice</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  Our manufacturing unit is strategically located in <strong>Kaithal, Siwan, Haryana</strong> - 
                  the renowned hub of Basmati rice production. Haryana is globally recognized for producing 
                  the finest quality Basmati rice, and our brand <strong>Kashmina Basmati Rice</strong> 
                  represents this legacy of excellence.
                </p>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-200">
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">Our Promise</h4>
                  <p className="text-gray-800">
                    We assure and guarantee the highest quality standards in every grain of rice, 
                    bringing you the authentic taste and aroma that Basmati is known for.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Cards */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Manufacturing Excellence Card */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900 text-center">
                      Manufacturing Excellence
                    </CardTitle>
                    <div className="text-center">
                      <Badge className="bg-orange-100 text-orange-800 px-3 py-1 text-sm">
                        Kaithal, Siwan, Haryana
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Located in Haryana - the heart of Basmati rice cultivation</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">State-of-the-art processing facilities ensuring quality</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Advanced quality control laboratory for testing</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">Hygienic packaging standards maintaining freshness</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Kashmina Rice Card */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-emerald-50 to-orange-50">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src="/rice_bags.png"
                          alt="Kashmina Basmati Rice"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl text-gray-900 mb-3">Kashmina Basmati Rice</h4>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          Our flagship brand represents the finest quality Basmati rice, 
                          carefully selected, processed, and packaged to deliver the authentic 
                          aroma, long grains, and exceptional taste that makes every meal special.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Mission & Vision Section */}
      <section id="mission-vision" className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
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
                    Our mission is very simple - we know that if we provide the best, you will collaborate with us as the best. 
                    We think and work towards prevailing all over India. Our mission is to provide the best quality rice 
                    for everyone at affordable cost, ensuring premium Basmati reaches every Indian kitchen.
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
                    We know that we are processing what you don&apos;t see, but you eat. Here our responsibility is paramount. 
                    Our vision is to be the best in your eyes and within your budget - delivering exceptional quality 
                    Kashmina Basmati Rice that exceeds expectations while remaining accessible to all.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
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

      {/* Leadership Overview Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Founded by experienced professionals with a vision to bring premium quality 
              Basmati rice from Haryana to every Indian household.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Meet Our Founders</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Rajeev Singh (Founder & Director)</strong> - Ex-army professional with extensive 
                    experience in real estate since 2018, now leading our FMCG operations with discipline and excellence.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Smt. Padmasha Singh (Chairman)</strong> - Experienced leader providing strategic 
                    direction and ensuring our commitment to quality and excellence.
                  </p>
                  
                  <Link href="/about/founder">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white mt-4">
                      Learn More About Our Founders
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-40 rounded-lg overflow-hidden">
                    <Image
                      src="/Rajeev Singh.jpg"
                      alt="Rajeev Singh"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-40 rounded-lg overflow-hidden">
                    <Image
                      src="/Padmaja Singh.png"
                      alt="Smt. Padmasha Singh"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Team Section */}
      <section id="team" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Meet Our Team
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Core Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated professionals who ensure every grain of Kashmina Basmati Rice 
              meets our exceptional standards of quality and excellence.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            {[
              {
                name: "Abhishek Patel",
                role: "HR",
                department: "Human Resources",
                description: "Manages our human resources and ensures smooth workforce operations across all departments.",
                icon: "👔",
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200"
              },
              {
                name: "Atul Sahu",
                role: "Account",
                department: "Finance & Accounts",
                description: "Manages financial operations, accounting, and ensures fiscal responsibility across the organization.",
                icon: "💼",
                color: "from-emerald-500 to-emerald-600",
                bgColor: "bg-emerald-50",
                borderColor: "border-emerald-200"
              },
              {
                name: "Rahul Kumar",
                role: "Lab",
                department: "Quality Control Laboratory",
                description: "Oversees all laboratory testing and quality analysis to maintain our premium standards.",
                icon: "🔬",
                color: "from-orange-500 to-orange-600",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-200"
              },
              {
                name: "Shivchandra",
                role: "Processing Incharge",
                department: "Rice Processing",
                description: "Supervises rice processing operations and ensures efficient production workflows.",
                icon: "🏭",
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200"
              },
              {
                name: "Sunil Awasthi",
                role: "Marketing Head",
                department: "Marketing & Sales",
                description: "Leads marketing strategies and sales initiatives to expand our market presence.",
                icon: "📈",
                color: "from-teal-500 to-teal-600",
                bgColor: "bg-teal-50",
                borderColor: "border-teal-200"
              },
              {
                name: "Sailesh Tiwari",
                role: "Head of Operation",
                department: "Operations Management",
                description: "Manages overall operations and coordinates between different departments for seamless workflow.",
                icon: "⚙️",
                color: "from-indigo-500 to-indigo-600",
                bgColor: "bg-indigo-50",
                borderColor: "border-indigo-200"
              },
              {
                name: "Ajad Singh",
                role: "Head of Operation",
                department: "Operations Management",
                description: "Oversees operational excellence and ensures quality standards across all production processes.",
                icon: "🎯",
                color: "from-rose-500 to-rose-600",
                bgColor: "bg-rose-50",
                borderColor: "border-rose-200"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className={`relative overflow-hidden rounded-2xl bg-white border ${member.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 h-full`}>
                  {/* Background Pattern */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${member.bgColor} rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
                  
                  <div className="relative p-6">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${member.color} flex items-center justify-center mb-4 text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {member.icon}
                    </div>
                    
                    {/* Name & Role */}
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-orange-600 font-semibold text-sm mb-1">
                      {member.role}
                    </p>
                    <div className={`inline-block px-2 py-1 ${member.bgColor} text-xs font-medium rounded-full mb-3`}>
                      {member.department}
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                  
                  {/* Hover Effect Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { number: "7+", label: "Team Members", icon: "👥" },
              { number: "100%", label: "Dedication", icon: "⭐" },
              { number: "24/7", label: "Quality Focus", icon: "🎯" },
              { number: "200+ CR", label: "Revenue", icon: "💰" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">{stat.number}</div>
                  <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Banking Partner Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 md:p-12 text-white"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
            
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <div className="text-3xl">🏦</div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Trusted Banking Partner
              </h3>
              <p className="text-xl mb-2 font-semibold text-blue-100">
                State Bank of India, Kaithal
              </p>
              <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Our operations are backed by State Bank of India in Kaithal, Haryana, 
                ensuring financial stability and trust in all our business operations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey & Milestones Section */}
      <section id="journey" className="py-20">
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

      {/* Rice Processing Journey Section */}
      <section id="process" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              From Farm to Table
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our meticulous 8-step process ensures every grain of Kashmina Basmati Rice 
              meets the highest standards of quality, purity, and freshness.
            </p>
          </motion.div>

          <div className="relative">
            {/* Process Flow */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "Purchase",
                  description: "Premium paddy sourced directly from trusted farmers in Haryana",
                  icon: "🌾",
                  color: "from-green-400 to-green-600"
                },
                {
                  step: 2,
                  title: "Lab Testing",
                  description: "Rigorous quality checks for moisture, purity, and grain quality",
                  icon: "🔬",
                  color: "from-blue-400 to-blue-600"
                },
                {
                  step: 3,
                  title: "Drying Process",
                  description: "Controlled drying to optimal moisture levels for processing",
                  icon: "☀️",
                  color: "from-yellow-400 to-orange-500"
                },
                {
                  step: 4,
                  title: "Steaming",
                  description: "Traditional steaming process to enhance aroma and texture",
                  icon: "♨️",
                  color: "from-purple-400 to-purple-600"
                },
                {
                  step: 5,
                  title: "Sorting",
                  description: "Advanced sorting to separate premium long grains",
                  icon: "🔍",
                  color: "from-teal-400 to-teal-600"
                },
                {
                  step: 6,
                  title: "Quality Check",
                  description: "Final quality inspection ensuring consistency and excellence",
                  icon: "✅",
                  color: "from-emerald-400 to-emerald-600"
                },
                {
                  step: 7,
                  title: "Packaging",
                  description: "Hygienic packaging in food-grade materials for freshness",
                  icon: "📦",
                  color: "from-indigo-400 to-indigo-600"
                },
                {
                  step: 8,
                  title: "Labelling",
                  description: "Proper labelling with batch details and quality certifications",
                  icon: "🏷️",
                  color: "from-rose-400 to-rose-600"
                }
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connecting Line for larger screens */}
                  {index < 7 && (
                    <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-orange-300 to-orange-400 z-0" />
                  )}
                  
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10">
                    <CardContent className="p-6 text-center">
                      {/* Step Number */}
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${process.color} flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg`}>
                        {process.step}
                      </div>
                      
                      {/* Icon */}
                      <div className="text-4xl mb-3">
                        {process.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {process.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {process.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quality Assurance Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-8 border-l-4 border-orange-500"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🏆 Quality Guaranteed at Every Step
                </h3>
                <p className="text-gray-700 text-lg max-w-4xl mx-auto">
                  Our FSSAI-certified facility and experienced team ensure that every grain of 
                  Kashmina Basmati Rice maintains the authentic aroma, perfect texture, and 
                  exceptional taste that makes your meals truly special.
                </p>
              </div>
            </motion.div>
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
