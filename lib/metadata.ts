import { Metadata } from 'next'

interface PageMetadataParams {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  noIndex?: boolean
}

export function generatePageMetadata({
  title = 'Padmaaja Rasooi - Premium Rice Products & Quality Grains',
  description = 'Experience the finest quality rice with Padmaaja Rasooi. Discover our premium rice products and quality grains sourced directly from farmers.',
  keywords = ['padmaaja rasooi', 'premium rice', 'quality rice', 'quality grains', 'organic rice', 'farm fresh rice'],
  image = '/images/og-image.png',
  url = '/',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Padmaaja Rasooi Team',
  noIndex = false
}: PageMetadataParams): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://padmaajarasooi.com'
  const fullUrl = `${baseUrl}${url}`
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  return {
    title,
    description,
    keywords,
    authors: [{ name: author }],
    creator: 'Padmaaja Rasooi',
    publisher: 'Padmaaja Rasooi',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Padmaaja Rasooi',
      locale: 'en_US',
      type: type as any,
      publishedTime,
      modifiedTime,
      authors: [author],
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      site: '@padmaajarasooi',
      creator: '@padmaajarasooi'
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-site-verification', // Add your actual verification code
      // Note: Next.js only supports google and yahoo verification in the verification object
      // For other search engines, use meta tags in the head section
    }
  }
}

