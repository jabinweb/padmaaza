'use client'

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Upload, Download, FileText, AlertTriangle, CheckCircle, X } from 'lucide-react'
import Papa from 'papaparse'

interface ColumnDefinition {
  key: string
  label: string
  required?: boolean
}

interface CsvImportProps {
  title: string
  description: string
  templateColumns: Array<ColumnDefinition | string>
  onImport: (data: any[], onProgress?: (progress: number) => void) => Promise<{
    success: boolean
    message: string
    successCount?: number
    errorCount?: number
    errors?: string[]
  }>
  sampleData?: Record<string, any>[]
  validationRules?: {
    required?: string[]
    formats?: Record<string, (value: any) => boolean>
    transforms?: Record<string, (value: any) => any>
  }
  maxFileSize?: number // in MB
  children?: React.ReactNode
}

export default function CsvImport({
  title,
  description,
  templateColumns,
  onImport,
  sampleData = [],
  validationRules = {},
  maxFileSize = 10,
  children
}: CsvImportProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    successCount?: number
    errorCount?: number
    errors?: string[]
  } | null>(null)
  const [preview, setPreview] = useState<any[]>([])
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Normalize templateColumns to always be ColumnDefinition objects
  const normalizedColumns: ColumnDefinition[] = templateColumns.map(col => 
    typeof col === 'string' 
      ? { key: col, label: col, required: false }
      : col
  )

  const downloadTemplate = () => {
    const headers = normalizedColumns.map(col => col.label)
    const csvContent = Papa.unparse([
      headers,
      ...sampleData.map(row => normalizedColumns.map(col => row[col.key] || ''))
    ])
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}_template.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const validateData = (data: any[]): string[] => {
    const errors: string[] = []
    const { required = [], formats = {}, transforms = {} } = validationRules
    
    // Get required fields from template columns and validation rules
    const requiredFields = [
      ...required,
      ...normalizedColumns.filter(col => col.required).map(col => col.key)
    ]

    data.forEach((row, index) => {
      // Check required fields
      requiredFields.forEach(field => {
        if (!row[field] || row[field].toString().trim() === '') {
          const column = normalizedColumns.find(col => col.key === field)
          const fieldLabel = column ? column.label : field
          errors.push(`Row ${index + 1}: ${fieldLabel} is required`)
        }
      })

      // Check format validations
      Object.entries(formats).forEach(([field, validator]) => {
        if (row[field] && !validator(row[field])) {
          const column = normalizedColumns.find(col => col.key === field)
          const fieldLabel = column ? column.label : field
          errors.push(`Row ${index + 1}: ${fieldLabel} has invalid format`)
        }
      })

      // Apply transformations
      Object.entries(transforms).forEach(([field, transformer]) => {
        if (row[field]) {
          try {
            row[field] = transformer(row[field])
          } catch (error) {
            const column = normalizedColumns.find(col => col.key === field)
            const fieldLabel = column ? column.label : field
            errors.push(`Row ${index + 1}: ${fieldLabel} transformation failed`)
          }
        }
      })
    })

    return errors
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    // Check file size
    if (selectedFile.size > maxFileSize * 1024 * 1024) {
      setValidationErrors([`File size must be less than ${maxFileSize}MB`])
      return
    }

    // Check file type
    if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
      setValidationErrors(['Please select a CSV file'])
      return
    }

    setFile(selectedFile)
    setValidationErrors([])
    setResult(null)

    // Parse and preview the file
    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setValidationErrors(results.errors.map(err => err.message))
          return
        }

        const data = results.data as any[]
        const errors = validateData(data)
        
        if (errors.length > 0) {
          setValidationErrors(errors.slice(0, 10)) // Show first 10 errors
          return
        }

        setPreview(data.slice(0, 5)) // Show first 5 rows
        setValidationErrors([])
      },
      error: (error) => {
        setValidationErrors([error.message])
      }
    })
  }

  const handleImport = async () => {
    if (!file) return

    setImporting(true)
    setProgress(0)
    setResult(null)

    try {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          try {
            const data = results.data as any[]
            const errors = validateData(data)
            
            if (errors.length > 0) {
              setResult({
                success: false,
                message: 'Validation failed',
                errors: errors
              })
              return
            }

            const result = await onImport(data, setProgress)
            setResult(result)
            
            if (result.success) {
              setFile(null)
              setPreview([])
              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
            }
          } catch (error) {
            setResult({
              success: false,
              message: error instanceof Error ? error.message : 'Import failed'
            })
          } finally {
            setImporting(false)
            setProgress(0)
          }
        }
      })
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Import failed'
      })
      setImporting(false)
      setProgress(0)
    }
  }

  const resetDialog = () => {
    setFile(null)
    setPreview([])
    setValidationErrors([])
    setResult(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) resetDialog()
    }}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Download Template */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <h4 className="font-medium">Download Template</h4>
                <p className="text-sm text-gray-500">
                  Download CSV template with required columns
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={downloadTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Template
            </Button>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="csv-file">Select CSV File</Label>
            <Input
              ref={fileInputRef}
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={importing}
            />
            <p className="text-xs text-gray-500">
              Maximum file size: {maxFileSize}MB. Only CSV files are supported.
            </p>
          </div>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <p className="font-medium">Validation Errors:</p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Preview */}
          {preview.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Preview (First 5 rows)</h4>
              <div className="border rounded-lg overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {normalizedColumns.map(col => (
                        <th key={col.key} className="px-3 py-2 text-left font-medium">
                          {col.label}
                          {col.required && <span className="text-red-500 ml-1">*</span>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, index) => (
                      <tr key={index} className="border-t">
                        {normalizedColumns.map(col => (
                          <td key={col.key} className="px-3 py-2">
                            {row[col.key]?.toString() || ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Import Progress */}
          {importing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Importing...</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {/* Import Result */}
          {result && (
            <Alert variant={result.success ? 'default' : 'destructive'}>
              {result.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">{result.message}</p>
                  {result.successCount !== undefined && (
                    <p className="text-sm">
                      Successfully imported: {result.successCount} records
                    </p>
                  )}
                  {result.errorCount !== undefined && result.errorCount > 0 && (
                    <p className="text-sm">
                      Failed to import: {result.errorCount} records
                    </p>
                  )}
                  {result.errors && result.errors.length > 0 && (
                    <div className="text-sm">
                      <p className="font-medium">Errors:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {result.errors.slice(0, 10).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                        {result.errors.length > 10 && (
                          <li>... and {result.errors.length - 10} more errors</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={importing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || validationErrors.length > 0 || importing}
            >
              {importing ? 'Importing...' : 'Import Data'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
