import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { EmailService } from '@/lib/email'

interface WholesalerRegistrationData {
  // Business Information
  businessName: string
  businessType: string
  gstNumber: string
  panNumber: string
  
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Address Information
  address: string
  city: string
  state: string
  zipCode: string
  
  // Business Details
  experience: string
  expectedOrderVolume: string
  productCategories: string
  businessDescription: string
}

export async function POST(request: NextRequest) {
  try {
    const data: WholesalerRegistrationData = await request.json()

    // Validate required fields
    const requiredFields = ['businessName', 'firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode']
    for (const field of requiredFields) {
      if (!data[field as keyof WholesalerRegistrationData]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        )
      }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      )
    }

    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(tempPassword, 10)

    // Create user with WHOLESALER role
    const user = await prisma.user.create({
      data: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: hashedPassword,
        role: 'WHOLESALER',
        phone: data.phone,
        address: data.address,
        isActive: true,
        joinedAt: new Date()
      }
    })

    // Create address record
    await prisma.address.create({
      data: {
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.businessName,
        address1: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: 'India',
        phone: data.phone,
        isDefault: true,
        type: 'WORK'
      }
    })

    // Create form response for admin tracking
    await prisma.formResponse.create({
      data: {
        formId: 'wholesaler_registration',
        data: {
          ...data,
          userId: user.id,
          registrationDate: new Date().toISOString()
        },
        status: 'new',
        userId: user.id
      }
    })

    // Send email notifications
    const emailService = new EmailService()

    // Send welcome email to wholesaler
    await emailService.sendWholesalerWelcomeEmail({
      to: user.email,
      name: user.name || 'Wholesaler',
      email: user.email,
      password: tempPassword,
      businessName: data.businessName
    })

    // Send admin notification
    await emailService.sendWholesalerAdminNotification({
      wholesalerName: user.name || 'Unknown',
      wholesalerEmail: user.email,
      businessName: data.businessName,
      businessType: data.businessType,
      phone: data.phone,
      expectedVolume: data.expectedOrderVolume,
      registrationDate: new Date().toLocaleDateString()
    })

    return NextResponse.json({
      success: true,
      message: 'Wholesaler registration successful',
      loginCredentials: {
        email: user.email,
        password: tempPassword
      }
    })

  } catch (error) {
    console.error('Wholesaler registration error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Registration failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
