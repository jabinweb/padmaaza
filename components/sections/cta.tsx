'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'



export default function CTA() {

  return (
          <section className="py-20 bg-gradient-to-r from-slate-900 to-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Badge className="mb-6 bg-emerald-600 text-white px-4 py-2 text-sm font-medium">Get In Touch</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Ready to Partner With Us?
            </h2>
            <p className="text-lg text-emerald-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with us for bulk orders, wholesale pricing, and custom solutions. 
              Let&apos;s build a healthier future together.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
              <div className="flex items-center justify-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <Phone className="h-6 w-6 mr-4 text-emerald-300" />
                <div className="text-left">
                  <div className="text-sm text-emerald-200 font-medium">Call Us</div>
                  <div className="text-lg font-bold">+91 94757 58817</div>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <Mail className="h-6 w-6 mr-4 text-emerald-300" />
                <div className="text-left">
                  <div className="text-sm text-emerald-200 font-medium">Email Us</div>
                  <div className="text-lg font-bold">srajeev7053@gmail.com</div>
                </div>
              </div>
            </div>
            
            <Button size="lg" className="bg-white text-slate-900 hover:bg-emerald-50 px-8 py-3 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
  )
}
