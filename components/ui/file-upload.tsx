'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useFileUpload, type UploadOptions, type UploadResult } from '@/hooks/use-file-upload'
import { 
  Upload, 
  X, 
  FileImage, 
  File as FileIcon, 
  Trash2,
  Eye
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface FileUploadProps {
  onUploadComplete?: (results: UploadResult[]) => void
  onFilesChange?: (files: File[]) => void
  onDelete?: (url: string) => void
  options?: UploadOptions
  multiple?: boolean
  accept?: string
  disabled?: boolean
  className?: string
  showPreview?: boolean
  existingFiles?: string[]
}

export function FileUpload({
  onUploadComplete,
  onFilesChange,
  onDelete,
  options = {},
  multiple = true,
  accept = 'image/*',
  disabled = false,
  className,
  showPreview = true,
  existingFiles = []
}: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(existingFiles)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { uploadFiles, deleteFile, uploading, progress } = useFileUpload()

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)
    setSelectedFiles(prev => multiple ? [...prev, ...fileArray] : fileArray)
    onFilesChange?.(fileArray)
  }, [multiple, onFilesChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    if (disabled) return
    
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }, [disabled, handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setDragOver(true)
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const removeSelectedFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const handleUpload = useCallback(async () => {
    if (selectedFiles.length === 0) return

    try {
      const results = await uploadFiles(selectedFiles, options)
      const urls = results.map(r => r.url)
      
      setUploadedFiles(prev => [...prev, ...urls])
      setSelectedFiles([])
      onUploadComplete?.(results)
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }, [selectedFiles, uploadFiles, options, onUploadComplete])

  const handleDeleteUploadedFile = useCallback(async (url: string) => {
    try {
      await deleteFile(url)
      setUploadedFiles(prev => prev.filter(f => f !== url))
      onDelete?.(url)
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }, [deleteFile, onDelete])

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <FileImage className="h-8 w-8 text-blue-500" />
    }
    return <FileIcon className="h-8 w-8 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      <Card 
        className={cn(
          'border-2 border-dashed transition-colors cursor-pointer',
          dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <CardContent className="flex flex-col items-center justify-center py-8 px-4 text-center">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {dragOver ? 'Drop files here' : 'Click to upload or drag & drop'}
            </p>
            <p className="text-sm text-gray-500">
              {accept === 'image/*' ? 'Images only' : 'Various file types supported'}
              {options.maxSize && ` • Max ${options.maxSize}MB per file`}
              {options.maxFiles && ` • Max ${options.maxFiles} files`}
            </p>
          </div>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        disabled={disabled}
      />

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Selected Files ({selectedFiles.length})</h4>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedFiles([])}
                disabled={uploading}
              >
                Clear All
              </Button>
              <Button
                onClick={handleUpload}
                disabled={uploading || selectedFiles.length === 0}
                size="sm"
              >
                {uploading ? 'Uploading...' : 'Upload Files'}
              </Button>
            </div>
          </div>
          
          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-500 text-center">{progress}% uploaded</p>
            </div>
          )}
          
          <div className="grid gap-2">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50"
              >
                {getFileIcon(file)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSelectedFile(index)}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && showPreview && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploaded Files ({uploadedFiles.length})</h4>
          <div className="grid gap-2">
            {uploadedFiles.map((url, index) => (
              <div
                key={`uploaded-${index}`}
                className="flex items-center gap-3 p-3 border rounded-lg bg-green-50"
              >
                {url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                  <div className="relative h-12 w-12 rounded overflow-hidden">
                    <Image
                      src={url}
                      alt="Uploaded file"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <FileIcon className="h-8 w-8 text-gray-500" />
                )}
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {url.split('/').pop()?.split('?')[0] || 'Uploaded file'}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    Uploaded
                  </Badge>
                </div>
                
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(url, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteUploadedFile(url)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
