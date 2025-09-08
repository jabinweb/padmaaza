'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  FileText, 
  CheckCircle,
  Loader2,
  Award,
  GraduationCap
} from 'lucide-react'
import { toast } from 'sonner'

interface PartTimeRegistrationFormProps {
  isOpen: boolean
  onClose: () => void
}

interface PartTimeFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  age: string
  gender: string
  
  // Address Information
  address: string
  city: string
  state: string
  zipCode: string
  
  // Professional Information
  education: string
  experience: string
  preferredRole: string
  availableHours: string
  availableDays: string
  
  // Additional Information
  skills: string
  motivation: string
  previousWorkExperience: string
  languagesKnown: string
}

export default function PartTimeRegistrationForm({ isOpen, onClose }: PartTimeRegistrationFormProps) {
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [loginCredentials, setLoginCredentials] = useState<{
    email: string
    password: string
  } | null>(null)

  const [formData, setFormData] = useState<PartTimeFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    education: '',
    experience: '',
    preferredRole: '',
    availableHours: '',
    availableDays: '',
    skills: '',
    motivation: '',
    previousWorkExperience: '',
    languagesKnown: ''
  })

  const handleInputChange = (field: keyof PartTimeFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/part-time/register', {
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
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        education: '',
        experience: '',
        preferredRole: '',
        availableHours: '',
        availableDays: '',
        skills: '',
        motivation: '',
        previousWorkExperience: '',
        languagesKnown: ''
      })

      toast.success('Part-time job application submitted successfully!')
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error instanceof Error ? error.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center">
              <Briefcase className="h-6 w-6 mr-3" />
              Part-Time Job Application
            </DialogTitle>
            <DialogDescription>
              Apply for flexible part-time opportunities and start earning extra income
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-center gap-4 mb-6">
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              Flexible Hours
            </Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2">
              <Award className="h-4 w-4 mr-2" />
              Performance Bonuses
            </Badge>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-purple-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    className="mt-1"
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
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-purple-600" />
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="education">Education Level *</Label>
                  <Select value={formData.education} onValueChange={(value) => handleInputChange('education', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience">Work Experience *</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresher">Fresher (0 years)</SelectItem>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferredRole">Preferred Job Role *</Label>
                  <Select value={formData.preferredRole} onValueChange={(value) => handleInputChange('preferredRole', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select preferred role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social-media">Social Media Marketing</SelectItem>
                      <SelectItem value="customer-support">Customer Support</SelectItem>
                      <SelectItem value="sales">Sales Representative</SelectItem>
                      <SelectItem value="content-creator">Content Creator</SelectItem>
                      <SelectItem value="email-marketing">Email Marketing</SelectItem>
                      <SelectItem value="business-development">Business Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="availableHours">Available Hours per Day *</Label>
                  <Select value={formData.availableHours} onValueChange={(value) => handleInputChange('availableHours', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select available hours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-3">2-3 hours</SelectItem>
                      <SelectItem value="4-5">4-5 hours</SelectItem>
                      <SelectItem value="6-7">6-7 hours</SelectItem>
                      <SelectItem value="8+">8+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="availableDays">Available Days *</Label>
                  <Select value={formData.availableDays} onValueChange={(value) => handleInputChange('availableDays', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select available days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekdays">Weekdays (Mon-Fri)</SelectItem>
                      <SelectItem value="weekends">Weekends (Sat-Sun)</SelectItem>
                      <SelectItem value="all-days">All Days</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-600" />
                Additional Information
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="skills">Skills & Expertise</Label>
                  <Textarea
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    placeholder="List your relevant skills, software knowledge, etc."
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="languagesKnown">Languages Known</Label>
                  <Input
                    id="languagesKnown"
                    value={formData.languagesKnown}
                    onChange={(e) => handleInputChange('languagesKnown', e.target.value)}
                    placeholder="e.g., Hindi, English, Regional languages"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="previousWorkExperience">Previous Work Experience</Label>
                  <Textarea
                    id="previousWorkExperience"
                    value={formData.previousWorkExperience}
                    onChange={(e) => handleInputChange('previousWorkExperience', e.target.value)}
                    placeholder="Describe your previous work experience (if any)"
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="motivation">Why do you want to work part-time with us? *</Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) => handleInputChange('motivation', e.target.value)}
                    placeholder="Tell us about your motivation and what you hope to achieve"
                    className="mt-1"
                    rows={4}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Briefcase className="h-5 w-5 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <CheckCircle className="h-6 w-6 mr-2" />
              Application Submitted!
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4">
                <p>Your part-time job application has been submitted successfully!</p>
                
                {loginCredentials && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Your Login Credentials:</h4>
                    <p><strong>Email:</strong> {loginCredentials.email}</p>
                    <p><strong>Password:</strong> {loginCredentials.password}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Please save these credentials. You'll receive a welcome email shortly.
                    </p>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">What's Next?</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Our HR team will review your application</li>
                    <li>• You'll receive a call within 2-3 business days</li>
                    <li>• Complete the interview process</li>
                    <li>• Start your part-time job journey!</li>
                  </ul>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setShowSuccessModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
