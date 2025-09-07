'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'

export interface UploadOptions {
  folder?: string
  type?: 'product-images' | 'category-image' | 'user-avatar' | 'general'
  productName?: string
  categoryName?: string
  userId?: string
  maxFiles?: number
  maxSize?: number // in MB
  allowedTypes?: string[]
  onProgress?: (progress: number) => void
}

export interface UploadResult {
  url: string
  downloadUrl?: string
  pathname?: string
  size?: number
  uploadedAt?: Date
  type: string
}

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const uploadFiles = useCallback(async (
    files: File[] | FileList,
    options: UploadOptions = {}
  ): Promise<UploadResult[]> => {
    const fileArray = Array.from(files)
    
    // Validate files
    if (fileArray.length === 0) {
      throw new Error('No files selected')
    }

    if (options.maxFiles && fileArray.length > options.maxFiles) {
      throw new Error(`Maximum ${options.maxFiles} files allowed`)
    }

    // Validate file types and sizes
    const maxSizeBytes = (options.maxSize || 10) * 1024 * 1024
    const allowedTypes = options.allowedTypes || [
      'image/jpeg',
      'image/png', 
      'image/webp',
      'image/gif',
      'application/pdf'
    ]

    for (const file of fileArray) {
      if (file.size > maxSizeBytes) {
        throw new Error(`File "${file.name}" exceeds maximum size of ${options.maxSize || 10}MB`)
      }
      
      if (!allowedTypes.includes(file.type)) {
        throw new Error(`File type "${file.type}" is not allowed`)
      }
    }

    setUploading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      
      // Add files
      fileArray.forEach(file => {
        formData.append('files', file)
      })

      // Add options
      if (options.folder) formData.append('folder', options.folder)
      if (options.type) formData.append('type', options.type)
      if (options.productName) formData.append('productName', options.productName)
      if (options.categoryName) formData.append('categoryName', options.categoryName)
      if (options.userId) formData.append('userId', options.userId)

      // Create XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest()
      
      const uploadPromise = new Promise<UploadResult[]>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100)
            setProgress(progress)
            options.onProgress?.(progress)
          }
        })

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText)
              if (response.success) {
                resolve(response.data)
              } else {
                reject(new Error(response.message || 'Upload failed'))
              }
            } catch (error) {
              reject(new Error('Invalid response from server'))
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`))
          }
        })

        xhr.addEventListener('error', () => {
          reject(new Error('Network error during upload'))
        })

        xhr.open('POST', '/api/upload/files')
        xhr.send(formData)
      })

      const result = await uploadPromise
      toast.success(`Successfully uploaded ${fileArray.length} file(s)`)
      return result

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      toast.error(`Upload failed: ${errorMessage}`)
      throw error
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }, [])

  const deleteFile = useCallback(async (url: string): Promise<void> => {
    try {
      const response = await fetch(`/api/upload/files?url=${encodeURIComponent(url)}`, {
        method: 'DELETE'
      })

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.message || 'Delete failed')
      }

      toast.success('File deleted successfully')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Delete failed'
      toast.error(`Delete failed: ${errorMessage}`)
      throw error
    }
  }, [])

  const deleteMultipleFiles = useCallback(async (urls: string[]): Promise<void> => {
    try {
      const searchParams = new URLSearchParams()
      urls.forEach(url => searchParams.append('urls', url))

      const response = await fetch(`/api/upload/files?${searchParams.toString()}`, {
        method: 'DELETE'
      })

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.message || 'Delete failed')
      }

      toast.success(`Successfully deleted ${urls.length} file(s)`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Delete failed'
      toast.error(`Delete failed: ${errorMessage}`)
      throw error
    }
  }, [])

  const listFiles = useCallback(async (options?: {
    prefix?: string
    limit?: number
    cursor?: string
  }) => {
    try {
      const searchParams = new URLSearchParams()
      if (options?.prefix) searchParams.set('prefix', options.prefix)
      if (options?.limit) searchParams.set('limit', options.limit.toString())
      if (options?.cursor) searchParams.set('cursor', options.cursor)

      const response = await fetch(`/api/upload/files?${searchParams.toString()}`)
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to list files')
      }

      return result.data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to list files'
      toast.error(errorMessage)
      throw error
    }
  }, [])

  return {
    uploadFiles,
    deleteFile,
    deleteMultipleFiles,
    listFiles,
    uploading,
    progress
  }
}

// Utility function to get optimized image URL
export function getOptimizedImageUrl(
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
