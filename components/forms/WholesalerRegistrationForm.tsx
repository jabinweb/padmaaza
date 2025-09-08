'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  Store, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  FileText, 
  CheckCircle,
  Loader2,
  Gift
} from 'lucide-react'
import { toast } from 'sonner'

interface WholesalerRegistrationFormProps {
  isOpen: boolean
  onClose: () => void
}

interface WholesalerFormData {
  // Business Information
  businessName: string
  businessType: string
  gstNumber: string
  panNumber: string
  
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Address Information
  address: string
  city: string
  state: string
  zipCode: string
  
  // Business Details
  experience: string
  expectedOrderVolume: string
  productCategories: string
  businessDescription: string
}

export default function WholesalerRegistrationForm({ isOpen, onClose }: WholesalerRegistrationFormProps) {
  const [formData, setFormData] = useState<WholesalerFormData>({
    businessName: '',
    businessType: '',
    gstNumber: '',
    panNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    experience: '',
    expectedOrderVolume: '',
    productCategories: '',
    businessDescription: ''
  })

  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState<{
    email: string
    password: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/wholesaler/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      setLoginCredentials(data.loginCredentials)
      setShowSuccessModal(true)
      onClose() // Close the main registration modal
      
      // Reset form
      setFormData({
        businessName: '',
        businessType: '',
        gstNumber: '',
        panNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        experience: '',
        expectedOrderVolume: '',
        productCategories: '',
        businessDescription: ''
      })

      toast.success('Wholesaler registration successful!')
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error instanceof Error ? error.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof WholesalerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center">
              <Building className="h-6 w-6 mr-3" />
              Wholesaler Registration
            </DialogTitle>
            <DialogDescription>
              Join our network and get exclusive access to premium products with 25% wholesale discount on bulk orders
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center gap-4 mb-6">
            <Badge className="bg-green-100 text-green-800 px-4 py-2">
              <Gift className="h-4 w-4 mr-2" />
              25% Discount
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
              <Store className="h-4 w-4 mr-2" />
              Bulk Orders
            </Badge>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Business Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Building className="h-5 w-5 mr-2 text-blue-600" />
                      Business Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="businessName">Business Name *</Label>
                        <Input
                          id="businessName"
                          value={formData.businessName}
                          onChange={(e) => handleInputChange('businessName', e.target.value)}
                          placeholder="Enter your business name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessType">Business Type *</Label>
                        <Select onValueChange={(value) => handleInputChange('businessType', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="retail">Retail Store</SelectItem>
                            <SelectItem value="distributor">Distributor</SelectItem>
                            <SelectItem value="restaurant">Restaurant/Hotel</SelectItem>
                            <SelectItem value="supermarket">Supermarket</SelectItem>
                            <SelectItem value="export">Export Business</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="gstNumber">GST Number</Label>
                        <Input
                          id="gstNumber"
                          value={formData.gstNumber}
                          onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                          placeholder="Enter GST number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="panNumber">PAN Number</Label>
                        <Input
                          id="panNumber"
                          value={formData.panNumber}
                          onChange={(e) => handleInputChange('panNumber', e.target.value)}
                          placeholder="Enter PAN number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-blue-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Enter your last name"
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
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                      Address Information
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <Label htmlFor="address">Business Address *</Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Enter your complete business address"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="Enter city"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            placeholder="Enter state"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            placeholder="Enter ZIP code"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-600" />
                      Business Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="experience">Business Experience</Label>
                        <Select onValueChange={(value) => handleInputChange('experience', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">Startup (0-1 years)</SelectItem>
                            <SelectItem value="growing">Growing (1-3 years)</SelectItem>
                            <SelectItem value="established">Established (3-5 years)</SelectItem>
                            <SelectItem value="mature">Mature (5+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="expectedOrderVolume">Expected Monthly Order Volume</Label>
                        <Select onValueChange={(value) => handleInputChange('expectedOrderVolume', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select volume" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small (₹1L - ₹5L)</SelectItem>
                            <SelectItem value="medium">Medium (₹5L - ₹20L)</SelectItem>
                            <SelectItem value="large">Large (₹20L - ₹50L)</SelectItem>
                            <SelectItem value="enterprise">Enterprise (₹50L+)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Label htmlFor="productCategories">Product Categories of Interest</Label>
                      <Input
                        id="productCategories"
                        value={formData.productCategories}
                        onChange={(e) => handleInputChange('productCategories', e.target.value)}
                        placeholder="e.g., Basmati Rice, Non-Basmati Rice, Organic Rice"
                      />
                    </div>
                    <div className="mt-6">
                      <Label htmlFor="businessDescription">Business Description</Label>
                      <Textarea
                        id="businessDescription"
                        value={formData.businessDescription}
                        onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                        placeholder="Tell us about your business, target market, and goals"
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Wholesaler Benefits:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 25% discount on all bulk orders</li>
                      <li>• Dedicated account manager</li>
                      <li>• Priority customer support</li>
                      <li>• Flexible payment terms</li>
                      <li>• Quality guarantee on all products</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <Store className="h-5 w-5 mr-2" />
                        Register as Wholesaler
                      </>
                    )}
                  </Button>
                </form>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <CheckCircle className="h-6 w-6 mr-2" />
              Registration Successful!
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4">
                <p>Your wholesaler account has been created successfully!</p>
                
                {loginCredentials && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Your Login Credentials:</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Email:</span> {loginCredentials.email}
                      </div>
                      <div>
                        <span className="font-medium">Password:</span> {loginCredentials.password}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Please save these credentials and change your password after first login.
                    </p>
                  </div>
                )}
                
                <div className="text-sm text-gray-600">
                  <p>• You will receive a confirmation email shortly</p>
                  <p>• Our team will contact you within 24 hours</p>
                  <p>• You can now access 25% wholesale discounts</p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
