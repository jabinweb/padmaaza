import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rice Recipes | Padmaaja Rasooi - Authentic Indian Rice Dishes',
  description: 'Discover delicious and authentic rice recipes from across India. From Vegetable Biryani to Rice Kheer, explore traditional dishes made with premium Basmati rice.',
  keywords: 'rice recipes, basmati rice recipes, Indian rice dishes, vegetable biryani, rajma chawal, rice kheer, poha, khichdi, pulao, authentic Indian cooking',
  openGraph: {
    title: 'Rice Recipes | Padmaaja Rasooi',
    description: 'Explore authentic Indian rice recipes made with premium Basmati rice. Step-by-step instructions for traditional dishes.',
    type: 'website',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Padmaaja Rasooi Rice Recipes'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authentic Rice Recipes | Padmaaja Rasooi',
    description: 'Discover traditional Indian rice recipes with premium Basmati rice. Perfect for home cooking.',
    images: ['/android-chrome-512x512.png']
  }
}

export default function RecipesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}