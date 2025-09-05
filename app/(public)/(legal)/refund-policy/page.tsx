import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { RotateCcw, Clock, CheckCircle, XCircle, AlertCircle, Mail, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Refund Policy | Padmaaja Rasooi - Returns & Refund Guidelines',
  description: 'Comprehensive refund and return policy for Padmaaja Rasooi rice products. Learn about eligibility, process, and timelines for returns.',
  keywords: 'refund policy, return policy, money back guarantee, product returns, refund process, Padmaaja Rasooi',
  openGraph: {
    title: 'Refund Policy | Padmaaja Rasooi',
    description: 'Clear guidelines for product returns and refunds to ensure customer satisfaction.',
    type: 'website',
  },
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <RotateCcw className="h-12 w-12 text-purple-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Refund Policy</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We stand behind the quality of our premium rice products. This policy outlines 
            our commitment to customer satisfaction and the process for returns and refunds.
          </p>
          <Badge variant="outline" className="mt-4">
            Last Updated: August 30, 2025
          </Badge>
        </div>

        {/* Satisfaction Guarantee */}
        <Alert className="mb-8 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>100% Satisfaction Guarantee:</strong> We are committed to your satisfaction. 
            If you&apos;re not completely happy with your purchase, we&apos;ll make it right within our policy guidelines.
          </AlertDescription>
        </Alert>

        {/* Return Eligibility */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-purple-600" />
              Return Eligibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligible Returns</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-800">✅ Returnable Items</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>Unopened rice packages in original packaging</li>
                    <li>Products damaged during shipping</li>
                    <li>Wrong items delivered due to our error</li>
                    <li>Defective or contaminated products</li>
                    <li>Products not matching the description</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-red-800">❌ Non-Returnable Items</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>Opened or used rice products (food safety)</li>
                    <li>Products damaged by customer mishandling</li>
                    <li>Items purchased on clearance or special offer</li>
                    <li>Products past 30-day return window</li>
                    <li>Customized or personalized products</li>
                  </ul>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Return Conditions</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-blue-800">
                  <li><strong>Time Limit:</strong> Returns must be initiated within 30 days of delivery</li>
                  <li><strong>Original Packaging:</strong> Items must be in original, unopened packaging</li>
                  <li><strong>Proof of Purchase:</strong> Valid order number or receipt required</li>
                  <li><strong>Product Condition:</strong> Items must be unused and in resalable condition</li>
                  <li><strong>Return Authorization:</strong> Pre-approval required before sending items back</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Return Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-600" />
              Return Process
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-purple-200 rounded-lg bg-purple-50">
                <div className="text-2xl font-bold text-purple-600 mb-2">1</div>
                <div className="text-sm font-medium text-purple-800">Contact Us</div>
                <div className="text-xs text-purple-700 mt-1">
                  Reach out within 30 days of delivery
                </div>
              </div>
              
              <div className="text-center p-4 border border-blue-200 rounded-lg bg-blue-50">
                <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
                <div className="text-sm font-medium text-blue-800">Get Authorization</div>
                <div className="text-xs text-blue-700 mt-1">
                  Receive return authorization number
                </div>
              </div>
              
              <div className="text-center p-4 border border-green-200 rounded-lg bg-green-50">
                <div className="text-2xl font-bold text-green-600 mb-2">3</div>
                <div className="text-sm font-medium text-green-800">Ship Items</div>
                <div className="text-xs text-green-700 mt-1">
                  Package and send items back to us
                </div>
              </div>
              
              <div className="text-center p-4 border border-amber-200 rounded-lg bg-amber-50">
                <div className="text-2xl font-bold text-amber-600 mb-2">4</div>
                <div className="text-sm font-medium text-amber-800">Get Refund</div>
                <div className="text-xs text-amber-700 mt-1">
                  Receive refund after inspection
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Steps</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-purple-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Initiate Return Request</h4>
                    <p className="text-sm text-gray-700">
                      Contact our customer service team via email or phone with your order number, 
                      reason for return, and photos if applicable (for damaged items).
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Return Authorization</h4>
                    <p className="text-sm text-gray-700">
                      Once approved, you&apos;ll receive a Return Authorization (RA) number and 
                      return shipping instructions. Do not ship without an RA number.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-green-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Package & Ship</h4>
                    <p className="text-sm text-gray-700">
                      Securely package the items in original packaging, include the RA number, 
                      and ship to the provided return address. Keep tracking information.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-amber-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Inspection & Refund</h4>
                    <p className="text-sm text-gray-700">
                      We&apos;ll inspect the returned items within 3-5 business days and process 
                      your refund if everything meets our return conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Refund Methods & Timelines */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Refund Methods & Timelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Refund Options</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-green-600 font-bold">₹</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Original Payment Method</h4>
                    <p className="text-sm text-gray-700">
                      Refund to the original payment method used for purchase
                    </p>
                    <div className="mt-3 text-xs text-green-600 font-medium">
                      5-10 business days
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold">🏦</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Bank Transfer</h4>
                    <p className="text-sm text-gray-700">
                      Direct transfer to your bank account (for large orders)
                    </p>
                    <div className="mt-3 text-xs text-blue-600 font-medium">
                      3-5 business days
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 font-bold">💳</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Store Credit</h4>
                    <p className="text-sm text-gray-700">
                      Account credit for future purchases (optional)
                    </p>
                    <div className="mt-3 text-xs text-purple-600 font-medium">
                      Immediate
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Timeline</h3>
              <div className="bg-gray-50 border rounded-lg p-4">
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">1-2 Days</div>
                    <div className="text-sm text-gray-600">Return Received</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">3-5 Days</div>
                    <div className="text-sm text-gray-600">Quality Inspection</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">1 Day</div>
                    <div className="text-sm text-gray-600">Refund Processing</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">5-10 Days</div>
                    <div className="text-sm text-gray-600">Amount Credited</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Costs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Return Shipping Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-800">🆓 Free Return Shipping</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Defective or damaged products</li>
                  <li>Wrong items sent due to our error</li>
                  <li>Products not matching description</li>
                  <li>Quality issues with rice</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-amber-800">💰 Customer Pays Shipping</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Change of mind returns</li>
                  <li>Ordered wrong quantity/variety</li>
                  <li>No longer needed</li>
                  <li>Personal preference changes</li>
                </ul>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Tip:</strong> For expensive return shipping, consider our exchange option 
                instead of a refund to save on shipping costs.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Exchanges */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Exchange Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              We offer exchanges for different rice varieties or quantities of equal or lesser value. 
              Exchanges follow the same timeline as returns but may be faster since no refund processing is required.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Exchange Benefits</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                  <li>Faster processing than refunds</li>
                  <li>Try different rice varieties</li>
                  <li>Adjust order quantities</li>
                  <li>No refund processing delays</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Exchange Process</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                  <li>Follow same return authorization process</li>
                  <li>Specify desired exchange item</li>
                  <li>Pay any price difference if applicable</li>
                  <li>Receive new shipment after inspection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Special Circumstances */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Special Circumstances</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Partnership Returns</h3>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-amber-800 text-sm mb-3">
                  <strong>Important for Business Partners:</strong> Special rules apply for business inventory returns.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-amber-700">
                  <li>Wholesale purchases may have different return terms</li>
                  <li>Commission adjustments may apply to returned inventory</li>
                  <li>Bulk order returns require additional approval</li>
                  <li>Seasonal promotion items may have restricted return periods</li>
                </ul>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Holiday Season Policy</h3>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800 text-sm mb-3">
                  <strong>Extended Holiday Returns:</strong> Special provisions during festival seasons.
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-purple-700">
                  <li>Extended 45-day return window during Diwali season</li>
                  <li>Gift purchases have extended return periods</li>
                  <li>Festival bulk orders eligible for partial returns</li>
                  <li>Special handling for wedding and celebration orders</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact for Returns */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-purple-600" />
              Contact for Returns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Our customer service team is here to help with all return and refund requests. 
              Please have your order number ready when contacting us.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-gray-900">Customer Service</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-600 mr-2" />
                    <span className="text-sm">returns@padmaajarasooi.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-600 mr-2" />
                    <span className="text-sm">+91 [Customer Service]</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Hours:</strong> Mon-Sat, 9:00 AM - 6:00 PM IST
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-gray-900">Return Address</h4>
                <div className="text-sm text-gray-700">
                  <strong>Padmaaja Rasooi Returns Center</strong><br />
                  [Return Processing Facility Address]<br />
                  [City, State, PIN Code]<br />
                  India
                </div>
                <div className="text-xs text-red-600">
                  ⚠️ Do not ship without Return Authorization number
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button variant="default" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Start Return Request
              </Button>
              <Button variant="outline" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call Customer Service
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Final Notes */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Important Notes</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <ul className="text-sm text-yellow-800 space-y-2">
                  <li>• This policy applies to purchases made directly from Padmaaja Rasooi</li>
                  <li>• Third-party retailer purchases may have different return policies</li>
                  <li>• We reserve the right to refuse returns that don&apos;t meet our conditions</li>
                  <li>• Fraudulent return attempts will result in account suspension</li>
                  <li>• This policy is subject to change with 30 days notice</li>
                </ul>
              </div>
              
              <Badge variant="secondary" className="mt-4">
                Policy Effective: August 30, 2025
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
