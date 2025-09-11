'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { Download, FileText, CheckCircle, AlertTriangle } from 'lucide-react'
import Papa from 'papaparse'

interface ExportColumn {
  key: string
  label: string
  transform?: (value: any, row?: any) => string
  required?: boolean
}

interface CsvExportProps {
  title: string
  description: string
  columns: ExportColumn[]
  onExport: (
    selectedColumns: string[],
    filters?: any,
    onProgress?: (progress: number) => void
  ) => Promise<{
    success: boolean
    data?: any[]
    message?: string
  }>
  filters?: {
    label: string
    key: string
    options: { value: string; label: string }[]
  }[]
  maxRecords?: number
  filename?: string
  children?: React.ReactNode
}

export default function CsvExport({
  title,
  description,
  columns,
  onExport,
  filters = [],
  maxRecords = 10000,
  filename,
  children
}: CsvExportProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns.filter(col => col.required).map(col => col.key)
  )
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})
  const [exporting, setExporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<{
    success: boolean
    message?: string
    recordCount?: number
  } | null>(null)

  const handleColumnToggle = (columnKey: string, checked: boolean) => {
    const column = columns.find(col => col.key === columnKey)
    if (column?.required) return // Don't allow unchecking required columns

    if (checked) {
      setSelectedColumns(prev => [...prev, columnKey])
    } else {
      setSelectedColumns(prev => prev.filter(key => key !== columnKey))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedColumns(columns.map(col => col.key))
    } else {
      setSelectedColumns(columns.filter(col => col.required).map(col => col.key))
    }
  }

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilterValues(prev => ({
      ...prev,
      [filterKey]: value
    }))
  }

  const generateFilename = () => {
    if (filename) return filename
    const timestamp = new Date().toISOString().split('T')[0]
    return `${title.toLowerCase().replace(/\s+/g, '_')}_export_${timestamp}.csv`
  }

  const downloadCsv = (data: any[]) => {
    const selectedColumnData = columns.filter(col => selectedColumns.includes(col.key))
    
    // Prepare headers
    const headers = selectedColumnData.map(col => col.label)
    
    // Prepare data rows
    const rows = data.map(row => {
      return selectedColumnData.map(col => {
        const value = row[col.key]
        if (col.transform) {
          return col.transform(value, row)
        }
        return value?.toString() || ''
      })
    })

    // Generate CSV
    const csvContent = Papa.unparse([headers, ...rows])
    
    // Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', generateFilename())
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExport = async () => {
    if (selectedColumns.length === 0) {
      setResult({
        success: false,
        message: 'Please select at least one column to export'
      })
      return
    }

    setExporting(true)
    setProgress(0)
    setResult(null)

    try {
      const exportResult = await onExport(selectedColumns, filterValues, setProgress)
      
      if (exportResult.success && exportResult.data) {
        downloadCsv(exportResult.data)
        setResult({
          success: true,
          message: 'Export completed successfully',
          recordCount: exportResult.data.length
        })
      } else {
        setResult({
          success: false,
          message: exportResult.message || 'Export failed'
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Export failed'
      })
    } finally {
      setExporting(false)
      setProgress(0)
    }
  }

  const resetDialog = () => {
    setResult(null)
    setProgress(0)
    setFilterValues({})
  }

  const selectedCount = selectedColumns.length
  const allSelected = selectedCount === columns.length
  const someSelected = selectedCount > 0 && selectedCount < columns.length

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) resetDialog()
    }}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Filters */}
          {filters.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">Filters</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filters.map(filter => (
                  <div key={filter.key} className="space-y-2">
                    <Label>{filter.label}</Label>
                    <Select
                      value={filterValues[filter.key] || ''}
                      onValueChange={(value) => handleFilterChange(filter.key, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select ${filter.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All</SelectItem>
                        {filter.options.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Column Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Select Columns to Export</h4>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={allSelected}
                  ref={(ref) => {
                    if (ref && ref instanceof HTMLButtonElement) {
                      (ref as any).indeterminate = someSelected
                    }
                  }}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="select-all" className="text-sm">
                  Select All ({selectedCount}/{columns.length})
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded-lg p-4">
              {columns.map(column => (
                <div key={column.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={column.key}
                    checked={selectedColumns.includes(column.key)}
                    onCheckedChange={(checked) => handleColumnToggle(column.key, !!checked)}
                    disabled={column.required}
                  />
                  <Label
                    htmlFor={column.key}
                    className={`text-sm ${column.required ? 'font-medium' : ''}`}
                  >
                    {column.label}
                    {column.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Export Info */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">Export Information</p>
                <ul className="text-blue-700 space-y-1 mt-1">
                  <li>• {selectedCount} columns selected</li>
                  <li>• Maximum {maxRecords.toLocaleString()} records</li>
                  <li>• File format: CSV (UTF-8)</li>
                  <li>• Filename: {generateFilename()}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Export Progress */}
          {exporting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Exporting...</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {/* Export Result */}
          {result && (
            <Alert variant={result.success ? 'default' : 'destructive'}>
              {result.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <AlertDescription>
                <div className="space-y-1">
                  <p className="font-medium">{result.message}</p>
                  {result.recordCount !== undefined && (
                    <p className="text-sm">
                      Exported {result.recordCount.toLocaleString()} records
                    </p>
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
              disabled={exporting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={selectedColumns.length === 0 || exporting}
            >
              {exporting ? 'Exporting...' : 'Export Data'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
