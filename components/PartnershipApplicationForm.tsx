'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, CheckCircle, Crown, Award, Star } from 'lucide-react'
import { signIn } from 'next-auth/react'

interface PartnershipApplicationFormProps {
  isOpen: boolean
  onClose: () => void
  selectedTier?: string
}

export default function PartnershipApplicationForm({ 
  isOpen, 
  onClose, 
  selectedTier = 'Silver' 
}: PartnershipApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    experience: '',
    partnershipTier: selectedTier,
    expectedCustomers: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    motivation: '',
    marketingPlan: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Update form data when selectedTier prop changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, partnershipTier: selectedTier }))
  }, [selectedTier])

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        businessName: '',
        businessType: '',
        experience: '',
        partnershipTier: selectedTier,
        expectedCustomers: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        motivation: '',
        marketingPlan: ''
      })
      setIsSuccess(false)
      setIsSubmitting(false)
    }
  }, [isOpen, selectedTier])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/partnership/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          expectedCustomers: parseInt(formData.expectedCustomers) || 0
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        toast.success('Application submitted successfully! Check your email for login details.')
        
        // Auto-login the user after successful registration
        setTimeout(async () => {
          try {
            await signIn('credentials', {
              email: formData.email,
              redirect: false
            })
            window.location.href = '/dashboard'
          } catch (error) {
            console.error('Auto-login failed:', error)
          }
        }, 2000)
      } else {
        toast.error(result.message || 'Application failed. Please try again.')
      }
    } catch (error) {
      console.error('Application error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Diamond': return Crown
      case 'Gold': return Award
      case 'Silver': return Star
      default: return Star
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Diamond': return '#3B82F6'
      case 'Gold': return '#F59E0B'
      case 'Silver': return '#8B5CF6'
      default: return '#8B5CF6'
    }
  }

  const getTierMaxCustomers = (tier: string) => {
    switch (tier) {
      case 'Diamond': return 3000
      case 'Gold': return 1500
      case 'Silver': return 500
      default: return 500
    }
  }

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Application Submitted!
            </h3>
            <p className="text-gray-600 mb-4">
              Welcome to Padmaaja Rasooi! Check your email for login details.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              You'll be automatically logged in and redirected to your dashboard.
            </p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Partnership Application
          </DialogTitle>
        </DialogHeader>

        {/* Selected Tier Display */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-center space-x-3">
              {(() => {
                const TierIcon = getTierIcon(formData.partnershipTier)
                return (
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{backgroundColor: `${getTierColor(formData.partnershipTier)}20`}}
                  >
                    <TierIcon 
                      className="h-6 w-6" 
                      style={{color: getTierColor(formData.partnershipTier)}} 
                    />
                  </div>
                )
              })()}
              <div>
                <h3 className="text-lg font-semibold">{formData.partnershipTier} Partner</h3>
                <p className="text-sm text-gray-600">
                  Max {getTierMaxCustomers(formData.partnershipTier).toLocaleString()} customers
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name (Optional)</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="businessType">Business Type *</Label>
                <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="retail">Retail Store</SelectItem>
                    <SelectItem value="restaurant">Restaurant/Hotel</SelectItem>
                    <SelectItem value="distributor">Distributor</SelectItem>
                    <SelectItem value="online">Online Business</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="experience">Experience in Food/Retail Business *</Label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="experienced">Experienced (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Partnership Details */}
          <Card>
            <CardHeader>
              <CardTitle>Partnership Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="partnershipTier">Partnership Tier *</Label>
                <Select value={formData.partnershipTier} onValueChange={(value) => handleInputChange('partnershipTier', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Silver">Silver (500 customers)</SelectItem>
                    <SelectItem value="Gold">Gold (1,500 customers)</SelectItem>
                    <SelectItem value="Diamond">Diamond (3,000 customers)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="expectedCustomers">Expected Customers in First Year</Label>
                <Input
                  id="expectedCustomers"
                  type="number"
                  value={formData.expectedCustomers}
                  onChange={(e) => handleInputChange('expectedCustomers', e.target.value)}
                  max={getTierMaxCustomers(formData.partnershipTier)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="motivation">Why do you want to become a partner? *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  required
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="marketingPlan">How do you plan to market our products? *</Label>
                <Textarea
                  id="marketingPlan"
                  value={formData.marketingPlan}
                  onChange={(e) => handleInputChange('marketingPlan', e.target.value)}
                  required
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
