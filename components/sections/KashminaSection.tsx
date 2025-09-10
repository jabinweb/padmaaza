'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Award, Truck, ShieldCheck, ArrowRight, Sparkles, Wheat, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function KashminaSection() {
    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            {/* Enhanced Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.08),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.08),transparent_50%)]"></div>
            
            {/* Animated Background Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Enhanced Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-amber-200/50 shadow-lg">
                        <Sparkles className="w-5 h-5 text-amber-600 animate-pulse" />
                        <span className="text-amber-700 font-semibold text-sm tracking-wide">PREMIUM RICE BRAND</span>
                        <Sparkles className="w-5 h-5 text-orange-600 animate-pulse delay-500" />
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        <span className="text-transparent bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text bg-300% animate-gradient">
                            Kashmina
                        </span>
                        <br />
                        <span className="text-gray-800 text-3xl md:text-4xl lg:text-5xl font-medium">Premium Basmati Rice</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                        Authentic aged Basmati rice with <span className="text-amber-600 font-medium">extraordinary length, exquisite aroma, and royal taste</span>
                    </p>
                </div>

                {/* Enhanced Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-20">
                    {/* Premium Quality */}
                    <div className="group cursor-pointer">
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center border border-white/50 group-hover:border-emerald-300/50 group-hover:-translate-y-2 group-hover:bg-white/90 overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full -translate-y-10 translate-x-10 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                            
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-emerald-200">
                                    <Wheat className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">Authentic Grains</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Treasured grain with distinct aroma and great nutty taste
                                </p>
                                <div className="inline-block bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-xs font-bold tracking-wide">
                                    AUTHENTIC QUALITY
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Export Quality */}
                    <div className="group cursor-pointer">
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center border border-white/50 group-hover:border-blue-300/50 group-hover:-translate-y-2 group-hover:bg-white/90 overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full -translate-y-10 translate-x-10 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                            
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-blue-200">
                                    <Award className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Export Grade</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    International quality standards for global markets
                                </p>
                                <div className="inline-block bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-4 py-2 rounded-full text-xs font-bold tracking-wide">
                                    CERTIFIED
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quality Tested */}
                    <div className="group cursor-pointer">
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center border border-white/50 group-hover:border-purple-300/50 group-hover:-translate-y-2 group-hover:bg-white/90 overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full -translate-y-10 translate-x-10 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                            
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-purple-200">
                                    <ShieldCheck className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">Lab Tested</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Rigorously tested for purity and quality assurance
                                </p>
                                <div className="inline-block bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 px-4 py-2 rounded-full text-xs font-bold tracking-wide">
                                    100% PURE
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fresh Packaging */}
                    <div className="group cursor-pointer">
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center border border-white/50 group-hover:border-orange-300/50 group-hover:-translate-y-2 group-hover:bg-white/90 overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full -translate-y-10 translate-x-10 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                            
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-orange-200">
                                    <Truck className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">Fresh Pack</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Sealed for maximum freshness and aroma preservation
                                </p>
                                <div className="inline-block bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 px-4 py-2 rounded-full text-xs font-bold tracking-wide">
                                    FRESH SEALED
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Product Showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center mb-20">
                    {/* Enhanced Product Image */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative p-12">
                            {/* Floating particles */}
                            <div className="absolute top-4 left-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                            <div className="absolute top-12 right-8 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-1000"></div>
                            <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-2000"></div>
                            
                            <Image
                                src="/rice_bags.png"
                                alt="Kashmina Premium Basmati Rice"
                                width={500}
                                height={400}
                                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
                                priority
                            />
                            
                            {/* Enhanced Floating Badges */}
                            <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-emerald-200/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full animate-pulse shadow-lg shadow-emerald-200"></div>
                                    <div>
                                        <span className="font-bold text-gray-900 text-sm block">Premium Quality</span>
                                        <span className="text-emerald-600 text-xs font-medium">Export Grade</span>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Rating Badge */}
                            {/* <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-yellow-200/50">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <div>
                                        <span className="text-sm font-bold text-gray-900 block">4.9/5</span>
                                        <span className="text-xs text-gray-600">2.5k+ Reviews</span>
                                    </div>
                                </div>
                            </div> */}

                           {/* Background decorations */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-300 to-blue-400 rounded-full opacity-10 blur-2xl animate-pulse"></div>
                            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full opacity-10 blur-2xl animate-pulse delay-1000"></div>
                        </div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="space-y-8 order-1 lg:order-2">
                        <div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-6">
                                Crafted for {' '}
                                <span className="text-transparent bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text">
                                    Perfection
                                </span>
                            </h3>
                            <p className="text-base sm:text-lg leading-relaxed text-slate-600 mb-8">
                                Kashmina represents the pinnacle of basmati rice quality, carefully selected 
                                from the finest grains and processed with precision to deliver an 
                                <span className="text-emerald-600 font-medium">exceptional culinary experience</span>.
                            </p>
                        </div>

                        {/* Enhanced Key Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-200/30 hover:bg-white/80 hover:border-emerald-300/50 transition-all duration-300 group">
                                <div className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></div>
                                <span className="text-slate-700 font-medium text-sm sm:text-base group-hover:text-slate-900 transition-colors">Premium long-grain basmati rice</span>
                            </div>
                            
                            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-200/30 hover:bg-white/80 hover:border-blue-300/50 transition-all duration-300 group">
                                <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
                                <span className="text-slate-700 font-medium text-sm sm:text-base group-hover:text-slate-900 transition-colors">Natural aroma and superior taste</span>
                            </div>
                            
                            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-200/30 hover:bg-white/80 hover:border-purple-300/50 transition-all duration-300 group">
                                <div className="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0"></div>
                                <span className="text-slate-700 font-medium text-sm sm:text-base group-hover:text-slate-900 transition-colors">Carefully aged and processed</span>
                            </div>
                            
                            <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-200/30 hover:bg-white/80 hover:border-orange-300/50 transition-all duration-300 group">
                                <div className="w-3 h-3 rounded-full bg-orange-500 flex-shrink-0"></div>
                                <span className="text-slate-700 font-medium text-sm sm:text-base group-hover:text-slate-900 transition-colors">Export quality standards</span>
                            </div>
                        </div>

                        {/* Enhanced CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <Link href="/products?brand=kashmina" className="inline-flex items-center justify-center text-sm sm:text-lg">
                                    Shop Kashmina Rice
                                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-lg">
                                <Link href="/products">
                                    View All Products
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
