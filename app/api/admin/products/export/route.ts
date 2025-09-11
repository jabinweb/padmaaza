import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const selectedColumns = searchParams.get('columns')?.split(',') || []
    const categoryId = searchParams.get('categoryId') || ''
    const isActive = searchParams.get('isActive') || ''
    const limit = parseInt(searchParams.get('limit') || '10000')

    // Build where clause based on filters
    const whereClause: any = {}
    
    if (categoryId && categoryId !== '') {
      whereClause.categoryId = categoryId
    }
    
    if (isActive && isActive !== '') {
      whereClause.isActive = isActive === 'true'
    }

    // Fetch products with category information
    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: {
          select: { name: true }
        }
      },
      take: limit,
      orderBy: { createdAt: 'desc' }
    })

    // Transform data based on selected columns
    const transformedData = products.map(product => {
      const baseData = {
        id: product.id,
        name: product.name,
        description: product.description || '',
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        sku: product.sku,
        slug: product.slug,
        isActive: product.isActive,
        categoryName: product.category?.name || '',
        categoryId: product.categoryId || '',
        brand: product.brand || '',
        origin: product.origin || '',
        weight: product.weight || '',
        images: product.images.join(', '),
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        // Calculated fields
        finalPrice: product.price - (product.price * product.discount / 100),
        discountAmount: product.price * product.discount / 100,
        stockStatus: product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock',
        status: product.isActive ? 'Active' : 'Inactive'
      }

      // Filter by selected columns if specified
      if (selectedColumns.length > 0) {
        const filteredData: any = {}
        selectedColumns.forEach(column => {
          if (column in baseData) {
            filteredData[column] = (baseData as any)[column]
          }
        })
        return filteredData
      }

      return baseData
    })

    return NextResponse.json({
      success: true,
      data: transformedData,
      count: transformedData.length
    })

  } catch (error) {
    console.error('Product export error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { columns = [], filters = {} } = await request.json()
    const selectedColumns = columns || []
    const categoryId = filters.categoryId || ''
    const isActive = filters.isActive || ''
    const limit = parseInt(filters.limit || '10000')

    // Build where clause based on filters
    const whereClause: any = {}
    
    if (categoryId && categoryId !== '') {
      whereClause.categoryId = categoryId
    }
    
    if (isActive && isActive !== '') {
      whereClause.isActive = isActive === 'true'
    }

    // Fetch products with category information
    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: {
          select: { name: true }
        }
      },
      take: limit,
      orderBy: { createdAt: 'desc' }
    })

    // Transform data based on selected columns
    const transformedData = products.map(product => {
      const baseData = {
        id: product.id,
        name: product.name,
        description: product.description || '',
        price: product.price,
        discount: product.discount,
        stock: product.stock,
        sku: product.sku,
        slug: product.slug,
        isActive: product.isActive,
        categoryName: product.category?.name || '',
        categoryId: product.categoryId || '',
        brand: product.brand || '',
        origin: product.origin || '',
        weight: product.weight || '',
        images: product.images.join(', '),
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
        // Calculated fields
        finalPrice: product.price - (product.price * product.discount / 100),
        discountAmount: product.price * product.discount / 100,
        stockStatus: product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock',
        status: product.isActive ? 'Active' : 'Inactive'
      }

      // Filter by selected columns if specified
      if (selectedColumns.length > 0) {
        const filteredData: any = {}
        selectedColumns.forEach((column: string) => {
          if (column in baseData) {
            filteredData[column] = (baseData as any)[column]
          }
        })
        return filteredData
      }

      return baseData
    })

    return NextResponse.json({
      success: true,
      data: transformedData,
      count: transformedData.length
    })

  } catch (error) {
    console.error('Product export error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
