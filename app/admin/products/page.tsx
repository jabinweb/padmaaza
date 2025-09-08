'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Search, Plus, Edit, Trash2, MoreHorizontal, Download, Save } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  discount: number
  stock: number
  isActive: boolean
  images: string[]
  sku: string
  weight: string | null
  categoryId: string
  category: {
    id: string
    name: string
  }
}

interface QuickEditFormData {
  name: string
  description: string
  price: number
  discount: number
  stock: number
  weight: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [bulkActionLoading, setBulkActionLoading] = useState(false)
  const [quickEditOpen, setQuickEditOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [quickEditForm, setQuickEditForm] = useState<QuickEditFormData>({
    name: '',
    description: '',
    price: 0,
    discount: 0,
    stock: 0,
    weight: ''
  })
  const [quickEditLoading, setQuickEditLoading] = useState(false)

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: '1',
        limit: '20',
        admin: 'true' // Add admin flag to get all products
      })
      
      if (search) params.append('search', search)

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(products.map(p => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts(prev => [...prev, productId])
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId))
    }
  }

  const handleBulkAction = async (action: 'activate' | 'deactivate' | 'delete') => {
    if (selectedProducts.length === 0) {
      toast.error('Please select at least one product')
      return
    }

    setBulkActionLoading(true)
    try {
      const response = await fetch('/api/admin/products/bulk', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productIds: selectedProducts,
          action
        })
      })

      if (!response.ok) throw new Error('Bulk action failed')

      toast.success(`Successfully ${action}d ${selectedProducts.length} products`)
      setSelectedProducts([])
      fetchProducts()
    } catch (error) {
      toast.error(`Failed to ${action} products`)
    } finally {
      setBulkActionLoading(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Delete failed')

      toast.success('Product deleted successfully')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  const handleQuickEdit = (product: Product) => {
    setEditingProduct(product)
    setQuickEditForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      discount: product.discount,
      stock: product.stock,
      weight: product.weight || ''
    })
    setQuickEditOpen(true)
  }

  const handleQuickEditSave = async () => {
    if (!editingProduct) return

    setQuickEditLoading(true)
    try {
      const response = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quickEditForm.name,
          description: quickEditForm.description,
          price: quickEditForm.price,
          discount: quickEditForm.discount,
          stock: quickEditForm.stock,
          weight: quickEditForm.weight,
          // Keep existing values that aren't being edited
          images: editingProduct.images,
          sku: editingProduct.sku,
          isActive: editingProduct.isActive,
          categoryId: editingProduct.categoryId || editingProduct.category.id
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Update failed')
      }

      toast.success('Product updated successfully')
      setQuickEditOpen(false)
      setEditingProduct(null)
      fetchProducts()
    } catch (error) {
      console.error('Quick edit error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to update product')
    } finally {
      setQuickEditLoading(false)
    }
  }

  const handleQuickEditInputChange = (field: keyof QuickEditFormData, value: string | number) => {
    setQuickEditForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Products</CardTitle>
            <div className="flex items-center space-x-2">
              {selectedProducts.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {selectedProducts.length} selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('activate')}
                    disabled={bulkActionLoading}
                  >
                    Activate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('deactivate')}
                    disabled={bulkActionLoading}
                  >
                    Deactivate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('delete')}
                    disabled={bulkActionLoading}
                    className="text-red-600"
                  >
                    Delete
                  </Button>
                </div>
              )}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedProducts.length === products.length && products.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={(checked) => handleSelectProduct(product.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={product.images[0] || 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg'}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          {product.discount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {product.discount}% OFF
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>
                      <div>
                        {product.discount > 0 ? (
                          <>
                            <span className="font-bold text-green-600">
                              ₹{(product.price - (product.price * product.discount / 100)).toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ₹{product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="font-bold">₹{product.price.toFixed(2)}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.stock > 10 ? 'default' : product.stock > 0 ? 'secondary' : 'destructive'}>
                        {product.stock}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.isActive ? 'default' : 'secondary'}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleQuickEdit(product)}
                          className="h-8 px-2"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Quick Edit
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/products/${product.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Full Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quick Edit Dialog */}
      <Dialog open={quickEditOpen} onOpenChange={setQuickEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Quick Edit Product</DialogTitle>
          </DialogHeader>
          
          {editingProduct && (
            <div className="space-y-6">
              {/* Product Image and Basic Info */}
              <div className="flex items-start space-x-4">
                <Image
                  src={editingProduct.images[0] || 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg'}
                  alt={editingProduct.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">SKU: {editingProduct.sku}</p>
                  <p className="text-sm text-gray-500">Category: {editingProduct.category.name}</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quick-name">Product Name</Label>
                  <Input
                    id="quick-name"
                    value={quickEditForm.name}
                    onChange={(e) => handleQuickEditInputChange('name', e.target.value)}
                    placeholder="Product name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quick-weight">Weight</Label>
                  <Input
                    id="quick-weight"
                    value={quickEditForm.weight}
                    onChange={(e) => handleQuickEditInputChange('weight', e.target.value)}
                    placeholder="e.g., 1kg, 500g"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quick-price">Price (₹)</Label>
                  <Input
                    id="quick-price"
                    type="number"
                    step="0.01"
                    value={quickEditForm.price}
                    onChange={(e) => handleQuickEditInputChange('price', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quick-discount">Discount (%)</Label>
                  <Input
                    id="quick-discount"
                    type="number"
                    min="0"
                    max="100"
                    value={quickEditForm.discount}
                    onChange={(e) => handleQuickEditInputChange('discount', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quick-stock">Stock Quantity</Label>
                  <Input
                    id="quick-stock"
                    type="number"
                    min="0"
                    value={quickEditForm.stock}
                    onChange={(e) => handleQuickEditInputChange('stock', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quick-discounted-price">Final Price</Label>
                  <div className="p-2 bg-gray-50 rounded-md text-sm">
                    ₹{(quickEditForm.price - (quickEditForm.price * quickEditForm.discount / 100)).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quick-description">Description</Label>
                <Textarea
                  id="quick-description"
                  value={quickEditForm.description}
                  onChange={(e) => handleQuickEditInputChange('description', e.target.value)}
                  placeholder="Product description"
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setQuickEditOpen(false)}
                  disabled={quickEditLoading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleQuickEditSave}
                  disabled={quickEditLoading}
                >
                  {quickEditLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
