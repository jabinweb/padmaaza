'use client'

import { Badge } from '@/components/ui/badge'
import { Wheat, Shield, Award, ArrowRight, Star, CheckCircle, Users, TrendingUp } from 'lucide-react'
import { Button } from '../ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AboutSection() {
    const stats = [
        { number: "20+", label: "Years of Excellence", icon: Award, color: "from-emerald-500 to-emerald-600" },
        { number: "10K+", label: "Happy Families", icon: Users, color: "from-blue-500 to-blue-600" },
        { number: "50+", label: "Premium Products", icon: Star, color: "from-orange-500 to-orange-600" },
        { number: "99%", label: "Customer Satisfaction", icon: TrendingUp, color: "from-purple-500 to-purple-600" }
    ]

    const features = [
        "Direct sourcing from certified farmers",
        "State-of-the-art processing facilities", 
        "Rigorous quality control standards",
        "Sustainable and eco-friendly practices"
    ]

    return (
        <section className="relative py-20 lg:py-32 overflow-hidden">
            {/* Modern gradient background with subtle pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.03),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.03),transparent_50%)]"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header with modern typography */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <div className="inline-flex items-center gap-2 bg-emerald-100/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <Wheat className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-medium text-sm">About Our Legacy</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Crafting Premium {''}
                        <span className="text-transparent bg-gradient-to-r from-emerald-600 via-emerald-500 to-orange-500 bg-clip-text">
                            Food Excellence
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        The careful choice for premium quality food products crafted with tradition and innovation
                    </p>
                </motion.div>

                {/* Main content grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20">
                    {/* Content side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Story */}
                        <div className="space-y-6">
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                                Two Decades of
                                <span className="text-emerald-600"> Trusted Excellence</span>
                            </h3>
                            <div className="space-y-4 text-lg leading-relaxed text-slate-600">
                                <p>
                                    Padmaaja Rasool has revolutionized food processing with unwavering commitment to quality and authenticity.
                                </p>
                                <p>
                                    We&apos;ve built lasting relationships with farmers, ensuring every product reflects our dedication to 
                                    excellence and the highest standards of food safety.
                                </p>
                            </div>
                        </div>

                        {/* Feature list */}
                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-slate-700 font-medium">{feature}</span>
                                </motion.div>
                            ))}
                            
                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <Button asChild size="lg" className="mt-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <Link href="/about" className="inline-flex items-center text-lg font-semibold">
                                    Discover Our Story
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </motion.div>
                        </div>

                    </motion.div>
                    
                    {/* Visual side */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative"
                    >
                        {/* Main image with modern styling */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-transparent to-orange-600/20 z-10"></div>
                            <Image
                                src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&h=500&fit=crop&crop=center"
                                alt="Premium food processing facility"
                                width={600}
                                height={500}
                                className="w-full h-[500px] object-cover"
                                priority
                            />
                            {/* Floating quality badge */}
                            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg z-20">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="font-semibold text-slate-900 text-sm">Premium Certified</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full opacity-20 blur-xl"></div>
                    </motion.div>
                </div>

                {/* Stats section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
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
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 group-hover:scale-105">
                                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
                                <div className="text-slate-600 font-medium">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}