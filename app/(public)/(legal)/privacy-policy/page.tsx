import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Shield, Eye, Lock, Users, Mail, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Padmaaja Rasooi - Your Data Protection Rights',
  description: 'Learn how Padmaaja Rasooi protects your personal information, handles data collection, and ensures your privacy rights are respected.',
  keywords: 'privacy policy, data protection, personal information, GDPR compliance, data security, Padmaaja Rasooi',
  openGraph: {
    title: 'Privacy Policy | Padmaaja Rasooi',
    description: 'Comprehensive privacy policy outlining how we protect your personal data and respect your privacy rights.',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-12 w-12 text-green-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At Padmaaja Rasooi, we are committed to protecting your privacy and ensuring 
            the security of your personal information. This policy explains how we collect, 
            use, and safeguard your data.
          </p>
          <Badge variant="outline" className="mt-4">
            Last Updated: August 30, 2025
          </Badge>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2 text-green-600" />
              Our Commitment to Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Padmaaja Rasooi (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting 
              your personal data. This privacy policy will inform you about how we look after your 
              personal data when you visit our website, purchase our premium rice products, or engage 
              with our business partnership program.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This policy applies to all visitors, customers, and participants in our business network. 
              We are committed to complying with applicable data protection laws, including GDPR and 
              local privacy regulations.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Name, email address, phone number, and postal address</li>
                <li>Date of birth and government-issued ID (for age verification)</li>
                <li>Bank account details and payment information (securely processed)</li>
                <li>Profile photos and identification documents</li>
                <li>Communication preferences and marketing consents</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Business network position and referral relationships</li>
                <li>Sales volume, commissions, and earnings data</li>
                <li>Order history and product preferences</li>
                <li>Performance metrics and achievement records</li>
                <li>Training completion and certification status</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Information</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>IP address, browser type, and device information</li>
                <li>Website usage data and navigation patterns</li>
                <li>Cookie data and local storage information</li>
                <li>Session recordings for customer support purposes</li>
                <li>Location data (with your consent)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2 text-green-600" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Service Provision</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Process orders and deliver products</li>
                  <li>Manage your business account and network</li>
                  <li>Calculate and process commissions</li>
                  <li>Provide customer support services</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Communication</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Send order confirmations and updates</li>
                  <li>Provide business opportunity information</li>
                  <li>Share promotional offers (with consent)</li>
                  <li>Send important policy updates</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Legal Compliance</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Verify identity and prevent fraud</li>
                  <li>Comply with tax reporting requirements</li>
                  <li>Meet regulatory obligations</li>
                  <li>Respond to legal requests</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Business Improvement</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Analyze website usage and performance</li>
                  <li>Improve products and services</li>
                  <li>Develop new business features</li>
                  <li>Conduct market research</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Sharing and Disclosure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information only in the following circumstances:
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 mb-2">Authorized Sharing</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-amber-700">
                <li>With your upline/downline for legitimate business purposes</li>
                <li>With payment processors for transaction processing</li>
                <li>With logistics partners for product delivery</li>
                <li>With government authorities when legally required</li>
                <li>With professional advisors under confidentiality agreements</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Security Measures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate technical and organizational measures to protect 
              your personal data against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Technical Safeguards</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-green-700">
                  <li>SSL/TLS encryption</li>
                  <li>Secure data centers</li>
                  <li>Regular security audits</li>
                  <li>Access controls</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Administrative Controls</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-blue-700">
                  <li>Employee training</li>
                  <li>Data handling policies</li>
                  <li>Incident response procedures</li>
                  <li>Regular updates</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Physical Security</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-purple-700">
                  <li>Secured facilities</li>
                  <li>Access restrictions</li>
                  <li>Surveillance systems</li>
                  <li>Device protection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              You have several rights regarding your personal data. You may exercise these 
              rights by contacting us using the information provided below.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Access & Portability</h4>
                <p className="text-sm text-gray-600">
                  Request access to your personal data and receive a copy in a portable format.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Rectification</h4>
                <p className="text-sm text-gray-600">
                  Request correction of inaccurate or incomplete personal data.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Erasure</h4>
                <p className="text-sm text-gray-600">
                  Request deletion of your personal data (subject to legal obligations).
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Restriction</h4>
                <p className="text-sm text-gray-600">
                  Request limitation of processing of your personal data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-green-600" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              If you have any questions about this privacy policy or wish to exercise your 
              privacy rights, please contact us:
            </p>
            
            <div className="bg-gray-50 border rounded-lg p-4 space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-600 mr-2" />
                <span className="text-sm">Email: privacy@padmaajarasooi.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-600 mr-2" />
                <span className="text-sm">Phone: +91 (Customer Service)</span>
              </div>
              <div className="flex items-start">
                <div className="h-4 w-4 text-gray-600 mr-2 mt-0.5">📍</div>
                <span className="text-sm">
                  Address: Padmaaja Rasooi Headquarters<br />
                  [Complete Address]<br />
                  India
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updates Notice */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                We may update this privacy policy from time to time. We will notify you of 
                any material changes by posting the new policy on our website.
              </p>
              <Badge variant="secondary">
                Effective Date: August 30, 2025
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
