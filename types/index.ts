// Shared type definitions for the application

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  discount: number
  images: string[]
  stock: number
  sku: string
  slug: string
  isActive: boolean
  categoryId: string
  brand: string | null
  origin: string | null
  weight: string | null
  createdAt: Date
  updatedAt: Date
  category: Category
}

export interface Category {
  id: string
  name: string
  description: string | null
  image: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  name: string | null
  phone: string | null
  referralCode: string
  referredById: string | null
  isActive: boolean
  role: UserRole
  emailVerified: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  total: number
  status: OrderStatus
  items: OrderItem[]
  shippingAddress: Address | null
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  product: Product
}

export interface Address {
  id: string
  userId: string
  name: string
  phone: string
  addressLine1: string
  addressLine2: string | null
  city: string
  state: string
  pincode: string
  country: string
  isDefault: boolean
}

export interface Commission {
  id: string
  userId: string
  orderId: string
  amount: number
  level: number
  type: CommissionType
  status: CommissionStatus
  createdAt: Date
}

export interface CartItem {
  productId: string
  product: Product
  quantity: number
  addedAt: Date
}

// Enums
export enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',          // For Partners
  WHOLESALER = 'WHOLESALER',  // For Wholesale customers
  PART_TIME = 'PART_TIME',    // For those who want part-time job opportunities
  CUSTOMER = 'CUSTOMER'       // Regular customers
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum CommissionType {
  DIRECT = 'DIRECT',
  LEVEL = 'LEVEL',
  BONUS = 'BONUS'
}

export enum CommissionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PAID = 'PAID'
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  totalItems: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  referralCode?: string
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface ProductForm {
  name: string
  description: string
  price: number
  discount: number
  images: string[]
  stock: number
  sku: string
  categoryId: string
  isActive: boolean
}

export interface CategoryForm {
  name: string
  description: string
  image: string | null
  isActive: boolean
}

// Dashboard types
export interface DashboardStats {
  totalSales: number
  totalOrders: number
  totalCommissions: number
  pendingCommissions: number
  teamSize: number
  currentLevel: number
}

export interface NetworkNode {
  user: User
  children: NetworkNode[]
  level: number
  totalSales: number
  directReferrals: number
}

// SEO and Metadata types
export interface SEOData {
  title: string
  description: string
  keywords: string[]
  image: string
  url: string
  type: 'website' | 'article' | 'product'
}

export interface BreadcrumbItem {
  name: string
  url: string
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type WithId<T> = T & { id: string }
export type WithTimestamps<T> = T & { createdAt: Date; updatedAt: Date }
