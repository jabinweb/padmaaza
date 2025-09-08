import { LazyNewsSection } from '@/components/LazyComponents'
import PageHero from '@/components/sections/PageHero'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News & Updates | Padmaaja Rasooi',
  description: 'Stay updated with latest news, achievements, and developments from Padmaaja Rasooi. Industry insights, company milestones, and market updates.',
  keywords: 'news, updates, achievements, press releases, industry news, company news, rice industry, export news',
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="News & Updates"
        subtitle="Latest Developments"
        description="Stay informed about our latest achievements, innovations, industry developments, and company milestones."
        badge={{ text: "Media Center" }}
        backgroundGradient="from-blue-600/10 to-purple-600/10"
        titleGradient="from-blue-600 to-purple-600"
      />
      
      <LazyNewsSection />
    </div>
  )
}
