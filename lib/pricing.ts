import { prisma } from '@/lib/prisma'

export interface PricingOptions {
  userId?: string
  userRole?: string
  quantity?: number
  isWholesaler?: boolean
}

export class PricingService {
  // Get effective price for a product based on user role and quantity
  static async getEffectivePrice(
    productId: string, 
    quantity: number = 1,
    options: PricingOptions = {}
  ): Promise<{
    originalPrice: number
    finalPrice: number
    discount: number
    discountPercentage: number
    isWholesalePrice: boolean
  }> {
    // Get the product
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      throw new Error('Product not found')
    }

    const originalPrice = product.price
    let finalPrice = originalPrice
    let discount = 0
    let discountPercentage = 0
    let isWholesalePrice = false

    // Apply product discount first
    if (product.discount > 0) {
      discount = (originalPrice * product.discount) / 100
      finalPrice = originalPrice - discount
      discountPercentage = product.discount
    }

    // Check if user is a wholesaler and quantity qualifies for bulk discount
    if (options.userRole === 'WHOLESALER' && this.isQualifyingBulkOrder(quantity)) {
      // Apply 25% wholesale discount on top of existing discount
      const wholesaleDiscount = (originalPrice * 25) / 100
      
      // Use the better discount (wholesale or product discount)
      if (wholesaleDiscount > discount) {
        discount = wholesaleDiscount
        finalPrice = originalPrice - discount
        discountPercentage = 25
        isWholesalePrice = true
      }
    }

    return {
      originalPrice,
      finalPrice: Math.max(finalPrice, 0), // Ensure price doesn't go negative
      discount,
      discountPercentage,
      isWholesalePrice
    }
  }

  // Check if quantity qualifies for bulk order discount
  static isQualifyingBulkOrder(quantity: number): boolean {
    // Define minimum quantity for bulk orders (e.g., 10 or more items)
    const BULK_ORDER_MIN_QUANTITY = 10
    return quantity >= BULK_ORDER_MIN_QUANTITY
  }

  // Calculate cart total with wholesale discounts
  static async calculateCartTotal(
    cartItems: Array<{
      productId: string
      quantity: number
    }>,
    options: PricingOptions = {}
  ): Promise<{
    subtotal: number
    totalDiscount: number
    finalTotal: number
    items: Array<{
      productId: string
      quantity: number
      originalPrice: number
      finalPrice: number
      discount: number
      discountPercentage: number
      isWholesalePrice: boolean
      lineTotal: number
    }>
    hasWholesaleDiscount: boolean
  }> {
    let subtotal = 0
    let totalDiscount = 0
    let finalTotal = 0
    let hasWholesaleDiscount = false
    const items = []

    for (const item of cartItems) {
      const pricing = await this.getEffectivePrice(
        item.productId,
        item.quantity,
        options
      )

      const lineTotal = pricing.finalPrice * item.quantity
      const lineDiscount = pricing.discount * item.quantity

      subtotal += pricing.originalPrice * item.quantity
      totalDiscount += lineDiscount
      finalTotal += lineTotal

      if (pricing.isWholesalePrice) {
        hasWholesaleDiscount = true
      }

      items.push({
        productId: item.productId,
        quantity: item.quantity,
        originalPrice: pricing.originalPrice,
        finalPrice: pricing.finalPrice,
        discount: pricing.discount,
        discountPercentage: pricing.discountPercentage,
        isWholesalePrice: pricing.isWholesalePrice,
        lineTotal
      })
    }

    return {
      subtotal,
      totalDiscount,
      finalTotal,
      items,
      hasWholesaleDiscount
    }
  }

  // Get user role for pricing calculations
  static async getUserRole(userId: string): Promise<string | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    return user?.role || null
  }

  // Get wholesale discount info for display
  static getWholesaleDiscountInfo() {
    return {
      discountPercentage: 25,
      minQuantity: 10,
      description: 'Get 25% off on bulk orders (10+ items) as a registered wholesaler'
    }
  }

  // Check if user is eligible for wholesale pricing
  static async isWholesaler(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, isActive: true }
    })

    return user?.role === 'WHOLESALER' && user?.isActive === true
  }
}

export default PricingService
