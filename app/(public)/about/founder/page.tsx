'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Phone, MapPin, Calendar, Award, Target, Users, Quote, Briefcase, Star, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import PageHero from '@/components/sections/PageHero'

export default function FounderPage() {
  const founders = [
    {
      name: 'Rajeev Singh',
      role: 'Founder & Chief Managing Director',
      image: '/Rajeev Singh.jpg',
      email: 'info@padmajarice.com',
      phone: '+91 94757 58817',
      description: 'Dynamic entrepreneur with 7+ years of experience in real estate. He successfully led Padmaja Group to a turnover of ₹200+ crores, showcasing his sharp business acumen and leadership skills.',
      vision: 'Now, he brings the same vision and excellence to the food processing industry, aiming to build a trusted and scalable brand focused on quality, innovation, and customer satisfaction.',
      achievements: [
        '7+ years real estate experience',
        '₹200+ crores group turnover',
        'Dynamic business leadership',
        'Strategic vision & execution'
      ]
    },
    {
      name: 'Padmaja Singh',
      role: 'Founder & Chairman',
      image: '/Padmaja Singh.png',
      description: 'Director at Padmaaja Rasooi Private Limited, with over 5 years of experience in managing large-scale business operations within the Padmaja Group. Her strong background in finance, project oversight, and administration has been instrumental in driving business efficiency and growth.',
      vision: 'As a co-leader of Padmaaja Rasooi, she is committed to upholding the values of quality, sustainability, and customer satisfaction while steering the company toward long-term success in the food processing industry.',
      achievements: [
        '5+ years operations experience',
        'Finance & project oversight',
        'Business efficiency expert',
        'Sustainability advocate'
      ]
    }
  ]


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* PageHero Section */}
      <PageHero
        title="Meet Our Visionary Leaders"
        subtitle="Leadership Excellence"
        description="Pioneering the future of authentic Indian cuisine through innovation, tradition, and unwavering commitment to excellence."
        badge={{
          text: "Leadership Excellence",
          variant: "outline"
        }}
        icon={{
          component: Star,
          className: "w-8 h-8",
          bgColor: "bg-gradient-to-br from-orange-500/20 to-orange-600/30"
        }}
        features={[
          {
            icon: Award,
            label: "₹200+ Cr Group Turnover",
            color: "orange"
          },
          {
            icon: Calendar,
            label: "12+ Years Combined Experience",
            color: "emerald"
          },
          {
            icon: Target,
            label: "Founded Padmaaja Rasooi in 2023",
            color: "blue"
          }
        ]}
        backgroundGradient="from-slate-900 via-slate-800 to-orange-900"
        titleGradient="from-orange-400 to-orange-600"
        alignment="center"
        maxWidth="5xl"
      />

      {/* Modern Founders Section */}
      <section id="founders-section" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 px-4 py-2 bg-orange-50 text-orange-700 border border-orange-200">
              Leadership Team
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              The Minds Behind
              <span className="block text-orange-600">Padmaaja Rasooi</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the visionary leaders who bring decades of business excellence 
              to India&apos;s food processing industry.
            </p>
          </motion.div>

          {/* Founders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50 overflow-hidden relative">
                  <CardContent className="p-0">
                    {/* Founder Image Section */}
                    <div className="relative p-16 bg-gradient-to-br from-orange-50 to-emerald-50 overflow-hidden">
                      {/* Large Background Blobs */}
                      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-orange-300/20 to-orange-400/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-300/20 to-emerald-400/30 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
                      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-emerald-200/30 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
                      
                      <div className="flex justify-center relative z-10">
                        <div className="relative">
                          {/* Enhanced Background Glow */}
                          <div className="absolute -inset-8 bg-gradient-to-r from-orange-400/30 to-emerald-400/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                          <div className="absolute -inset-6 bg-gradient-to-r from-orange-300/20 to-emerald-300/20 rounded-full blur-xl"></div>
                          
                          {/* Main Image - Much Larger */}
                          <div className="relative w-56 h-56 rounded-full overflow-hidden border-6 border-white shadow-2xl">
                            <Image
                              src={founder.image}
                              alt={founder.name}
                              width={224}
                              height={224}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          {/* Enhanced Status Badge */}
                          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                            <Award className="h-10 w-10 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      {/* Name & Role */}
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {founder.name}
                        </h3>
                        <Badge className="px-4 py-2 bg-orange-100 text-orange-800 border border-orange-200">
                          {founder.role}
                        </Badge>
                      </div>

                      {/* Contact Info */}
                      {founder.email && (
                        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center text-gray-600">
                            <Mail className="h-4 w-4 mr-2 text-orange-600" />
                            <span className="text-sm">{founder.email}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="h-4 w-4 mr-2 text-orange-600" />
                            <span className="text-sm">{founder.phone}</span>
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      <div className="space-y-4 mb-6">
                        <p className="text-gray-600 leading-relaxed">
                          {founder.description}
                        </p>
                        <p className="text-gray-800 leading-relaxed font-medium">
                          {founder.vision}
                        </p>
                      </div>

                      {/* Achievements */}
                      <div className="border-t border-gray-100 pt-6">
                        <h4 className="font-semibold text-lg mb-4 text-orange-700">
                          Key Achievements
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {founder.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm leading-relaxed">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Business Story Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-orange-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5873B' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 px-4 py-2 bg-white text-gray-700 border border-gray-200 shadow-sm">
              Our Story
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 !leading-tight">
              From Vision to 
              <span className="block text-orange-600">Reality</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A journey of transformation from successful real estate ventures to revolutionizing 
              India&apos;s food processing industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Business Legacy Card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-10">
                  {/* Header */}
                  <div className="flex items-center mb-8">
                    <div className="p-3 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl mr-4">
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Business Legacy</h3>
                      <p className="text-orange-600 font-medium">₹200+ Crores Achieved</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <p className="text-gray-600 leading-relaxed text-lg">
                      The <strong className="text-gray-900">Padmaja Group</strong>, under the visionary leadership of 
                      Padmaja Singh, has achieved remarkable success with a turnover exceeding ₹100 crores.
                    </p>
                    
                    <p className="text-gray-600 leading-relaxed">
                      Starting with real estate ventures, the group demonstrated exceptional business 
                      acumen and strategic growth, building a foundation of trust and excellence.
                    </p>

                    <div className="bg-gradient-to-r from-orange-50 to-emerald-50 p-6 rounded-xl border-l-4 border-orange-500">
                      <p className="text-gray-700 font-medium italic">
                        &quot;Our transition from real estate to food processing represents our commitment 
                        to creating sustainable value in essential industries that serve communities.&quot;
                      </p>
                      <p className="text-sm text-orange-600 mt-2 font-medium">— Founding Vision</p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-1">7+</div>
                        <div className="text-sm text-gray-600">Years Real Estate</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600 mb-1">5+</div>
                        <div className="text-sm text-gray-600">Years Operations</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision & Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-10">
                  {/* Header */}
                  <div className="flex items-center mb-8">
                    <div className="p-3 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-xl mr-4">
                      <Target className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Vision & Mission</h3>
                      <p className="text-emerald-600 font-medium">Future-Focused Leadership</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <p className="text-gray-600 leading-relaxed text-lg">
                      To become <strong className="text-gray-900">India&apos;s most trusted name</strong> in authentic 
                      food processing, preserving traditional flavors while embracing modern technology.
                    </p>
                    
                    <p className="text-gray-600 leading-relaxed">
                      Our mission extends beyond business success – we&apos;re building a legacy that honors 
                      India&apos;s culinary heritage while creating opportunities for sustainable growth.
                    </p>

                    {/* Mission Points */}
                    <div className="space-y-4 pt-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Quality Excellence</h4>
                          <p className="text-gray-600">Quality-first approach in every product and process</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Sustainable Practices</h4>
                          <p className="text-gray-600">Ethical business practices that benefit all stakeholders</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Community Impact</h4>
                          <p className="text-gray-600">Empowering local communities and farmers across India</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Call to Action Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
        {/* Sophisticated Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle geometric patterns */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-orange-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 rounded-full blur-3xl"></div>
          
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-8 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 text-sm font-medium">
              <Mail className="w-4 h-4 mr-2" />
              Connect with Leadership
            </Badge>
            
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 !leading-tight">
              Let&apos;s Build the Future
              <span className="block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Ready to explore partnership opportunities, discuss our vision, or learn more 
              about Padmaaja Rasooi&apos;s journey? Our founders are always excited to connect with 
              like-minded individuals and organizations.
            </p>
          </motion.div>

          {/* Enhanced Contact Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Email Us</h3>
                  <p className="text-slate-400 mb-4">Send us a message anytime</p>
                  <p className="text-orange-400 font-medium">info@padmajarice.com</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Call Direct</h3>
                  <p className="text-slate-400 mb-4">Speak with our founder</p>
                  <p className="text-emerald-400 font-medium">+91 94757 58817</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Visit Us</h3>
                  <p className="text-slate-400 mb-4">Based in India</p>
                  <p className="text-purple-400 font-medium">Schedule a Meeting</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button 
              size="lg" 
              className="px-10 py-5 text-lg font-medium bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="mr-3 h-6 w-6" />
              Send Message
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="px-10 py-5 text-lg font-medium border-2 border-white/30 hover:bg-white hover:text-slate-900 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="mr-3 h-6 w-6" />
              Schedule Call
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
