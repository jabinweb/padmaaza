import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FileText, Scale, AlertTriangle, Users, ShoppingCart, Gavel } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | Padmaaja Rasool - Business Agreement & Policies',
  description: 'Read our comprehensive terms of service covering business partnership, product purchases, and business conduct for Padmaaja Rasool premium rice products.',
  keywords: 'terms of service, business partnership, business agreement, legal terms, conditions, Padmaaja Rasool, rice products',
  openGraph: {
    title: 'Terms of Service | Padmaaja Rasool',
    description: 'Legal terms and conditions for participating in our business network and purchasing our premium rice products.',
    type: 'website',
  },
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Scale className="h-12 w-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These terms govern your use of our website, purchase of products, and participation 
            in the Padmaaja Rasool business partnership program.
          </p>
          <Badge variant="outline" className="mt-4">
            Last Updated: August 30, 2025
          </Badge>
        </div>

        {/* Important Notice */}
        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Important:</strong> By accessing our website, purchasing our products, or participating 
            in our business partnership program, you agree to be bound by these terms. Please read them carefully.
          </AlertDescription>
        </Alert>

        {/* Acceptance of Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Acceptance of Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you 
              and Padmaaja Rasool (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms apply to:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Website Usage</h4>
                <p className="text-sm text-blue-700">
                  Browsing, accessing, and using our website and mobile applications.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Product Purchases</h4>
                <p className="text-sm text-green-700">
                  Buying our premium rice products for personal consumption or resale.
                </p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Business Partnership</h4>
                <p className="text-sm text-purple-700">
                  Joining and participating in our rice business partnership opportunity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Partnership Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Business Partnership Program
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Eligibility Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Must be at least 18 years of age or the age of majority in your jurisdiction</li>
                <li>Must provide accurate and complete registration information</li>
                <li>Must comply with all applicable laws and regulations in your territory</li>
                <li>Must not have been previously terminated from our program for violations</li>
                <li>Must maintain active status through minimum purchase requirements</li>
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Participant Obligations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Business Conduct</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Represent products and business opportunity honestly</li>
                    <li>Comply with all marketing guidelines and policies</li>
                    <li>Maintain professional conduct in all business activities</li>
                    <li>Protect confidential and proprietary information</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Legal Compliance</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Obtain necessary business licenses and permits</li>
                    <li>Pay all applicable taxes on earnings</li>
                    <li>Follow local direct selling regulations</li>
                    <li>Maintain accurate records of business activities</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Commission Structure</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800 mb-2">
                  <strong>Important:</strong> Commissions are based solely on actual product sales to end consumers. 
                  Our compensation plan complies with applicable business partnership regulations.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                  <li>Personal sales commissions on direct product sales</li>
                  <li>Team bonuses based on group sales volume</li>
                  <li>Achievement rewards for reaching sales milestones</li>
                  <li>Leadership bonuses for developing successful teams</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
              Product Purchase Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Quality & Authenticity</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All Padmaaja Rasool rice products are sourced from certified farms and undergo 
                rigorous quality control processes. We guarantee the authenticity and quality 
                of our products when purchased through authorized channels.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">Quality Assurance</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-amber-700">
                  <li>Premium grade rice sourced directly from certified farms</li>
                  <li>Strict quality control and testing procedures</li>
                  <li>Proper packaging and storage to maintain freshness</li>
                  <li>Clear labeling with nutritional information and origin details</li>
                </ul>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pricing & Payment</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Pricing Policy</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>All prices are in Indian Rupees (INR)</li>
                    <li>Prices include applicable taxes unless stated otherwise</li>
                    <li>Shipping costs calculated separately</li>
                    <li>Prices subject to change without prior notice</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Payment Terms</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Payment required at time of order</li>
                    <li>Accepted payment methods as displayed</li>
                    <li>Secure payment processing via trusted gateways</li>
                    <li>No storage of payment card information</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping & Delivery</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We strive to process and ship orders within 1-2 business days. Delivery times 
                vary based on location and shipping method selected.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">1-2</div>
                  <div className="text-sm text-gray-600">Processing Days</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">3-7</div>
                  <div className="text-sm text-gray-600">Delivery Days</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-gray-600">Tracking Provided</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prohibited Activities */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gavel className="h-5 w-5 mr-2 text-red-600" />
              Prohibited Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              The following activities are strictly prohibited and may result in immediate 
              termination of your account and/or legal action:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-red-800">Marketing Violations</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Making false or misleading product claims</li>
                  <li>Promising unrealistic income potential</li>
                  <li>Using unauthorized marketing materials</li>
                  <li>Violating advertising guidelines</li>
                  <li>Spamming or unsolicited communications</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-red-800">Business Misconduct</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Cross-recruiting or poaching participants</li>
                  <li>Operating competing rice business partnerships</li>
                  <li>Manipulating commission structures</li>
                  <li>Selling counterfeit or unauthorized products</li>
                  <li>Violating territorial restrictions</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-red-800">Legal Violations</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Any illegal or fraudulent activities</li>
                  <li>Money laundering or financial crimes</li>
                  <li>Harassment or discriminatory behavior</li>
                  <li>Intellectual property infringement</li>
                  <li>Tax evasion or non-compliance</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-red-800">Technical Abuse</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Hacking or unauthorized system access</li>
                  <li>Creating multiple fake accounts</li>
                  <li>Automated bot or script usage</li>
                  <li>Reverse engineering our software</li>
                  <li>Data scraping or unauthorized data collection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, Padmaaja Rasool shall not be liable 
              for any indirect, incidental, special, consequential, or punitive damages, 
              including but not limited to:
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2 text-sm text-red-800">
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>Loss of data or confidential information</li>
                <li>Business interruption or service unavailability</li>
                <li>Third-party actions or claims</li>
                <li>Any damages exceeding the amount paid to us in the preceding 12 months</li>
              </ul>
            </div>
            
            <p className="text-sm text-gray-600 italic">
              This limitation applies regardless of the legal theory of liability, whether in 
              contract, tort, strict liability, or otherwise.
            </p>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Termination by You</h4>
                <p className="text-sm text-gray-700 mb-2">
                  You may terminate your participation at any time by:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Providing written notice to us</li>
                  <li>Ceasing all business activities</li>
                  <li>Returning any confidential materials</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Termination by Us</h4>
                <p className="text-sm text-gray-700 mb-2">
                  We may terminate your account for:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Violation of these terms</li>
                  <li>Illegal or unethical conduct</li>
                  <li>Inactivity for extended periods</li>
                  <li>Non-payment of obligations</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Effects of Termination</h4>
              <p className="text-sm text-yellow-700">
                Upon termination, all commissions earned but not yet paid may be forfeited, 
                access to business tools will be revoked, and you must cease all use of our 
                trademarks and business materials.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Governing Law & Dispute Resolution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              These Terms are governed by the laws of India. Any disputes arising from these 
              Terms or your use of our services shall be resolved through:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-lg font-semibold text-blue-600 mb-2">Step 1</div>
                <div className="text-sm text-gray-700">Direct Negotiation</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-lg font-semibold text-green-600 mb-2">Step 2</div>
                <div className="text-sm text-gray-700">Mediation</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-lg font-semibold text-purple-600 mb-2">Step 3</div>
                <div className="text-sm text-gray-700">Arbitration</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Questions About These Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            
            <div className="bg-gray-50 border rounded-lg p-4 space-y-2">
              <div className="flex items-center">
                <span className="text-sm"><strong>Email:</strong> legal@padmaajarasool.com</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm"><strong>Phone:</strong> +91 [Legal Department]</span>
              </div>
              <div className="flex items-start">
                <span className="text-sm">
                  <strong>Address:</strong> Legal Department<br />
                  Padmaaja Rasool Headquarters<br />
                  [Complete Address], India
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final Notice */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                These Terms of Service constitute the entire agreement between you and Padmaaja Rasool. 
                If any provision is found to be unenforceable, the remaining provisions will remain in full effect.
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
