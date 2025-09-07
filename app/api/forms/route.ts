import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

// Validation schema for form submissions
const FormSubmissionSchema = z.object({
  formId: z.string().min(1, 'Form ID is required'), // e.g., "contact", "partnership", "bulk_inquiry"
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  inquiryType: z.string().optional(),
  company: z.string().optional(),
  formSource: z.string().optional(), // Optional field to track which form page it came from
  // Allow additional fields that will be stored in JSON
}).passthrough()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the form data
    const validatedData = FormSubmissionSchema.parse(body)
    
    // Extract formId from the data
    const { formId, ...formData } = validatedData
    
    // Get client information
    const forwarded = request.headers.get('x-forwarded-for')
    const ipAddress = forwarded ? forwarded.split(',')[0] : 
      request.headers.get('x-real-ip') || 
      'unknown'
    
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referrer = request.headers.get('referer') || null

    // Prepare metadata
    const metadata = {
      ipAddress,
      userAgent,
      referrer,
      timestamp: new Date().toISOString()
    }

    // Save to database with new simplified schema
    const formResponse = await prisma.formResponse.create({
      data: {
        formId,
        data: formData as Prisma.JsonObject, // Store all form data as JSON with proper Prisma type
        metadata: metadata as Prisma.JsonObject, // Cast metadata with proper Prisma type
        status: 'new'
      }
    })

    // Send email notification (optional)
    // You can add email sending logic here using nodemailer or your preferred service

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully',
        id: formResponse.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Form submission error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // This endpoint could be used for admin to fetch form submissions
    // Add authentication/authorization logic here
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const formId = searchParams.get('formId') // Changed from formType to formId
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const where: any = {}
    
    if (status) {
      where.status = status.toLowerCase() // Changed to lowercase to match new schema
    }
    
    if (formId) {
      where.formId = formId
    }

    const [forms, total] = await Promise.all([
      prisma.formResponse.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.formResponse.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: forms,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching forms:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch forms' 
      },
      { status: 500 }
    )
  }
}
