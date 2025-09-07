import { NextRequest, NextResponse } from 'next/server'
import blobStorage from '@/lib/blob-storage'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const folder = formData.get('folder') as string || 'general'
    const type = formData.get('type') as string || 'general'

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No files provided' },
        { status: 400 }
      )
    }

    // Validate files
    for (const file of files) {
      if (!file || file.size === 0) {
        return NextResponse.json(
          { success: false, message: 'Invalid file provided' },
          { status: 400 }
        )
      }
    }

    let uploadResults: any[] = []

    try {
      // Handle different upload types
      switch (type) {
        case 'product-images': {
          const productName = formData.get('productName') as string
          if (!productName) {
            return NextResponse.json(
              { success: false, message: 'Product name is required for product images' },
              { status: 400 }
            )
          }
          const urls = await blobStorage.uploadProductImages(files, productName)
          uploadResults = urls.map(url => ({ url, type: 'product-image' }))
          break
        }

        case 'category-image': {
          if (files.length > 1) {
            return NextResponse.json(
              { success: false, message: 'Only one category image allowed' },
              { status: 400 }
            )
          }
          const categoryName = formData.get('categoryName') as string
          if (!categoryName) {
            return NextResponse.json(
              { success: false, message: 'Category name is required' },
              { status: 400 }
            )
          }
          const url = await blobStorage.uploadCategoryImage(files[0], categoryName)
          uploadResults = [{ url, type: 'category-image' }]
          break
        }

        case 'user-avatar': {
          if (files.length > 1) {
            return NextResponse.json(
              { success: false, message: 'Only one avatar image allowed' },
              { status: 400 }
            )
          }
          const userId = formData.get('userId') as string
          if (!userId) {
            return NextResponse.json(
              { success: false, message: 'User ID is required' },
              { status: 400 }
            )
          }
          const url = await blobStorage.uploadUserAvatar(files[0], userId)
          uploadResults = [{ url, type: 'user-avatar' }]
          break
        }

        default: {
          // General file upload
          const results = await blobStorage.uploadMultipleFiles(files, { folder })
          uploadResults = results.map(result => ({
            url: result.url,
            downloadUrl: result.downloadUrl,
            pathname: result.pathname,
            size: result.size,
            uploadedAt: result.uploadedAt,
            type: 'general'
          }))
          break
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Files uploaded successfully',
        data: uploadResults
      })

    } catch (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { 
          success: false, 
          message: uploadError instanceof Error ? uploadError.message : 'Failed to upload files'
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const urls = searchParams.getAll('urls')

    if (!url && (!urls || urls.length === 0)) {
      return NextResponse.json(
        { success: false, message: 'No URL(s) provided for deletion' },
        { status: 400 }
      )
    }

    if (url) {
      // Delete single file
      await blobStorage.deleteFile(url)
    } else {
      // Delete multiple files
      await blobStorage.deleteMultipleFiles(urls)
    }

    return NextResponse.json({
      success: true,
      message: 'File(s) deleted successfully'
    })

  } catch (error) {
    console.error('File deletion error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to delete file(s)'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const prefix = searchParams.get('prefix')
    const limit = parseInt(searchParams.get('limit') || '100')
    const cursor = searchParams.get('cursor')

    const result = await blobStorage.listFiles({
      prefix: prefix || undefined,
      limit,
      cursor: cursor || undefined
    })

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('File listing error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to list files' 
      },
      { status: 500 }
    )
  }
}
