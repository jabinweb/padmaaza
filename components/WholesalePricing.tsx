'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Gift, ShoppingCart, Users, TrendingDown } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface WholesalePricingProps {
  productId: string
  originalPrice: number
  quantity: number
}

interface PricingData {
  originalPrice: number
  finalPrice: number
  discount: number
  discountPercentage: number
  isWholesalePrice: boolean
}

export default function WholesalePricing({ 
  productId, 
  originalPrice, 
  quantity 
}: WholesalePricingProps) {
  const { data: session } = useSession()
  const [pricingData, setPricingData] = useState<PricingData | null>(null)
  const [isWholesaler, setIsWholesaler] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPricing = async () => {
      if (!session?.user) return

      setLoading(true)
      try {
        const response = await fetch('/api/pricing/wholesale', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId,
            quantity
          }),
        })

        const data = await response.json()

        if (data.success) {
          setPricingData(data.pricing)
          setIsWholesaler(data.isWholesaler)
        }
      } catch (error) {
        console.error('Failed to fetch pricing:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session?.user && productId && quantity > 0) {
      fetchPricing()
    }
  }, [session, productId, quantity])

  // Don't show if user is not logged in
  if (!session?.user) {
    return null
  }

  // Show wholesaler benefits if user is wholesaler
  if (isWholesaler) {
    return (
      <div className="space-y-3">
        <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
          <Users className="h-4 w-4 mr-1" />
          Wholesaler Account
        </Badge>

        {pricingData && quantity >= 10 && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">
                    Wholesale Discount Applied!
                  </span>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  25% OFF
                </Badge>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Original Price:</span>
                  <span className="line-through text-gray-500">
                    ₹{pricingData.originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Wholesale Price:</span>
                  <span className="text-green-600">
                    ₹{pricingData.finalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>You Save:</span>
                  <span className="text-green-600">
                    ₹{pricingData.discount.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {quantity < 10 && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">
                  Add {10 - quantity} more items for 25% wholesale discount
                </span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Minimum 10 items required for bulk pricing
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  // Show wholesaler invitation if user is not a wholesaler
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingDown className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-blue-800">
            Want Wholesale Prices?
          </span>
        </div>
        <p className="text-sm text-blue-700 mb-3">
          Join our wholesaler program and get 25% off on bulk orders!
        </p>
        <div className="space-y-1 text-xs text-blue-600">
          <div>• 25% discount on orders of 10+ items</div>
          <div>• Dedicated account manager</div>
          <div>• Priority support</div>
          <div>• Flexible payment terms</div>
        </div>
        <a 
          href="/wholesaler" 
          className="inline-block mt-3 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Register as Wholesaler →
        </a>
      </CardContent>
    </Card>
  )
}
