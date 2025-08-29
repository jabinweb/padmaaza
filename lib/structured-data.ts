import { Product } from '@/types'

interface ContactPoint {
  "@type": string
  telephone: string
  email: string
  contactType: string
}

interface PostalAddress {
  "@type": string
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

interface Organization {
  name: string
  url: string
  logo: string
  description: string
  contactPoint: ContactPoint
  address: PostalAddress
  sameAs?: string[]
  foundingDate?: string
  numberOfEmployees?: string
  industry?: string
  areaServed?: {
    "@type": string
    name: string
  }
}

export function generateProductJsonLd(product: Product, baseUrl: string = '') {
  const currentPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price

  const productJsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${baseUrl}/products/${product.slug || product.id}`,
    "name": product.name,
    "description": product.description || `Premium quality ${product.category.name} rice from Padmaaja Rasool`,
    "image": product.images.map(img => `${baseUrl}${img}`),
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Padmaaja Rasool"
    },
    "category": product.category.name,
    "sku": product.sku || product.id,
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/products/${product.id}`,
      "priceCurrency": "INR",
      "price": currentPrice.toFixed(2),
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      "availability": product.stock && product.stock > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Padmaaja Rasool",
        "url": baseUrl
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "125"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Satisfied Customer"
        },
        "reviewBody": "Excellent quality rice with authentic taste and premium packaging."
      }
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Origin",
        "value": product.origin || "India"
      },
      {
        "@type": "PropertyValue",
        "name": "Weight",
        "value": product.weight || "1kg"
      },
      {
        "@type": "PropertyValue",
        "name": "Quality Grade",
        "value": "Premium"
      }
    ]
  }

  // Add additional fields if available
  if (product.origin) {
    productJsonLd.additionalProperty.find((prop: any) => prop.name === "Origin").value = product.origin
  }
  
  if (product.weight) {
    productJsonLd.additionalProperty.find((prop: any) => prop.name === "Weight").value = product.weight
  }

  return productJsonLd
}

export function generateProductListJsonLd(products: Product[], baseUrl: string = '') {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Padmaaja Rasool Premium Rice Products",
    "description": "Complete collection of premium quality rice products",
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "@id": `${baseUrl}/products/${product.slug || product.id}`,
        "name": product.name,
        "image": product.images[0] ? `${baseUrl}${product.images[0]}` : '',
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": (product.discount 
            ? product.price - (product.price * product.discount / 100)
            : product.price).toFixed(2)
        }
      }
    }))
  }
}

export function generateOrganizationJsonLd(baseUrl: string = ''): Organization & { "@context": string, "@type": string } {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Padmaaja Rasool",
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.png`,
    "description": "Premium rice products and quality grains offering the finest quality rice sourced directly from certified farms.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9876543210",
      "email": "contact@padmaajarasool.com",
      "contactType": "Customer Service"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Rice Market Street",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500001",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/padmaajarasool",
      "https://www.instagram.com/padmaajarasool",
      "https://www.linkedin.com/company/padmaajarasool"
    ],
    "foundingDate": "2020",
    "numberOfEmployees": "25-50",
    "industry": "Agriculture, Food Products, Wholesale Trade",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
  }
}

export function generateBreadcrumbJsonLd(breadcrumbs: Array<{ name: string, url: string }>, baseUrl: string = '') {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${baseUrl}${crumb.url}`
    }))
  }
}

export function generateFAQJsonLd(faqs: Array<{ question: string, answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

export function generateLocalBusinessJsonLd(baseUrl: string = '') {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Padmaaja Rasool",
    "image": `${baseUrl}/images/business-photo.jpg`,
    "description": "Premium rice products and quality grains",
    "url": baseUrl,
    "telephone": "+91-9876543210",
    "email": "contact@padmaajarasool.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Rice Market Street",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.3850",
      "longitude": "78.4867"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday", 
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "₹₹",
    "servesCuisine": "Indian",
    "hasMenu": `${baseUrl}/products`,
    "acceptsReservations": false
  }
}
