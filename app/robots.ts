import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://padmaajarasooi.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/products',
          '/contact',
          '/about/quality',
          '/private-label',
          '/export',
          '/products/*',
          '/cart',
          '/auth/signin',
          '/auth/signup',
          '/legal/*',
        ],
        disallow: [
          '/dashboard/*',
          '/admin/*',
          '/api/*',
          '/orders/*',
          '/profile/*',
          '/checkout/*',
          '/maintenance',
          '/offline',
          '/_next/*',
          '/node_modules/*',
          '/*.json$',
          '/*.xml$',
          '/temp/*',
          '/private/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/about',
          '/products',
          '/contact',
          '/about/quality',
          '/private-label',
          '/export',
          '/products/*',
          '/legal/*',
        ],
        disallow: [
          '/dashboard/*',
          '/admin/*',
          '/api/*',
          '/orders/*',
          '/profile/*',
          '/checkout/*',
          '/cart',
          '/auth/*',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/about',
          '/products',
          '/contact',
          '/about/quality',
          '/private-label',
          '/export',
          '/products/*',
          '/legal/*',
        ],
        disallow: [
          '/dashboard/*',
          '/admin/*',
          '/api/*',
          '/orders/*',
          '/profile/*',
          '/checkout/*',
          '/cart',
          '/auth/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
