import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getRazorpayConfig } from '@/lib/razorpay'
import crypto from 'crypto'
import { emailService } from '@/lib/email'
import { rankSystem } from '@/lib/ranks'
import { calculateCommissions } from '@/lib/commission'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = await request.json()

    const config = getRazorpayConfig()
    
    // Verify signature
    const hmac = crypto.createHmac('sha256', config.keySecret)
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id)
    const generated_signature = hmac.digest('hex')

    if (generated_signature !== razorpay_signature) {
      console.error('Payment signature verification failed')
      console.error('Generated:', generated_signature)
      console.error('Received:', razorpay_signature)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Process successful payment in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update order status
      const order = await tx.order.update({
        where: { 
          id: orderId,
          userId: session.user.id
        },
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
          user: {
            include: {
              referrer: true
            }
          }
        }
      })

      return order
    })

    // Calculate commissions after successful payment
    if (result.user.referrerId) {
      const commissionResult = await calculateCommissions(result.id)
      console.log('Commission calculation result:', commissionResult)
    }

    // Send order confirmation email (don't block on failure)
    setImmediate(async () => {
      try {
        const emailResult = await emailService.sendOrderConfirmation(
          result.user.email,
          result.user.name || 'Customer',
          result
        )
        if (!emailResult.skipped) {
          console.log('Order confirmation email sent successfully')
        }
      } catch (emailError) {
        console.error('Failed to send order confirmation email:', emailError)
      }
    })

    // Update ranks for user and referrers (don't block on failure)
    setImmediate(async () => {
      try {
        await rankSystem.updateUserRank(result.userId)
        if (result.user.referrerId) {
          await rankSystem.updateUserRank(result.user.referrerId)
        }
        console.log('User ranks updated successfully')
      } catch (rankError) {
        console.error('Failed to update ranks:', rankError)
      }
    })

    console.log('Payment verified and order processed successfully')
    return NextResponse.json({ 
      success: true,
      order: result
    })

  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}
async function generateCommissions(tx: any, order: any) {
  // Check if commission settings exist, if not create default ones
  const commissionSettings = await tx.commissionSettings.findMany({
    where: { isActive: true },
    orderBy: { level: 'asc' }
  })

  // If no settings exist, create default commission structure
  if (commissionSettings.length === 0) {
    await tx.commissionSettings.createMany({
      data: [
        { level: 1, percentage: 10, isActive: true },
        { level: 2, percentage: 5, isActive: true },
        { level: 3, percentage: 3, isActive: true }
      ]
    })
    
    // Refetch settings
    const newSettings = await tx.commissionSettings.findMany({
      where: { isActive: true },
      orderBy: { level: 'asc' }
    })
    
    await processCommissions(tx, order, newSettings)
  } else {
    await processCommissions(tx, order, commissionSettings)
  }
}

async function processCommissions(tx: any, order: any, settings: any[]) {
  let currentUser = order.user
  let level = 1

  for (const setting of settings) {
    if (!currentUser.referrerId || level > setting.level) break

    const referrer = await tx.user.findUnique({
      where: { id: currentUser.referrerId },
      include: { referrer: true, currentRank: true }
    })

    if (!referrer) break

    // Apply rank multiplier to commission
    let commissionAmount = (order.total * setting.percentage) / 100
    if (referrer.currentRank) {
      commissionAmount *= referrer.currentRank.commissionMultiplier
    }

    // Create commission record
    const commission = await tx.commission.create({
      data: {
        userId: referrer.id,
        fromUserId: order.userId,
        orderId: order.id,
        amount: commissionAmount,
        level: setting.level,
        type: 'REFERRAL',
        status: 'APPROVED'
      },
      include: {
        fromUser: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    // Update referrer's wallet
    await tx.wallet.upsert({
      where: { userId: referrer.id },
      update: {
        balance: { increment: commissionAmount },
        totalEarnings: { increment: commissionAmount }
      },
      create: {
        userId: referrer.id,
        balance: commissionAmount,
        totalEarnings: commissionAmount,
        totalWithdrawn: 0
      }
    })

    // Send commission email (async, don't block transaction)
    setImmediate(async () => {
      try {
        const emailResult = await emailService.sendCommissionAlert(
          referrer.email,
          referrer.name || 'User',
          commission
        )
        if (!emailResult.skipped) {
          console.log('Commission alert email sent successfully')
        }
      } catch (emailError) {
        console.error('Failed to send commission email:', emailError)
      }
    })

    console.log(`Generated commission of ₹${commissionAmount.toFixed(2)} for user ${referrer.id} at level ${setting.level}`)

    currentUser = referrer
    level++
  }
}
