import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: orderId } = await params

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
                discount: true
              }
            }
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        },
        shippingAddress: {
          select: {
            firstName: true,
            lastName: true,
            address1: true,
            address2: true,
            city: true,
            state: true,
            zipCode: true,
            phone: true
          }
        }
      }
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Calculate estimated delivery (5-7 business days)
    const estimatedDelivery = new Date()
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7)

    const response = {
      orderId: order.id,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      estimatedDelivery: estimatedDelivery.toISOString(),
      customer: {
        name: order.user.name || 'Customer',
        email: order.user.email
      },
      shippingAddress: order.shippingAddress ? {
        name: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        address: order.shippingAddress.address1,
        address2: order.shippingAddress.address2,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        zipCode: order.shippingAddress.zipCode,
        phone: order.shippingAddress.phone
      } : null,
      items: order.orderItems.map(item => ({
        id: item.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
        image: item.product.images[0] || null,
        discount: item.product.discount || 0
      }))
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching order confirmation:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order details' },
      { status: 500 }
    )
  }
}

