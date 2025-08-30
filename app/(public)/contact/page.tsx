'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
      icon: Phone,
      title: 'Phone',
      details: '+91 94757 58817',
      subtitle: 'Mon-Sat 9AM-6PM IST'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'srajeev7053@gmail.com',
      subtitle: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: 'Lucknow, Uttar Pradesh',
      subtitle: 'India - 226010'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Saturday',
      subtitle: '9:00 AM - 6:00 PM IST'
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Message sent successfully! We\'ll get back to you soon.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiry_type: ''
      })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Padmaaja Rasooi"
        subtitle="Contact"
        description="Ready to partner with us? Get in touch for bulk orders, wholesale pricing, and premium food product solutions."
        badge={{
          text: "Connect • Partner • Grow"
        }}
        backgroundGradient="from-blue-600/10 to-emerald-600/10"
        titleGradient="from-blue-600 to-emerald-600"
      />

      {/* Main Content */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200 border border-gray-200 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-gray-900 font-medium mb-1">
                      {info.details}
                    </p>
                    <p className="text-sm text-gray-500">
                      {info.subtitle}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form & Additional Info */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="rounded-2xl border border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Send us a Message</CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-gray-900">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="rounded-xl border-gray-300"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-900">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="rounded-xl border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiry_type" className="text-sm font-semibold text-gray-900">Inquiry Type</Label>
                    <Select value={formData.inquiry_type} onValueChange={handleSelectChange}>
                      <SelectTrigger className="rounded-xl border-gray-300">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pricing">Product Pricing & Catalog</SelectItem>
                        <SelectItem value="bulk">Bulk Order Requirements</SelectItem>
                        <SelectItem value="wholesale">Wholesale Distribution</SelectItem>
                        <SelectItem value="quality">Quality Certificates</SelectItem>
                        <SelectItem value="packaging">Custom Packaging Solutions</SelectItem>
                        <SelectItem value="partnership">Supply Chain Partnerships</SelectItem>
                        <SelectItem value="labeling">Private Labeling Services</SelectItem>
                        <SelectItem value="export">Export Opportunities</SelectItem>
                        <SelectItem value="nutrition">Nutritional Information</SelectItem>
                        <SelectItem value="general">General Information</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-semibold text-gray-900">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Brief subject of your inquiry"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="rounded-xl border-gray-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold text-gray-900">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="rounded-xl border-gray-300"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Info & FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Map Placeholder */}
            <Card className="rounded-2xl border border-gray-200">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Interactive Map Coming Soon</p>
                    <p className="text-sm text-gray-500 mt-1">Lucknow, Uttar Pradesh</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="rounded-2xl border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      What is your minimum order quantity?
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Our minimum order quantities vary by product. Contact us for specific product MOQ details and wholesale pricing.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Do you provide quality certificates?
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Yes, we provide FSSAI certification and other quality documents with every shipment to ensure food safety standards.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Can you customize packaging for our brand?
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Absolutely! We offer private labeling and custom packaging solutions for bulk orders. Contact us to discuss your requirements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      What are your delivery timelines?
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Delivery timelines vary based on location and order size. Typically 3-7 business days for domestic orders.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        </div>
        </section>
        </div>
      </div>
    </div>
  )
}
