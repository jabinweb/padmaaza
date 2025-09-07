import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { PricingService } from '@/lib/pricing'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { productId, quantity } = await request.json()

    if (!productId || !quantity) {
      return NextResponse.json(
        { error: 'Product ID and quantity are required' },
        { status: 400 }
      )
    }

    // Get user role
    const userRole = await PricingService.getUserRole(session.user.id)

    // Calculate pricing
    const pricing = await PricingService.getEffectivePrice(
      productId,
      quantity,
      {
        userId: session.user.id,
        userRole: userRole || undefined,
        quantity
      }
    )

    // Get wholesale discount info
    const wholesaleInfo = PricingService.getWholesaleDiscountInfo()

    return NextResponse.json({
      success: true,
      pricing,
      wholesaleInfo,
      userRole,
      isWholesaler: userRole === 'WHOLESALER'
    })

  } catch (error) {
    console.error('Pricing calculation error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to calculate pricing' 
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is wholesaler
    const isWholesaler = await PricingService.isWholesaler(session.user.id)
    const wholesaleInfo = PricingService.getWholesaleDiscountInfo()

    return NextResponse.json({
      success: true,
      isWholesaler,
      wholesaleInfo
    })

  } catch (error) {
    console.error('Wholesale check error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check wholesale status' 
      },
      { status: 500 }
    )
  }
}
