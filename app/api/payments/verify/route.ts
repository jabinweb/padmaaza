import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { verifyPayment } from '@/lib/razorpay'
import { CommissionService } from '@/lib/commission'
import { emailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = await request.json()

    // Verify payment signature
    const isValid = verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // Update order status
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
        razorpayPaymentId: razorpay_payment_id
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        user: true
      }
    })

    // Calculate and distribute commissions
    await CommissionService.calculateCommissions(order.id)

    // Send order confirmation email
    await emailService.sendOrderConfirmation(
      order.user.email,
      order.user.name || 'Customer',
      order
    )

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}

