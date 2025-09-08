import { LazySustainabilitySection } from '@/components/LazyComponents'
import PageHero from '@/components/sections/PageHero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sustainability & CSR | Padmaaja Rasooi',
  description: 'Our commitment to environmental stewardship and social responsibility. Discover our sustainability initiatives, CSR programs, and environmental certifications.',
  keywords: 'sustainability, CSR, corporate social responsibility, environmental, organic farming, carbon neutral, zero waste',
}

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="Sustainability & CSR"
        subtitle="Building a Better Tomorrow"
        description="Our commitment to environmental stewardship and social responsibility drives meaningful change in communities and ecosystems worldwide."
        badge={{ text: "Our Impact" }}
        backgroundGradient="from-green-600/10 to-emerald-600/10"
        titleGradient="from-green-600 to-emerald-600"
      />
      
      <LazySustainabilitySection />
    </div>
  )
}
