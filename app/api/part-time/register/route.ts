import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { EmailService } from '@/lib/email'

interface PartTimeRegistrationData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  age: string
  gender: string
  
  // Address Information
  address: string
  city: string
  state: string
  zipCode: string
  
  // Professional Information
  education: string
  experience: string
  preferredRole: string
  availableHours: string
  availableDays: string
  
  // Additional Information
  skills: string
  motivation: string
  previousWorkExperience: string
  languagesKnown: string
}

export async function POST(request: NextRequest) {
  try {
    const data: PartTimeRegistrationData = await request.json()
    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'age', 'gender',
      'address', 'city', 'state', 'zipCode',
      'education', 'experience', 'preferredRole', 'availableHours', 'availableDays',
      'motivation'
    ]

    for (const field of requiredFields) {
      if (!data[field as keyof PartTimeRegistrationData]) {
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

    // Create user with PART_TIME role
    const user = await prisma.user.create({
      data: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: hashedPassword,
        role: 'PART_TIME',
        phone: data.phone,
        address: `${data.address}, ${data.city}, ${data.state} ${data.zipCode}`,
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
        address1: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: 'India',
        phone: data.phone,
        isDefault: true,
        type: 'HOME'
      }
    })

    // Create form response for admin tracking
    await prisma.formResponse.create({
      data: {
        formId: 'part_time_registration',
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

    // Send welcome email to part-time applicant
    await emailService.sendPartTimeWelcomeEmail({
      to: user.email,
      name: user.name || 'Applicant',
      email: user.email,
      password: tempPassword,
      preferredRole: data.preferredRole
    })

    // Send admin notification
    await emailService.sendPartTimeAdminNotification({
      applicantName: user.name || 'Unknown',
      applicantEmail: user.email,
      preferredRole: data.preferredRole,
      phone: data.phone,
      availableHours: data.availableHours,
      availableDays: data.availableDays,
      motivation: data.motivation,
      registrationDate: new Date().toLocaleDateString()
    })

    return NextResponse.json({
      success: true,
      message: 'Part-time job application submitted successfully',
      loginCredentials: {
        email: user.email,
        password: tempPassword
      }
    })

  } catch (error) {
    console.error('Part-time registration error:', error)
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
