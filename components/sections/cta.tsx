'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'



export default function CTA() {

  return (
          <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-slate-900 to-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Badge className="mb-4 sm:mb-6 bg-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium">Get In Touch</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 leading-tight">
              Ready to Partner With Us?
            </h2>
            <p className="text-base sm:text-lg text-emerald-100 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
              Connect with us for bulk orders, wholesale pricing, and custom solutions. 
              Let&apos;s build a healthier future together.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-2xl mx-auto">
              <div className="flex items-center justify-center p-4 sm:p-6 bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 text-emerald-300 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs sm:text-sm text-emerald-200 font-medium">Call Us</div>
                  <div className="text-base sm:text-lg font-bold">+91 94757 58817</div>
                </div>
              </div>
              <div className="flex items-center justify-center p-4 sm:p-6 bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 text-emerald-300 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs sm:text-sm text-emerald-200 font-medium">Email Us</div>
                  <div className="text-base sm:text-lg font-bold break-all sm:break-normal">srajeev7053@gmail.com</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-emerald-50 px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-bold rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white bg-transparent hover:bg-white hover:text-slate-900 px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-bold rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <Link href="/partners">Part time Job</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
  )
}
