import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping Cart - Padmaaja Rasooi | Review Your Premium Rice Products',
  description: 'Review your selected premium rice products in your shopping cart. Secure checkout for the finest quality rice varieties from Padmaaja Rasooi.',
  keywords: ['shopping cart', 'padmaaja rasooi', 'rice products', 'checkout', 'premium rice', 'secure shopping', 'cart review', 'order summary'],
  openGraph: {
    title: 'Shopping Cart - Padmaaja Rasooi',
    description: 'Review your selected premium rice products and proceed to secure checkout.',
    type: 'website',
    images: ['/cart-icon.png'],
  },
  twitter: {
    card: 'summary',
    title: 'Shopping Cart - Padmaaja Rasooi',
    description: 'Review your selected premium rice products and proceed to secure checkout.',
  },
  robots: {
    index: false, // Don't index cart pages
    follow: true,
    noarchive: true,
    nosnippet: true,
  },
  alternates: {
    canonical: '/cart',
  },
  other: {
    'cart-page': 'true',
    'secure-checkout': 'enabled',
    'page-type': 'ecommerce-cart',
  },
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Enhanced structured data for cart */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Shopping Cart - Padmaaja Rasooi",
            "description": "Review your selected premium rice products and proceed to secure checkout.",
            "url": "/cart",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Padmaaja Rasooi",
              "url": "/"
            },
            "potentialAction": {
              "@type": "CheckoutAction",
              "target": "/checkout"
            }
          })
        }}
      />
      <main role="main" aria-label="Shopping Cart">
        <div className="cart-container" itemScope itemType="https://schema.org/ShoppingCart">
          <header className="sr-only">
            <h1>Shopping Cart</h1>
          </header>
          <section aria-label="Cart items">
            {children}
          </section>
        </div>
      </main>
    </>
  )
}
