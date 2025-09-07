'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { MapPin, Phone, Mail, Clock, Send, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiry_type: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Manufacturing Unit',
      details: 'Morabba No. 03, Firozpur Road',
      subtitle: 'Kaithal Siwan, Haryana',
      highlight: 'Production Facility'
    },
    {
      icon: MapPin,
      title: 'Corporate Office',
      details: '11B/79 Vrindavan Yojna',
      subtitle: 'Raibareli Road, Lucknow, India',
      highlight: 'Business Operations'
    }
  ]

  const businessInfo = [
    {
      icon: Phone,
      title: 'Business Phone',
      details: '+91 94757 58817',
      subtitle: 'Direct line to our sales team',
      highlight: 'Mon-Sat 9AM-6PM IST'
    },
    {
      icon: Mail,
      title: 'Business Email',
      details: 'srajeev7053@gmail.com',
      subtitle: 'For inquiries and partnerships',
      highlight: '24-hour response guarantee'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Saturday',
      subtitle: '9:00 AM - 6:00 PM IST',
      highlight: 'Closed on Sundays'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      inquiry_type: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId: 'contact', // Add formId for the simplified schema
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          inquiryType: formData.inquiry_type,
          formSource: 'contact-page'
        })
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          inquiry_type: ''
        })
      } else {
        throw new Error(result.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Get in Touch"
        subtitle="Contact Padmaaja Rasooi"
        description="Partner with India's premium Basmati rice manufacturer. Connect with us for wholesale opportunities, bulk orders, and business partnerships."
        badge={{
          text: "Professional • Reliable • Trusted"
        }}
        backgroundGradient="from-blue-600/10 to-emerald-600/10"
        titleGradient="from-blue-600 to-emerald-600"
      />

      {/* Main Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Professional Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          {/* Addresses Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Visit our manufacturing facility and corporate office for business partnerships and quality assurance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 group-hover:from-blue-50 group-hover:to-white">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-blue-500 group-hover:to-blue-600 transition-all duration-300">
                      <info.icon className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {info.title}
                    </h3>
                    <p className="text-gray-900 font-semibold mb-2 text-lg">
                      {info.details}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {info.subtitle}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <Badge variant="outline" className="text-xs font-medium bg-blue-50 text-blue-700 border-blue-200">
                        {info.highlight}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Business Contact Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Business Contact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch with our professional team for business inquiries and partnerships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 group-hover:from-emerald-50 group-hover:to-white">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-emerald-500 group-hover:to-emerald-600 transition-all duration-300">
                      <info.icon className="h-10 w-10 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {info.title}
                    </h3>
                    <p className="text-gray-900 font-semibold mb-2 text-lg">
                      {info.details}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {info.subtitle}
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <Badge variant="outline" className="text-xs font-medium bg-emerald-50 text-emerald-700 border-emerald-200">
                        {info.highlight}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Business Partnership CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Partner with Us?</h3>
            <p className="text-blue-100 text-lg mb-6 max-w-3xl mx-auto">
              Join India's leading Basmati rice manufacturer. We offer competitive wholesale pricing, 
              premium quality assurance, and reliable supply chain solutions for your business.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-100">200+ CR</div>
                <div className="text-blue-200 text-sm">Annual Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-100">FSSAI</div>
                <div className="text-blue-200 text-sm">Certified Quality</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-100">24/7</div>
                <div className="text-blue-200 text-sm">Quality Focus</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Professional Contact Form & Information */}
        <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to partner with us? Get in touch with our team for business inquiries and partnerships.
            </p>
          </div>
          
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Modern Minimal Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in touch</h2>
                  <p className="text-gray-600">
                    Connect with our team for business partnerships and bulk orders.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-11 rounded-lg border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-11 rounded-lg border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <Label htmlFor="inquiry_type" className="text-sm font-medium text-gray-700 mb-2 block">
                      Inquiry Type
                    </Label>
                    <Select value={formData.inquiry_type} onValueChange={handleSelectChange}>
                      <SelectTrigger className="h-11 rounded-lg border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wholesale">Wholesale Partnership</SelectItem>
                        <SelectItem value="bulk">Bulk Orders (1000+ kg)</SelectItem>
                        <SelectItem value="pricing">Pricing & Catalog</SelectItem>
                        <SelectItem value="partnership">Supply Chain Partnership</SelectItem>
                        <SelectItem value="private-label">Private Label</SelectItem>
                        <SelectItem value="export">Export & Trade</SelectItem>
                        <SelectItem value="franchise">Franchise</SelectItem>
                        <SelectItem value="quality">Quality Certificates</SelectItem>
                        <SelectItem value="custom-packaging">Custom Packaging</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject */}
                  <div>
                    <Label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2 block">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Brief subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="h-11 rounded-lg border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your requirements, quantities, and timeline..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="rounded-lg border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    We'll respond within 24 hours
                  </p>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Business Information - Clean Masonry Layout */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            {/* Masonry Grid Layout */}
            <div className="grid grid-cols-1 gap-6 auto-rows-max">
              
              {/* Google Maps - Simplified */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center text-gray-900 font-medium">
                    <MapPin className="h-4 w-4 text-orange-600 mr-2" />
                    Office Location
                  </div>
                </div>
                <div className="relative h-48 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.6756662889756!2d80.94482677549088!3d26.780273676736253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfb07d4460727%3A0xdd3f66282f88d3ce!2s11-B%2F79%2C%20Brij%20Vihar%2C%20Sector%2011%2C%20Vrindavan%20Colony%2C%20Lucknow%2C%20Uttar%20Pradesh%20226029!5e0!3m2!1sen!2sin!4v1697000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="p-4 bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">11B/79</p>
                  <p className="text-sm text-gray-600">Vrindavan Yojna, Lucknow - 226029</p>
                </div>
              </div>

              {/* Quick Stats - Minimal Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-xl border border-orange-100 p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">200+ CR</div>
                  <div className="text-xs text-gray-600">Annual Revenue</div>
                </div>
                <div className="bg-green-50 rounded-xl border border-green-100 p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">FSSAI</div>
                  <div className="text-xs text-gray-600">Certified</div>
                </div>
              </div>


              {/* FAQ - Minimal Accordion */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick FAQ</h3>
                <Accordion type="single" collapsible className="w-full space-y-2">
                  <AccordionItem value="item-1" className="border-b border-gray-100 pb-2">
                    <AccordionTrigger className="text-left text-sm font-medium py-2 hover:no-underline">
                      Minimum order quantity?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600 pb-2">
                      1000 kg minimum for premium Basmati rice.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-b border-gray-100 pb-2">
                    <AccordionTrigger className="text-left text-sm font-medium py-2 hover:no-underline">
                      Do you provide samples?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600 pb-2">
                      Yes, free samples up to 1 kg for evaluation.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border-none">
                    <AccordionTrigger className="text-left text-sm font-medium py-2 hover:no-underline">
                      Payment terms?
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600">
                      Flexible terms with advance discounts available.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

            </div>
          </motion.div>
        </div>
        </div>
        </section>
        </div>
      </div>
    </div>
  )
}
                  