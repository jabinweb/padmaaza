'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Shield, Award, CheckCircle, FileText, Globe, Factory, Leaf, Users, Calendar, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import PageHero from '@/components/sections/PageHero'

export default function CertificationsPage() {
  const certifications = [
    {
      id: 1,
      name: 'FSSAI License',
      description: 'Food Safety and Standards Authority of India certification ensuring food safety and quality standards.',
      category: 'Food Safety',
      issuedBy: 'Food Safety and Standards Authority of India',
      validity: 'Valid',
      licenseNumber: '10825009000073',
      icon: Shield,
      color: 'bg-green-500',
      status: 'Active'
    },
    {
      id: 2,
      name: 'ISO 9001:2015',
      description: 'Quality Management System certification ensuring consistent quality in products and services.',
      category: 'Quality Management',
      issuedBy: 'International Organization for Standardization',
      validity: '26 Sep 2024 – 25 Sep 2027',
      licenseNumber: '305024092612Q',
      icon: Award,
      color: 'bg-blue-500',
      status: 'Active'
    },
    {
      id: 3,
      name: 'ISO 14001:2015',
      description: 'Environmental Management System certification for sustainable environmental practices.',
      category: 'Environmental Management',
      issuedBy: 'International Organization for Standardization',
      validity: '26 Sep 2024 – 25 Sep 2027',
      licenseNumber: '305024092613E',
      icon: Leaf,
      color: 'bg-green-600',
      status: 'Active'
    },
    {
      id: 4,
      name: 'ISO 22000:2018',
      description: 'Food Safety Management System certification throughout the food chain.',
      category: 'Food Safety',
      issuedBy: 'International Organization for Standardization',
      validity: '26 Sep 2024 – 25 Sep 2027',
      licenseNumber: '305024092615F',
      icon: CheckCircle,
      color: 'bg-purple-500',
      status: 'Active'
    },
    {
      id: 5,
      name: 'ISO 45001:2018',
      description: 'Occupational Health and Safety Management System ensuring workplace safety.',
      category: 'Health & Safety',
      issuedBy: 'International Organization for Standardization',
      validity: '26 Sep 2024 – 25 Sep 2027',
      licenseNumber: '305024092614HS',
      icon: Shield,
      color: 'bg-red-500',
      status: 'Active'
    },
    {
      id: 6,
      name: 'HACCP Certification',
      description: 'Hazard Analysis and Critical Control Points system for identifying and preventing food safety hazards.',
      category: 'Food Safety',
      issuedBy: 'Global Food Safety Initiative',
      validity: '26 Sep 2024 – 25 Sep 2027',
      licenseNumber: 'UQ-2024092617',
      icon: FileText,
      color: 'bg-orange-500',
      status: 'Active'
    },
    {
      id: 7,
      name: 'IEC Code',
      description: 'Import Export Code for international trade operations.',
      category: 'Export Authorization',
      issuedBy: 'Director General of Foreign Trade',
      validity: 'Valid',
      licenseNumber: 'AAPCP0216M',
      icon: Globe,
      color: 'bg-indigo-500',
      status: 'Active'
    },
    {
      id: 8,
      name: 'LEI Code',
      description: 'Legal Entity Identifier for global financial transactions and regulatory reporting.',
      category: 'Financial Compliance',
      issuedBy: 'Global Legal Entity Identifier Foundation',
      validity: 'Valid till 14 Jan 2026',
      licenseNumber: '3358009WKDVJJPAJMH24',
      icon: FileText,
      color: 'bg-cyan-500',
      status: 'Active'
    },
    {
      id: 9,
      name: 'Startup Recognition',
      description: 'Government recognition as a startup entity for various benefits and support.',
      category: 'Government Recognition',
      issuedBy: 'Department for Promotion of Industry and Internal Trade',
      validity: 'Valid',
      licenseNumber: 'DIPP179613',
      icon: Factory,
      color: 'bg-pink-500',
      status: 'Active'
    }
  ]

  const complianceAreas = [
    {
      title: 'Food Safety Management',
      description: 'Comprehensive food safety protocols ensuring consumer health and product integrity.',
      icon: Shield,
      certifications: ['FSSAI License', 'ISO 22000:2018', 'HACCP Certification']
    },
    {
      title: 'Quality Management',
      description: 'Rigorous quality control measures maintaining consistent product excellence.',
      icon: Award,
      certifications: ['ISO 9001:2015', 'ISO 22000:2018']
    },
    {
      title: 'Environmental & Safety',
      description: 'Environmental responsibility and workplace safety in all operations.',
      icon: Leaf,
      certifications: ['ISO 14001:2015', 'ISO 45001:2018']
    },
    {
      title: 'Business Compliance',
      description: 'Legal and regulatory compliance for domestic and international operations.',
      icon: Globe,
      certifications: ['IEC Code', 'LEI Code', 'Startup Recognition']
    }
  ]

  const achievements = [
    {
      year: '2024',
      title: 'Best Food Processing Unit',
      description: 'Awarded for excellence in food processing and quality standards.',
      organization: 'State Food Processing Board'
    },
    {
      year: '2023',
      title: 'Export Excellence Award',
      description: 'Recognition for outstanding contribution to food exports.',
      organization: 'Export Promotion Council'
    },
    {
      year: '2023',
      title: 'Quality Leadership',
      description: 'Acknowledged for maintaining highest quality standards.',
      organization: 'Food Industry Association'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Hero Section */}
      <PageHero
        title="Certifications"
        subtitle="Our"
        description="Committed to the highest standards of food safety, quality, and excellence. Our certifications demonstrate our dedication to delivering safe, premium food products."
        badge={{
          text: "Certified Excellence"
        }}
        icon={{
          component: Shield,
          bgColor: "bg-emerald-600"
        }}
        features={[
          { icon: CheckCircle, label: "9+ Active Certifications", color: "green" },
          { icon: Award, label: "ISO Standards Certified", color: "blue" },
          { icon: Globe, label: "Export & Trade Authorized", color: "purple" }
        ]}
        backgroundGradient="from-emerald-600/10 to-blue-600/10"
        titleGradient="from-emerald-600 to-blue-600"
      />

      {/* Certifications Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Active Certifications
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our comprehensive certification portfolio ensures compliance with national and international standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${cert.color} shadow-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <Badge 
                          variant={cert.status === 'Active' ? 'default' : 'secondary'}
                          className={cert.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                        >
                          {cert.status}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                        {cert.name}
                      </CardTitle>
                      
                      <Badge variant="outline" className="w-fit text-xs">
                        {cert.category}
                      </Badge>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-slate-600 leading-relaxed">
                        {cert.description}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Issued by:</span>
                          <span className="text-slate-700 font-medium">{cert.issuedBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Validity:</span>
                          <span className="text-slate-700 font-medium">{cert.validity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">License:</span>
                          <span className="text-slate-700 font-mono text-xs">{cert.licenseNumber}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Compliance Areas */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Compliance Excellence
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our comprehensive approach to compliance covers every aspect of food processing and quality assurance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {complianceAreas.map((area, index) => {
              const IconComponent = area.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <div className="inline-flex p-4 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl shadow-lg">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 mb-3">
                        {area.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {area.description}
                      </p>
                      
                      <div className="space-y-2">
                        {area.certifications.map((cert, certIndex) => (
                          <Badge key={certIndex} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Awards & Recognition
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by industry leaders and regulatory bodies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="inline-flex p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="mb-4 text-amber-700 border-amber-200">
                      {achievement.year}
                    </Badge>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      {achievement.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {achievement.description}
                    </p>
                    
                    <p className="text-sm font-medium text-emerald-600">
                      {achievement.organization}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Certification Verification?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Contact us for detailed certification documents or verification of our compliance status.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-emerald-600 hover:bg-emerald-50"
                asChild
              >
                <a href="https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/media/2025-09-07/padmaaza-rasooi-profile" download="Padmaaja Rasooi Profile.pdf">
                  <FileText className="w-5 h-5 mr-2" />
                  Download Company Profile
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
