'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { Loader2, Package, Building, Phone, Mail, MessageCircle } from 'lucide-react'

const inquirySchema = z.object({
  // Company Information
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  contactPerson: z.string().min(2, 'Contact person name must be at least 2 characters'),
  designation: z.string().min(2, 'Designation is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  
  // Business Details
  businessType: z.string().min(1, 'Please select business type'),
  gstNumber: z.string().optional(),
  address: z.string().min(10, 'Please provide complete address'),
  
  // Product Requirements
  quantityRequired: z.string().min(1, 'Quantity is required'),
  quantityUnit: z.string().default('tons'),
  deliveryLocation: z.string().min(2, 'Delivery location is required'),
  expectedDeliveryDate: z.string().optional(),
  
  // Additional Information
  message: z.string().min(10, 'Please provide detailed requirements (minimum 10 characters)'),
  hearAboutUs: z.string().optional(),
  
  // Terms
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions'
  })
})

type InquiryFormData = z.infer<typeof inquirySchema>

interface B2BInquiryFormProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  product?: {
    id: string
    name: string
    category: { name: string }
    price: number
    weight?: string
  }
}

export default function B2BInquiryForm({ isOpen, onOpenChange, product }: B2BInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      companyName: '',
      contactPerson: '',
      designation: '',
      email: '',
      phone: '',
      businessType: '',
      gstNumber: '',
      address: '',
      quantityRequired: '',
      quantityUnit: 'tons',
      deliveryLocation: '',
      expectedDeliveryDate: '',
      message: product ? `I am interested in bulk procurement of ${product.name}. Please provide detailed quotation including pricing, minimum order quantity, and delivery terms.` : '',
      hearAboutUs: '',
      agreedToTerms: false
    }
  })

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true)
    
    try {
      const formData = {
        ...data,
        productId: product?.id,
        productName: product?.name,
        productCategory: product?.category?.name,
        productPrice: product?.price,
        submissionType: 'b2b_inquiry',
        submittedAt: new Date().toISOString()
      }

      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit inquiry')
      }

      const result = await response.json()
      
      toast.success('Inquiry submitted successfully!', {
        description: 'Our team will contact you within 24 hours with a detailed quotation.'
      })
      
      form.reset()
      onOpenChange(false)
      
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      toast.error('Failed to submit inquiry', {
        description: 'Please try again or contact us directly.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Package className="h-6 w-6 text-emerald-600" />
            B2B Inquiry Form
          </DialogTitle>
          <DialogDescription>
            {product ? (
              <>Requesting quote for: <span className="font-semibold text-emerald-600">{product.name}</span></>
            ) : (
              'Fill out this form to get a detailed quotation for bulk orders'
            )}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Company Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-700 border-b pb-2">
                <Building className="h-5 w-5" />
                Company Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="retailer">Retailer</SelectItem>
                          <SelectItem value="wholesaler">Wholesaler</SelectItem>
                          <SelectItem value="distributor">Distributor</SelectItem>
                          <SelectItem value="restaurant">Restaurant/Hotel</SelectItem>
                          <SelectItem value="caterer">Catering Service</SelectItem>
                          <SelectItem value="food_processor">Food Processor</SelectItem>
                          <SelectItem value="export">Export Business</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person *</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Procurement Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Email Address *
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="business@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        Phone Number *
                      </FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+91 98765 43210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gstNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter GST number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complete Business Address *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter complete address including city, state, and pincode"
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Product Requirements Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-700 border-b pb-2">
                <Package className="h-5 w-5" />
                Product Requirements
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="quantityRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity Required *</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="quantityUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tons">Tons</SelectItem>
                          <SelectItem value="kg">Kilograms</SelectItem>
                          <SelectItem value="quintal">Quintal</SelectItem>
                          <SelectItem value="bags">Bags</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="expectedDeliveryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Delivery Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="deliveryLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="City, State where delivery is required" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Additional Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-700 border-b pb-2">
                <MessageCircle className="h-5 w-5" />
                Additional Information
              </h3>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Requirements *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please provide specific requirements including quality specifications, packaging preferences, payment terms, or any other details that would help us provide an accurate quotation."
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hearAboutUs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you hear about us? (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="google_search">Google Search</SelectItem>
                        <SelectItem value="social_media">Social Media</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="trade_show">Trade Show</SelectItem>
                        <SelectItem value="advertisement">Advertisement</SelectItem>
                        <SelectItem value="existing_customer">Existing Customer</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="agreedToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm">
                        I agree to the terms and conditions and authorize Padmaaja Rasooi to contact me regarding this inquiry. *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Inquiry'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}