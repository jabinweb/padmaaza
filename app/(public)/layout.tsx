import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import MobileTabBar from '@/components/layout/MobileTabBar'
import CTA from '@/components/sections/cta'
import UpdateNotification from '@/components/UpdateNotification'

export const metadata: Metadata = {
  title: 'Padmaaja Rasooi - Premium Food Products | Multigrain Flour & Rice',
  description: 'Premium quality multigrain flour and rice products. ISO certified food processing company specializing in SHREE AAHAR multigrain flour, basmati and non-basmati rice.'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="flex-1 pb-16 md:pb-0">
        {children}
      </div>
      <CTA />
      <Footer />
      
      {/* PWA Update Notification */}
      <UpdateNotification />
      
      {/* Mobile Tab Bar */}
      <MobileTabBar />
      
      {/* Development Cache Manager */}
      {/* <DevCacheManager /> */}
    </div>
  )
}