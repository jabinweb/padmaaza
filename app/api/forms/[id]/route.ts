import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const UpdateFormSchema = z.object({
  status: z.enum(['new', 'in_progress', 'resolved', 'closed'])
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formResponse = await prisma.formResponse.findUnique({
      where: { id: params.id }
    })

    if (!formResponse) {
      return NextResponse.json(
        { success: false, message: 'Form response not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: formResponse
    })

  } catch (error) {
    console.error('Error fetching form response:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch form response' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = UpdateFormSchema.parse(body)

    const formResponse = await prisma.formResponse.update({
      where: { id: params.id },
      data: {
        status: validatedData.status,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      data: formResponse
    })

  } catch (error) {
    console.error('Error updating form response:', error)
    
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
      { success: false, message: 'Failed to update form response' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.formResponse.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Form response deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting form response:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete form response' },
      { status: 500 }
    )
  }
}
