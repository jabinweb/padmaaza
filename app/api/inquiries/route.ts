import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { emailService } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = [
      'companyName', 'contactPerson', 'designation', 'email', 'phone',
      'businessType', 'address', 'quantityRequired', 'deliveryLocation', 'message'
    ]
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Prepare form data for database
    const formData = {
      formId: 'b2b_inquiry',
      data: {
        // Company Information
        companyName: body.companyName,
        contactPerson: body.contactPerson,
        designation: body.designation,
        email: body.email,
        phone: body.phone,
        businessType: body.businessType,
        gstNumber: body.gstNumber || null,
        address: body.address,
        
        // Product Information (if applicable)
        productId: body.productId || null,
        productName: body.productName || null,
        productCategory: body.productCategory || null,
        productPrice: body.productPrice || null,
        
        // Requirements
        quantityRequired: body.quantityRequired,
        quantityUnit: body.quantityUnit || 'tons',
        deliveryLocation: body.deliveryLocation,
        expectedDeliveryDate: body.expectedDeliveryDate || null,
        
        // Additional Information
        message: body.message,
        hearAboutUs: body.hearAboutUs || null,
        
        // Metadata
        submissionType: 'b2b_inquiry',
        submittedAt: body.submittedAt || new Date().toISOString(),
        userAgent: request.headers.get('user-agent') || null,
        ipAddress: request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown'
      },
      status: 'new',
      metadata: {
        source: 'website_inquiry_form',
        type: 'b2b_bulk_inquiry',
        priority: 'high'
      }
    }

    // Save to database
    const formResponse = await prisma.formResponse.create({
      data: formData
    })

    // Send email notifications
    try {
      // Send confirmation email to customer
      await emailService.sendB2BInquiryConfirmation({
        customerEmail: body.email,
        customerName: body.contactPerson,
        companyName: body.companyName,
        inquiryId: formResponse.id,
        productName: body.productName
      })

      // Send notification to admin
      await emailService.sendB2BInquiryAdminNotification({
        inquiryData: body,
        inquiryId: formResponse.id
      })
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
      // Don't fail the API call if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      inquiryId: formResponse.id
    })

  } catch (error) {
    console.error('Error processing B2B inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again.' },
      { status: 500 }
    )
  }
}