'use client'

import { Badge } from '@/components/ui/badge'
import { Wheat, Shield, Award, ArrowRight, Star, CheckCircle, Users, TrendingUp } from 'lucide-react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AboutSection() {
    const stats = [
        { number: "20+", label: "Years in Rice Business", icon: Award, color: "from-amber-500 to-yellow-600" },
        { number: "10K+", label: "Rice Loving Families", icon: Users, color: "from-emerald-500 to-green-600" },
        { number: "50+", label: "Rice Varieties", icon: Star, color: "from-orange-500 to-red-600" },
        { number: "99%", label: "Pure & Natural Rice", icon: TrendingUp, color: "from-yellow-500 to-amber-600" }
    ]

    const features = [
        "Direct sourcing from Punjab & Haryana rice belt",
        "Traditional aging process for Basmati rice", 
        "Steam processing for premium Sella varieties",
        "Farm-to-table traceability and quality assurance"
    ]

    return (
        <section className="relative py-12 md:py-32 overflow-hidden">
            {/* Modern gradient background with rice-inspired colors */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50/30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.05),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.05),transparent_50%)]"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header with modern typography */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2 bg-amber-100/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <Wheat className="w-4 h-4 text-amber-600" />
                        <span className="text-amber-700 font-medium text-sm">Our Rice Heritage</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        From Golden Fields to {''}
                        <span className="text-transparent bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 bg-clip-text">
                            Your Kitchen
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Bringing you the finest rice varieties from the fertile plains of Northern India, aged to perfection and processed with traditional care
                    </p>
                </motion.div>

                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center mb-16 sm:mb-20">
                    {/* Visual side - First on mobile, second on desktop */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative order-1 lg:order-2"
                    >
                        {/* Main image with modern styling - 16:9 on mobile, original aspect on desktop */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video lg:aspect-auto">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-transparent to-orange-600/20 z-10"></div>
                            <Image
                                src="/farmer.png"
                                alt="Premium food processing facility"
                                width={600}
                                height={500}
                                className="w-full lg:h-[500px] object-cover"
                                priority
                            />
                            {/* Floating quality badge */}
                            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg z-20">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">Premium Certified</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full opacity-20 blur-xl"></div>
                    </motion.div>

                    {/* Content side - Second on mobile, first on desktop */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6 sm:space-y-8 order-2 lg:order-1"
                    >
                        {/* Story */}
                        <div className="space-y-4 sm:space-y-6">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                                Two Decades of
                                <span className="text-emerald-600"> Trusted Excellence</span>
                            </h3>
                            <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed text-slate-600">
                                <p>
                                    Padmaaja Rasooi has revolutionized food processing with unwavering commitment to quality and authenticity.
                                </p>
                                <p>
                                    We&apos;ve built lasting relationships with farmers, ensuring every product reflects our dedication to 
                                    excellence and the highest standards of food safety.
                                </p>
                            </div>
                        </div>

                        {/* Feature list */}
                        <div className="space-y-3 sm:space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                    </div>
                                    <span className="text-slate-700 font-medium text-sm sm:text-base">{feature}</span>
                                </motion.div>
                            ))}
                            
                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="pt-3"
                        >
                            <Button asChild size="lg" className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <Link href="/about" className="inline-flex items-center justify-center text-sm sm:text-lg">
                                    Discover Our Story
                                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </motion.div>
                        </div>

                    </motion.div>
                </div>

                {/* Stats section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                            className="relative group"
                        >
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group-hover:scale-105">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${stat.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                                </div>
                                <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 mb-1 sm:mb-2">{stat.number}</div>
                                <div className="text-slate-600 font-medium text-xs sm:text-sm lg:text-base leading-tight">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}