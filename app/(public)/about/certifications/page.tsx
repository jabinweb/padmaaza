'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Shield, Award, CheckCircle, FileText, Globe, Factory, Leaf, Users, Calendar, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import PageHero from '@/components/PageHero'

export default function CertificationsPage() {
  const certifications = [
    {
      id: 1,
      name: 'FSSAI License',
      description: 'Food Safety and Standards Authority of India certification ensuring food safety and quality standards.',
      category: 'Food Safety',
      issuedBy: 'Food Safety and Standards Authority of India',
      validUntil: '2026-12-31',
      licenseNumber: 'FSSAI-12345678901234',
      icon: Shield,
      color: 'bg-green-500',
      status: 'Active'
    },
    {
      id: 2,
      name: 'ISO 22000:2018',
      description: 'International standard for food safety management systems throughout the food chain.',
      category: 'Quality Management',
      issuedBy: 'International Organization for Standardization',
      validUntil: '2025-08-15',
      licenseNumber: 'ISO-22000-2024-001',
      icon: Award,
      color: 'bg-blue-500',
      status: 'Active'
    },
    {
      id: 3,
      name: 'HACCP Certification',
      description: 'Hazard Analysis and Critical Control Points system for identifying and preventing food safety hazards.',
      category: 'Food Safety',
      issuedBy: 'Global Food Safety Initiative',
      validUntil: '2025-11-20',
      licenseNumber: 'HACCP-2024-PR-789',
      icon: CheckCircle,
      color: 'bg-purple-500',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Organic Certification',
      description: 'Certified organic processing facility for handling and processing organic food products.',
      category: 'Organic Standards',
      issuedBy: 'India Organic Certification Agency',
      validUntil: '2025-03-10',
      licenseNumber: 'IOCA-ORG-2024-456',
      icon: Leaf,
      color: 'bg-green-600',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Export License',
      description: 'License for export of food products to international markets with quality compliance.',
      category: 'Export Authorization',
      issuedBy: 'Director General of Foreign Trade',
      validUntil: '2026-06-30',
      licenseNumber: 'DGFT-EXP-2024-123',
      icon: Globe,
      color: 'bg-indigo-500',
      status: 'Active'
    },
    {
      id: 6,
      name: 'BRC Global Standard',
      description: 'British Retail Consortium standard for food safety and quality in food manufacturing.',
      category: 'International Standards',
      issuedBy: 'British Retail Consortium',
      validUntil: '2025-09-25',
      licenseNumber: 'BRC-2024-FOOD-567',
      icon: FileText,
      color: 'bg-red-500',
      status: 'Active'
    }
  ]

  const complianceAreas = [
    {
      title: 'Food Safety Management',
      description: 'Comprehensive food safety protocols ensuring consumer health and product integrity.',
      icon: Shield,
      certifications: ['FSSAI License', 'HACCP Certification', 'ISO 22000:2018']
    },
    {
      title: 'Quality Assurance',
      description: 'Rigorous quality control measures maintaining consistent product excellence.',
      icon: Award,
      certifications: ['ISO 22000:2018', 'BRC Global Standard']
    },
    {
      title: 'Environmental Standards',
      description: 'Sustainable practices and environmental responsibility in food processing.',
      icon: Leaf,
      certifications: ['Organic Certification', 'Environmental Compliance']
    },
    {
      title: 'International Trade',
      description: 'Authorized for global export with international quality compliance.',
      icon: Globe,
      certifications: ['Export License', 'BRC Global Standard']
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
          { icon: CheckCircle, label: "6+ Active Certifications", color: "green" },
          { icon: Award, label: "International Standards", color: "blue" },
          { icon: Globe, label: "Export Authorized", color: "purple" }
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
                          <span className="text-slate-500">Valid until:</span>
                          <span className="text-slate-700 font-medium">{new Date(cert.validUntil).toLocaleDateString()}</span>
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
              <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-emerald-50">
                <FileText className="w-5 h-5 mr-2" />
                Download Certificates
              </Button>
              <Button size="lg" variant="outline" className="border-white hover:bg-white/10">
                <ExternalLink className="w-5 h-5 mr-2" />
                Contact Compliance Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
