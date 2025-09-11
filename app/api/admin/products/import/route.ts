import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data } = await request.json()

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No products provided' },
        { status: 400 }
      )
    }

    let successCount = 0
    let errorCount = 0
    const errors: string[] = []

    // Process products in batches to avoid overwhelming the database
    const batchSize = 50
    const batches: any[][] = []
    for (let i = 0; i < data.length; i += batchSize) {
      batches.push(data.slice(i, i + batchSize))
    }

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex]
      try {
        const productsToCreate: any[] = []
        const productsToUpdate: any[] = []

        for (let index = 0; index < batch.length; index++) {
          const productData = batch[index]
          try {
            // Validate required fields
            if (!productData.name || !productData.price) {
              errors.push(`Row ${batchIndex * batchSize + index + 1}: Missing required fields (name, price)`)
              errorCount++
              continue
            }

            // Check if category exists
            let categoryId: string | undefined = undefined
            if (productData.categoryId) {
              const category = await prisma.category.findUnique({
                where: { id: productData.categoryId }
              })
              if (category) {
                categoryId = category.id
              } else {
                errors.push(`Row ${batchIndex * batchSize + index + 1}: Category with ID '${productData.categoryId}' not found`)
                errorCount++
                continue
              }
            }

            // Generate SKU if not provided
            const sku = productData.sku || `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

            // Prepare product data
            const productPayload = {
              name: productData.name.trim(),
              description: productData.description || '',
              price: parseFloat(productData.price) || 0,
              discount: parseFloat(productData.discount) || 0,
              stock: parseInt(productData.stock) || 0,
              sku: sku,
              slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              isActive: productData.active === 'true' || productData.active === true || productData.active === '1' || true,
              ...(categoryId && { categoryId }),
              brand: productData.brand || '',
              origin: productData.origin || '',
              weight: productData.weight || '',
              images: productData.images ? (typeof productData.images === 'string' ? productData.images.split(',').map((img: string) => img.trim()) : []) : []
            }

            // Check if product exists (by SKU)
            const existingProduct = await prisma.product.findUnique({
              where: { sku: productPayload.sku }
            })

            if (existingProduct) {
              // Update existing product - create update data without null categoryId
              const updatePayload = { ...productPayload }
              if (!categoryId) {
                delete updatePayload.categoryId
              }
              
              productsToUpdate.push({
                where: { id: existingProduct.id },
                data: updatePayload
              })
            } else {
              // Create new product
              productsToCreate.push(productPayload)
            }

          } catch (error) {
            errors.push(`Row ${batchIndex * batchSize + index + 1}: ${error instanceof Error ? error.message : 'Processing error'}`)
            errorCount++
          }
        }

        // Create new products
        if (productsToCreate.length > 0) {
          try {
            await prisma.product.createMany({
              data: productsToCreate,
              skipDuplicates: true
            })
            successCount += productsToCreate.length
          } catch (error) {
            errors.push(`Batch ${batchIndex + 1}: Failed to create products - ${error instanceof Error ? error.message : 'Unknown error'}`)
            errorCount += productsToCreate.length
          }
        }

        // Update existing products
        for (const updateData of productsToUpdate) {
          try {
            await prisma.product.update(updateData)
            successCount++
          } catch (error) {
            errors.push(`Failed to update product: ${error instanceof Error ? error.message : 'Unknown error'}`)
            errorCount++
          }
        }

      } catch (error) {
        errors.push(`Batch ${batchIndex + 1}: ${error instanceof Error ? error.message : 'Batch processing error'}`)
        errorCount += batch.length
      }
    }

    return NextResponse.json({
      success: errorCount === 0,
      message: errorCount === 0 ? 
        `Successfully imported ${successCount} products` :
        `Import completed with errors. ${successCount} successful, ${errorCount} failed.`,
      successCount,
      errorCount,
      errors: errors.slice(0, 50) // Limit to first 50 errors
    })

  } catch (error) {
    console.error('Product import error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
