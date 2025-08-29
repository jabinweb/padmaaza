import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  siteName?: string
  locale?: string
}

export default function SEO({
  title = 'Padmaaja Rasool - Premium Rice Products & Quality Grains',
  description = 'Experience the finest quality rice with Padmaaja Rasool. Premium rice varieties sourced from the best farms for exceptional taste and nutrition.',
  keywords = ['padmaaja rasool', 'premium rice', 'quality rice', 'organic rice', 'basmati rice', 'rice products', 'quality grains'],
  image = '/images/og-image.png',
  url = '',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Padmaaja Rasool Team',
  siteName = 'Padmaaja Rasool',
  locale = 'en_US'
}: SEOProps) {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://padmaajarasool.com'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@padmaajarasool" />
      <meta name="twitter:creator" content="@padmaajarasool" />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Language and Region */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      
      {/* Schema.org for Google */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={fullImageUrl} />
    </Head>
  )
}

// Pre-defined SEO configurations for common pages
export const SEOConfigs = {
  home: {
    title: 'Padmaaja Rasool - Premium Rice Products & Quality Grains',
    description: 'Experience the finest quality rice with Padmaaja Rasool. Premium rice varieties sourced from the best farms for exceptional taste and nutrition.',
    keywords: ['padmaaja rasool', 'premium rice', 'quality rice', 'organic rice', 'basmati rice', 'rice products', 'quality grains', 'agriculture'],
    url: '/'
  },
  products: {
    title: 'Premium Rice Products | Padmaaja Rasool',
    description: 'Explore our extensive collection of premium quality rice varieties. From organic basmati to traditional rice, find the perfect rice for your needs.',
    keywords: ['premium rice', 'organic rice', 'basmati rice', 'rice varieties', 'quality rice', 'rice products', 'padmaaja rasool'],
    url: '/products'
  },
  about: {
    title: 'About Us | Padmaaja Rasool - Quality Rice Heritage',
    description: 'Learn about Padmaaja Rasool\'s commitment to quality rice products and sustainable farming practices. Discover our story and values.',
    keywords: ['about padmaaja rasool', 'rice company', 'quality standards', 'sustainable farming', 'rice heritage'],
    url: '/about'
  },
  contact: {
    title: 'Contact Us | Padmaaja Rasool',
    description: 'Get in touch with Padmaaja Rasool for premium rice products, wholesale inquiries, or any questions. We\'re here to help.',
    keywords: ['contact padmaaja rasool', 'rice supplier contact', 'wholesale inquiry', 'customer support'],
    url: '/contact'
  },
  privacyPolicy: {
    title: 'Privacy Policy | Padmaaja Rasool',
    description: 'Read our privacy policy to understand how Padmaaja Rasool protects and handles your personal information.',
    keywords: ['privacy policy', 'data protection', 'personal information', 'padmaaja rasool'],
    url: '/legal/privacy-policy'
  },
  termsOfService: {
    title: 'Terms of Service | Padmaaja Rasool',
    description: 'Read our terms of service for using Padmaaja Rasool products and services.',
    keywords: ['terms of service', 'legal terms', 'service conditions', 'padmaaja rasool'],
    url: '/legal/terms-of-service'
  },
  refundPolicy: {
    title: 'Refund Policy | Padmaaja Rasool',
    description: 'Learn about our refund and return policy for Padmaaja Rasool rice products and services.',
    keywords: ['refund policy', 'return policy', 'money back guarantee', 'padmaaja rasool'],
    url: '/legal/refund-policy'
  }
}
