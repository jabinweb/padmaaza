import { put, del, list, type PutBlobResult } from '@vercel/blob'

export interface UploadResult {
  url: string
  downloadUrl: string
  pathname: string
  size: number
  uploadedAt: Date
}

export interface BlobStorageConfig {
  token: string
  folder?: string
  allowedTypes?: string[]
  maxSize?: number // in bytes
}

type PutBody = string | File | Blob | Buffer | ReadableStream

// Helper function to check if the object has File-like properties
function isFileObject(obj: any): obj is { name: string; type: string; size: number } {
  return obj && typeof obj.name === 'string' && typeof obj.type === 'string' && typeof obj.size === 'number'
}

class BlobStorageService {
  private config: BlobStorageConfig

  constructor(config: BlobStorageConfig) {
    this.config = {
      maxSize: 10 * 1024 * 1024, // 10MB default
      allowedTypes: [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'application/pdf',
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ],
      ...config
    }
  }

  /**
   * Upload a file to Vercel Blob storage
   */
  async uploadFile(
    file: PutBody,
    filename: string,
    options?: {
      folder?: string
      contentType?: string
      addRandomSuffix?: boolean
    }
  ): Promise<UploadResult> {
    try {
      // Validate file if it's a File-like object
      if (isFileObject(file)) {
        this.validateFile(file)
      }

      // Generate pathname
      const folder = options?.folder || this.config.folder || 'uploads'
      const timestamp = new Date().toISOString().split('T')[0]
      const randomSuffix = options?.addRandomSuffix !== false ? `-${Date.now()}` : ''
      const pathname = `${folder}/${timestamp}/${filename}${randomSuffix}`

      // Upload to Vercel Blob
      const blob: PutBlobResult = await put(pathname, file, {
        access: 'public',
        token: this.config.token,
        contentType: options?.contentType || (isFileObject(file) ? file.type : undefined),
      })

      return {
        url: blob.url,
        downloadUrl: blob.downloadUrl,
        pathname: blob.pathname,
        size: isFileObject(file) ? file.size : (file instanceof Buffer ? file.length : 0),
        uploadedAt: new Date()
      }
    } catch (error) {
      console.error('Error uploading file to Blob storage:', error)
      throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Upload multiple files
   */
  async uploadMultipleFiles(
    files: PutBody[],
    options?: {
      folder?: string
      addRandomSuffix?: boolean
    }
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map((file, index) => {
      // Check if file has a name property (like File objects from FormData)
      const filename = (file as any)?.name || `file-${index}`
      return this.uploadFile(file, filename, options)
    })

    return Promise.all(uploadPromises)
  }

  /**
   * Delete a file from Vercel Blob storage
   */
  async deleteFile(url: string): Promise<void> {
    try {
      await del(url, { token: this.config.token })
    } catch (error) {
      console.error('Error deleting file from Blob storage:', error)
      throw new Error(`Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Delete multiple files
   */
  async deleteMultipleFiles(urls: string[]): Promise<void> {
    const deletePromises = urls.map(url => this.deleteFile(url))
    await Promise.all(deletePromises)
  }

  /**
   * List files in a specific folder
   */
  async listFiles(options?: {
    prefix?: string
    limit?: number
    cursor?: string
  }): Promise<{
    blobs: Array<{
      url: string
      pathname: string
      size: number
      uploadedAt: Date
    }>
    cursor?: string
    hasMore: boolean
  }> {
    try {
      const result = await list({
        token: this.config.token,
        prefix: options?.prefix,
        limit: options?.limit || 100,
        cursor: options?.cursor
      })

      return {
        blobs: result.blobs.map(blob => ({
          url: blob.url,
          pathname: blob.pathname,
          size: blob.size,
          uploadedAt: blob.uploadedAt
        })),
        cursor: result.cursor,
        hasMore: result.hasMore
      }
    } catch (error) {
      console.error('Error listing files from Blob storage:', error)
      throw new Error(`Failed to list files: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Upload product images with optimization
   */
  async uploadProductImages(
    images: File[],
    productName: string
  ): Promise<string[]> {
    const folder = 'products'
    const sanitizedProductName = productName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    
    const uploadResults = await Promise.all(
      images.map(async (image, index) => {
        const filename = `${sanitizedProductName}-${index + 1}.${image.name.split('.').pop()}`
        const result = await this.uploadFile(image, filename, {
          folder,
          addRandomSuffix: false
        })
        return result.url
      })
    )

    return uploadResults
  }

  /**
   * Upload category image
   */
  async uploadCategoryImage(
    image: File,
    categoryName: string
  ): Promise<string> {
    const folder = 'categories'
    const sanitizedCategoryName = categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const filename = `${sanitizedCategoryName}.${image.name.split('.').pop()}`
    
    const result = await this.uploadFile(image, filename, {
      folder,
      addRandomSuffix: false
    })
    
    return result.url
  }

  /**
   * Upload user avatar
   */
  async uploadUserAvatar(
    image: File,
    userId: string
  ): Promise<string> {
    const folder = 'avatars'
    const filename = `user-${userId}.${image.name.split('.').pop()}`
    
    const result = await this.uploadFile(image, filename, {
      folder,
      addRandomSuffix: false
    })
    
    return result.url
  }

  /**
   * Validate file before upload
   */
  private validateFile(file: { size: number; type: string }): void {
    // Check file size
    if (this.config.maxSize && file.size > this.config.maxSize) {
      throw new Error(`File size exceeds maximum allowed size of ${this.config.maxSize / (1024 * 1024)}MB`)
    }

    // Check file type
    if (this.config.allowedTypes && !this.config.allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed. Allowed types: ${this.config.allowedTypes.join(', ')}`)
    }
  }

  /**
   * Get optimized image URL with transformations
   */
  getOptimizedImageUrl(
    originalUrl: string,
    options?: {
      width?: number
      height?: number
      quality?: number
      format?: 'webp' | 'jpeg' | 'png'
    }
  ): string {
    if (!options) return originalUrl

    const url = new URL(originalUrl)
    const searchParams = new URLSearchParams()

    if (options.width) searchParams.set('w', options.width.toString())
    if (options.height) searchParams.set('h', options.height.toString())
    if (options.quality) searchParams.set('q', options.quality.toString())
    if (options.format) searchParams.set('f', options.format)

    if (searchParams.toString()) {
      url.search = searchParams.toString()
    }

    return url.toString()
  }
}

// Create singleton instance
const blobStorage = new BlobStorageService({
  token: process.env.BLOB_READ_WRITE_TOKEN || '',
  folder: 'padmaaja-rasooi',
  maxSize: 10 * 1024 * 1024, // 10MB
})

export default blobStorage
export { BlobStorageService }
