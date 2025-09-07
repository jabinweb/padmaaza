import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { EmailService } from '@/lib/email'

const emailService = new EmailService()

interface AddMemberData {
  name: string
  email: string
  phone: string
  address?: string
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is a partner (MEMBER role)
    const partner = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        referrals: true
      }
    })

    if (!partner || partner.role !== 'MEMBER') {
      return NextResponse.json(
        { success: false, message: 'Only partners can add members' },
        { status: 403 }
      )
    }

    // Check if partner has minimum required members
    if (partner.referrals.length < partner.minReferrals) {
      // Partner is still building their minimum required members
      console.log(`Partner needs ${partner.minReferrals - partner.referrals.length} more members to meet minimum requirement`)
    }

    const data: AddMemberData = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and phone are required' },
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

    // Generate random password
    const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(randomPassword, 12)

    // Create new member user
    const newMember = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        role: 'CUSTOMER',
        referrerId: partner.id,
        address: data.address,
        isActive: true,
      }
    })

    // Create wallet for the new member
    await prisma.wallet.create({
      data: {
        userId: newMember.id,
        balance: 0,
        totalEarnings: 0,
        totalWithdrawn: 0
      }
    })

    try {
      // Send notification to admin
      await emailService.sendMemberAddedAdminNotification(partner, newMember)

      // Send welcome email to new member
      await emailService.sendMemberWelcomeEmail(data, partner, randomPassword)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Member added successfully! They will receive login details via email.',
      member: {
        id: newMember.id,
        name: newMember.name,
        email: newMember.email,
        phone: newMember.phone,
        referralCode: newMember.referralCode
      },
      totalMembers: partner.referrals.length + 1,
      minRequired: partner.minReferrals,
      isMinimumMet: (partner.referrals.length + 1) >= partner.minReferrals
    })

  } catch (error) {
    console.error('Add member error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get partner's members
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get partner with their referrals
    const partner = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        referrals: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            joinedAt: true,
            isActive: true,
            referralCode: true
          },
          orderBy: {
            joinedAt: 'desc'
          }
        }
      }
    })

    if (!partner || partner.role !== 'MEMBER') {
      return NextResponse.json(
        { success: false, message: 'Only partners can view members' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      members: partner.referrals,
      totalMembers: partner.referrals.length,
      minRequired: partner.minReferrals,
      isMinimumMet: partner.referrals.length >= partner.minReferrals
    })

  } catch (error) {
    console.error('Get members error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
