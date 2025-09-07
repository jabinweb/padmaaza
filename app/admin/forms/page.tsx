'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  Mail, 
  Search, 
  Filter, 
  Eye, 
  Calendar,
  User,
  Building,
  Phone,
  MessageSquare,
  ExternalLink
} from 'lucide-react'
import { toast } from 'sonner'

interface FormResponse {
  id: string
  formId: string
  data: any // Changed from specific interface to any to handle different form types
  metadata?: {
    ipAddress?: string
    userAgent?: string
    referrer?: string
    timestamp?: string
  }
  status: string
  createdAt: string
  updatedAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export default function AdminFormsPage() {
  const [forms, setForms] = useState<FormResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedForm, setSelectedForm] = useState<FormResponse | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('all')
  const [formTypeFilter, setFormTypeFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchForms = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })

      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }
      
      if (formTypeFilter !== 'all') {
        params.append('formId', formTypeFilter)
      }

      const response = await fetch(`/api/forms?${params}`)
      const result = await response.json()

      if (result.success) {
        setForms(result.data)
        setPagination(result.pagination)
      } else {
        toast.error('Failed to fetch form responses')
      }
    } catch (error) {
      console.error('Error fetching forms:', error)
      toast.error('Failed to fetch form responses')
    } finally {
      setLoading(false)
    }
  }, [pagination.page, pagination.limit, statusFilter, formTypeFilter])

  useEffect(() => {
    fetchForms()
  }, [fetchForms])

  const updateFormStatus = async (formId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/forms/${formId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        toast.success('Status updated successfully')
        fetchForms()
        if (selectedForm && selectedForm.id === formId) {
          setSelectedForm({ ...selectedForm, status: newStatus })
        }
      } else {
        toast.error('Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    }
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      new: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    }
    
    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    )
  }

  const getFormTypeBadge = (formId: string) => {
    const typeColors = {
      contact: 'bg-purple-100 text-purple-800',
      partnership: 'bg-indigo-100 text-indigo-800',
      bulk_inquiry: 'bg-orange-100 text-orange-800',
      support: 'bg-teal-100 text-teal-800'
    }
    
    return (
      <Badge variant="outline" className={typeColors[formId as keyof typeof typeColors]}>
        {formId.replace('_', ' ').toUpperCase()}
      </Badge>
    )
  }

  const filteredForms = forms.filter(form => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const data = form.data
      
      // Handle different form types
      if (form.formId === 'partnership_application') {
        return (
          data.firstName?.toLowerCase().includes(query) ||
          data.lastName?.toLowerCase().includes(query) ||
          data.email?.toLowerCase().includes(query) ||
          data.businessName?.toLowerCase().includes(query) ||
          data.partnershipTier?.toLowerCase().includes(query) ||
          data.motivation?.toLowerCase().includes(query)
        )
      } else {
        // Contact forms and other types
        return (
          data.name?.toLowerCase().includes(query) ||
          data.email?.toLowerCase().includes(query) ||
          data.message?.toLowerCase().includes(query) ||
          data.subject?.toLowerCase().includes(query)
        )
      }
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Form Responses</h1>
          <p className="text-muted-foreground">
            Manage and respond to customer inquiries and form submissions
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={formTypeFilter} onValueChange={setFormTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Form Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="contact">Contact</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="bulk_inquiry">Bulk Inquiry</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Form Responses Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Form Responses ({pagination.total})
          </CardTitle>
          <CardDescription>
            Click on any row to view detailed information and respond to inquiries
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredForms.map((form) => {
                    // Handle different form types for display
                    const displayName = form.formId === 'partnership_application' 
                      ? `${form.data.firstName || ''} ${form.data.lastName || ''}`.trim()
                      : form.data.name || 'Unknown'
                    
                    const displayEmail = form.data.email || 'No email'
                    
                    const displaySubject = form.formId === 'partnership_application'
                      ? `${form.data.partnershipTier || 'Unknown'} Partnership Application`
                      : form.data.subject || form.data.inquiryType || 'No subject'
                    
                    return (
                      <TableRow key={form.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{displayName}</TableCell>
                        <TableCell>{displayEmail}</TableCell>
                        <TableCell>{getFormTypeBadge(form.formId)}</TableCell>
                        <TableCell>{getStatusBadge(form.status)}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {displaySubject}
                        </TableCell>
                        <TableCell>
                          {new Date(form.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedForm(form)
                              setShowDetails(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}

                </TableBody>
              </Table>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                    {pagination.total} entries
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                      disabled={pagination.page === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                      disabled={pagination.page === pagination.pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Form Response Details
            </DialogTitle>
            <DialogDescription>
              View and manage this form submission
            </DialogDescription>
          </DialogHeader>

          {selectedForm && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getFormTypeBadge(selectedForm.formId)}
                    {getStatusBadge(selectedForm.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Submitted on {new Date(selectedForm.createdAt).toLocaleDateString()} at{' '}
                    {new Date(selectedForm.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                
                <Select
                  value={selectedForm.status}
                  onValueChange={(newStatus) => updateFormStatus(selectedForm.id, newStatus)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Name:</span>
                    <span>
                      {selectedForm.formId === 'partnership_application' 
                        ? `${selectedForm.data.firstName || ''} ${selectedForm.data.lastName || ''}`.trim()
                        : selectedForm.data.name || 'Unknown'
                      }
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <a 
                      href={`mailto:${selectedForm.data.email}`}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      {selectedForm.data.email}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  
                  {selectedForm.data.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Phone:</span>
                      <a 
                        href={`tel:${selectedForm.data.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedForm.data.phone}
                      </a>
                    </div>
                  )}
                  
                  {/* Show business info for partnership applications */}
                  {selectedForm.formId === 'partnership_application' && selectedForm.data.businessName && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Business:</span>
                      <span>{selectedForm.data.businessName}</span>
                    </div>
                  )}
                  
                  {/* Show company info for other forms */}
                  {selectedForm.formId !== 'partnership_application' && selectedForm.data.company && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Company:</span>
                      <span>{selectedForm.data.company}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Message/Details Content */}
              {selectedForm.formId === 'partnership_application' ? (
                // Partnership Application Details
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Partnership Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-medium">Partnership Tier:</span>
                          <Badge variant="outline" className="ml-2">{selectedForm.data.partnershipTier}</Badge>
                        </div>
                        <div>
                          <span className="font-medium">Expected Customers:</span>
                          <span className="ml-2">{selectedForm.data.expectedCustomers || 'Not specified'}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-medium">Business Type:</span>
                          <span className="ml-2">{selectedForm.data.businessType || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="font-medium">Experience:</span>
                          <span className="ml-2">{selectedForm.data.experience || 'Not specified'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Address Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div><span className="font-medium">Address:</span> {selectedForm.data.address || 'Not provided'}</div>
                        <div className="grid grid-cols-3 gap-4">
                          <div><span className="font-medium">City:</span> {selectedForm.data.city || 'Not provided'}</div>
                          <div><span className="font-medium">State:</span> {selectedForm.data.state || 'Not provided'}</div>
                          <div><span className="font-medium">Zip Code:</span> {selectedForm.data.zipCode || 'Not provided'}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Motivation & Plans</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <span className="font-medium">Motivation:</span>
                        <div className="bg-muted/50 p-3 rounded-lg mt-2">
                          <p className="whitespace-pre-wrap">{selectedForm.data.motivation || 'Not provided'}</p>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Marketing Plan:</span>
                        <div className="bg-muted/50 p-3 rounded-lg mt-2">
                          <p className="whitespace-pre-wrap">{selectedForm.data.marketingPlan || 'Not provided'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                // Regular Contact Form Message
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Message</CardTitle>
                    {selectedForm.data.subject && (
                      <CardDescription className="font-medium">
                        Subject: {selectedForm.data.subject}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="whitespace-pre-wrap">{selectedForm.data.message}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Additional Information */}
              {(selectedForm.data.inquiryType || selectedForm.data.formSource) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {selectedForm.data.inquiryType && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Inquiry Type:</span>
                        <Badge variant="outline">{selectedForm.data.inquiryType}</Badge>
                      </div>
                    )}
                    
                    {selectedForm.data.formSource && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Form Source:</span>
                        <span>{selectedForm.data.formSource}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Metadata */}
              {selectedForm.metadata && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Technical Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {selectedForm.metadata.ipAddress && (
                      <div>
                        <span className="font-medium">IP Address:</span> {selectedForm.metadata.ipAddress}
                      </div>
                    )}
                    
                    {selectedForm.metadata.referrer && (
                      <div>
                        <span className="font-medium">Referrer:</span> {selectedForm.metadata.referrer}
                      </div>
                    )}
                    
                    {selectedForm.metadata.userAgent && (
                      <div>
                        <span className="font-medium">User Agent:</span>
                        <div className="mt-1 p-2 bg-muted/50 rounded text-xs break-all">
                          {selectedForm.metadata.userAgent}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => window.open(`mailto:${selectedForm.data.email}?subject=Re: ${selectedForm.data.subject || 'Your inquiry'}`)}
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Reply via Email
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => updateFormStatus(selectedForm.id, 'resolved')}
                  disabled={selectedForm.status === 'resolved'}
                >
                  Mark as Resolved
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
