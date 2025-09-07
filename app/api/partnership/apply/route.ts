import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { EmailService } from '@/lib/email'

const emailService = new EmailService()

interface PartnerApplicationData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Business Information
  businessName?: string
  businessType: string
  experience: string
  
  // Partnership Details
  partnershipTier: 'Diamond' | 'Gold' | 'Silver'
  expectedCustomers: number
  
  // Address Information
  address: string
  city: string
  state: string
  zipCode: string
  
  // Additional Information
  motivation: string
  marketingPlan: string
}

export async function POST(request: NextRequest) {
  try {
    const data: PartnerApplicationData = await request.json()

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.partnershipTier) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Check tier availability
    const tierAvailability = await checkTierAvailability(data.partnershipTier)
    if (!tierAvailability.available) {
      return NextResponse.json(
        { 
          success: false, 
          message: `${data.partnershipTier} tier is currently full. Please select another tier.`,
          availableTiers: tierAvailability.availableTiers
        },
        { status: 400 }
      )
    }

    // Generate random password and referral code
    const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(randomPassword, 12)
    const referralCode = generateReferralCode(data.firstName, data.lastName)

    // Create user with MEMBER role
    const newUser = await prisma.user.create({
      data: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: 'MEMBER',
        address: `${data.address}, ${data.city}, ${data.state} ${data.zipCode}`,
        isActive: true,
        partnerTier: data.partnershipTier,
        minReferrals: 3, // Partners need to add minimum 3 members
        referralCode: referralCode,
      }
    })

    // Create address record
    await prisma.address.create({
      data: {
        userId: newUser.id,
        firstName: data.firstName,
        lastName: data.lastName,
        company: data.businessName || '',
        address1: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        phone: data.phone,
        isDefault: true,
        type: 'HOME'
      }
    })

    // Store form response for admin review
    await prisma.formResponse.create({
      data: {
        formId: 'partnership_application',
        userId: newUser.id,
        data: {
          ...data,
          applicationStatus: 'approved', // Auto-approve for now
          partnerTier: data.partnershipTier
        },
        status: 'approved'
      }
    })

    // Create wallet for the partner
    await prisma.wallet.create({
      data: {
        userId: newUser.id,
        balance: 0,
        totalEarnings: 0,
        totalWithdrawn: 0
      }
    })

    try {
      // Send admin notification email
      await emailService.sendPartnerApplicationAdminNotification(data, newUser)

      // Send confirmation email to partner
      await emailService.sendPartnerWelcomeEmail(data, newUser, randomPassword)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Partnership application submitted successfully! Check your email for login details.',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        referralCode: newUser.referralCode
      }
    })

  } catch (error) {
    console.error('Partnership application error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Generate referral code
function generateReferralCode(firstName: string, lastName: string): string {
  const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
  const timestamp = Date.now().toString().slice(-6)
  return `${initials}${timestamp}`
}

// Check tier availability
async function checkTierAvailability(requestedTier: string) {
  // Define tier limits
  const tierLimits = {
    Diamond: 100,  // Maximum 100 Diamond partners
    Gold: 500,     // Maximum 500 Gold partners
    Silver: 1000   // Maximum 1000 Silver partners
  }

  // Count current partners for each tier
  const tierCounts = await prisma.user.groupBy({
    by: ['partnerTier'],
    where: {
      role: 'MEMBER',
      partnerTier: {
        in: ['Diamond', 'Gold', 'Silver']
      }
    },
    _count: {
      _all: true
    }
  })

  // Create a map of current counts
  const currentCounts: Record<string, number> = {}
  tierCounts.forEach(tier => {
    if (tier.partnerTier) {
      currentCounts[tier.partnerTier] = tier._count._all
    }
  })

  // Check availability for all tiers
  const availability = {
    Diamond: (currentCounts.Diamond || 0) < tierLimits.Diamond,
    Gold: (currentCounts.Gold || 0) < tierLimits.Gold,
    Silver: (currentCounts.Silver || 0) < tierLimits.Silver
  }

  // Get available tiers
  const availableTiers = Object.entries(availability)
    .filter(([_, available]) => available)
    .map(([tier, _]) => tier)

  return {
    available: availability[requestedTier as keyof typeof availability] || false,
    availableTiers,
    currentCounts,
    limits: tierLimits
  }
}
