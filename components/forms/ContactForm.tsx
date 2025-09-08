'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Send } from 'lucide-react'
import { toast } from 'sonner'

interface ContactFormProps {
  className?: string
  variant?: 'default' | 'minimal' | 'professional'
  onSubmitSuccess?: () => void
  showInquiryType?: boolean
  title?: string
  description?: string
}

export default function ContactForm({}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiry_type: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    <div className="p-6 md:p-8">
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
  )
}