// Pre-configured metadata for common pages
export const MetadataConfigs = {
  home: (): Metadata => generatePageMetadata({
    title: 'Padmaaja Rasooi - Premium Rice Products & Quality Grains',
    description: 'Experience the finest quality rice with Padmaaja Rasooi. Discover our premium rice products and quality grains sourced directly from farmers across India.',
    keywords: ['padmaaja rasooi', 'premium rice', 'quality rice', 'quality grains', 'organic rice', 'basmati rice', 'rice supplier India', 'farm fresh rice', 'premium grains'],
    url: '/',
    image: '/images/home-og.png'
  }),

  products: (): Metadata => generatePageMetadata({
    title: 'Premium Rice Products | Padmaaja Rasooi - Quality Rice Collection',
    description: 'Explore our extensive collection of premium quality rice varieties. From organic basmati to traditional rice, find the perfect rice for your culinary needs.',
    keywords: ['premium rice products', 'organic rice', 'basmati rice', 'rice varieties', 'quality rice', 'rice collection', 'padmaaja rasooi products'],
    url: '/products',
    image: '/images/products-og.png'
  }),

  about: (): Metadata => generatePageMetadata({
    title: 'About Padmaaja Rasooi | Quality Rice Heritage & Sustainable Farming',
    description: 'Learn about Padmaaja Rasooi\'s commitment to quality rice products, sustainable farming practices, and our premium grain sourcing from local farmers.',
    keywords: ['about padmaaja rasooi', 'rice company history', 'quality standards', 'sustainable farming', 'rice heritage', 'company values'],
    url: '/about',
    image: '/images/about-og.png'
  }),

  contact: (): Metadata => generatePageMetadata({
    title: 'Contact Padmaaja Rasooi | Rice Supplier & Customer Support',
    description: 'Get in touch with Padmaaja Rasooi for premium rice products, wholesale inquiries, bulk orders, or customer support.',
    keywords: ['contact padmaaja rasooi', 'rice supplier contact', 'wholesale inquiry', 'customer support', 'wholesale rice', 'bulk rice orders'],
    url: '/contact',
    image: '/images/contact-og.png'
  }),

  qualityStandards: (): Metadata => generatePageMetadata({
    title: 'Quality Standards | Padmaaja Rasooi - Premium Rice Quality Assurance',
    description: 'Discover our rigorous quality standards and testing procedures that ensure every grain of Padmaaja Rasooi rice meets the highest quality benchmarks.',
    keywords: ['rice quality standards', 'quality assurance', 'rice testing', 'premium quality', 'food safety', 'padmaaja rasooi quality'],
    url: '/about/quality',
    image: '/images/quality-og.png'
  }),

  privateLabel: (): Metadata => generatePageMetadata({
    title: 'Private Label Services | Padmaaja Rasooi - Custom Rice Branding',
    description: 'Explore our private label rice services. Partner with Padmaaja Rasooi to create your own branded premium rice products with our quality assurance.',
    keywords: ['private label rice', 'custom rice branding', 'white label rice', 'rice manufacturing', 'private label services', 'branded rice'],
    url: '/private-label',
    image: '/images/private-label-og.png'
  }),

  exportServices: (): Metadata => generatePageMetadata({
    title: 'Export Services | Padmaaja Rasooi - International Rice Supply',
    description: 'Padmaaja Rasooi export services for international rice supply. Quality Indian rice exported globally with proper certifications and packaging.',
    keywords: ['rice export', 'international rice supply', 'rice exporter India', 'global rice supply', 'export services', 'international trade'],
    url: '/export',
    image: '/images/export-og.png'
  }),

  privacyPolicy: (): Metadata => generatePageMetadata({
    title: 'Privacy Policy | Padmaaja Rasooi - Data Protection & Privacy Rights',
    description: 'Read our comprehensive privacy policy to understand how Padmaaja Rasooi protects your personal information and respects your privacy rights.',
    keywords: ['privacy policy', 'data protection', 'personal information', 'GDPR compliance', 'privacy rights', 'padmaaja rasooi'],
    url: '/legal/privacy-policy',
    image: '/images/legal-og.png'
  }),

  termsOfService: (): Metadata => generatePageMetadata({
    title: 'Terms of Service | Padmaaja Rasooi - Service Agreement & Policies',
    description: 'Read our comprehensive terms of service covering product purchases, customer responsibilities, and service policies for Padmaaja Rasooi.',
    keywords: ['terms of service', 'service agreement', 'purchase terms', 'legal terms', 'conditions', 'padmaaja rasooi'],
    url: '/legal/terms-of-service',
    image: '/images/legal-og.png'
  }),

  refundPolicy: (): Metadata => generatePageMetadata({
    title: 'Refund Policy | Padmaaja Rasooi - Returns & Refund Guidelines',
    description: 'Comprehensive refund and return policy for Padmaaja Rasooi rice products. Learn about eligibility, process, and timelines for returns.',
    keywords: ['refund policy', 'return policy', 'money back guarantee', 'product returns', 'refund process', 'padmaaja rasooi'],
    url: '/legal/refund-policy',
    image: '/images/legal-og.png'
  }),

  dashboard: (): Metadata => generatePageMetadata({
    title: 'Dashboard | Padmaaja Rasooi - Account Management',
    description: 'Access your Padmaaja Rasooi dashboard to manage your account, track orders, view purchase history, and manage your profile.',
    keywords: ['customer dashboard', 'account management', 'order tracking', 'purchase history', 'padmaaja rasooi'],
    url: '/dashboard',
    image: '/images/dashboard-og.png',
    noIndex: true // Private area
  }),

  adminPanel: (): Metadata => generatePageMetadata({
    title: 'Admin Panel | Padmaaja Rasooi - Business Administration',
    description: 'Administrative panel for managing Padmaaja Rasooi business operations, users, products, and system settings.',
    keywords: ['admin panel', 'business administration', 'system management', 'padmaaja rasooi'],
    url: '/admin',
    image: '/images/admin-og.png',
    noIndex: true // Private area
  })
}

// Dynamic metadata generators
export function generateProductMetadata(product: {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
}): Metadata {
  return generatePageMetadata({
    title: `${product.name} | Premium Rice | Padmaaja Rasooi`,
    description: `${product.description} Premium quality ${product.category.toLowerCase()} rice from Padmaaja Rasooi. Price: ₹${product.price}`,
    keywords: [product.name.toLowerCase(), product.category.toLowerCase(), 'premium rice', 'quality rice', 'padmaaja rasooi'],
    url: `/products/${product.id}`,
    image: product.images[0] || '/images/product-default-og.png',
    type: 'product'
  })
}

export function generateCategoryMetadata(category: {
  name: string
  description: string
  productCount: number
}): Metadata {
  return generatePageMetadata({
    title: `${category.name} Rice | Premium Quality | Padmaaja Rasooi`,
    description: `${category.description} Explore ${category.productCount}+ premium ${category.name.toLowerCase()} rice varieties from Padmaaja Rasooi.`,
    keywords: [category.name.toLowerCase(), 'rice category', 'premium rice', 'quality rice', 'padmaaja rasooi'],
    url: `/products/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`,
    image: `/images/category-${category.name.toLowerCase().replace(/\s+/g, '-')}-og.png`
  })
}
