/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  images: { 
    unoptimized: false, // Enable image optimization
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    domains: ['images.unsplash.com', '4m5m4tx28rtva30c.public.blob.vercel-storage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https', 
        hostname: '4m5m4tx28rtva30c.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'www.indiagatefoods.com',
      }
    ]
  },
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-icons', 
      'lucide-react', 
      'framer-motion', 
      'date-fns', 
      'lodash',
      '@radix-ui/react-dialog',
      '@radix-ui/react-select',
      '@radix-ui/react-tooltip',
      'react-hook-form',
      '@hookform/resolvers'
    ],
    optimizeCss: true,
    webpackBuildWorker: true,
    turbo: {
      rules: {
        '*.svg': ['@svgr/webpack'],
      }
    }
  },
  
  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting for production only
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 200000, // Reduced from 244000 for better mobile performance
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
          },
          ui: {
            test: /[\\/]components[\\/]ui[\\/]/,
            name: 'ui-components',
            chunks: 'all',
            priority: 20,
            reuseExistingChunk: true,
          },
          forms: {
            test: /[\\/]components[\\/]forms[\\/]/,
            name: 'form-components',
            chunks: 'all',
            priority: 15,
            reuseExistingChunk: true,
          },
          sections: {
            test: /[\\/]components[\\/]sections[\\/]/,
            name: 'section-components',
            chunks: 'all',
            priority: 12,
            reuseExistingChunk: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }
      
      // Enhanced tree shaking optimization
      config.optimization.usedExports = true
      config.optimization.sideEffects = false
      
      // Reduce bundle parse time for mobile
      config.optimization.providedExports = true
      config.optimization.innerGraph = true
    }
    
    // Optimize module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    }
    
    return config
  },
  serverExternalPackages: ['@prisma/client'],
  
  // Turbopack configuration for SVG handling
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
    {
      source: '/sw.js',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=0, must-revalidate',
        },
      ],
    },
    {
      source: '/manifest.json',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
