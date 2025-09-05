'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star, Award, Truck, ShieldCheck, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function KashminaSection() {
    const features = [
        {
            icon: Star,
            title: "Premium Basmati",
            description: "Extra-long grain rice with superior quality",
            color: "from-emerald-500 to-green-600"
        },
        {
            icon: Award,
            title: "Export Quality",
            description: "International standards for global markets",
            color: "from-blue-500 to-indigo-600"
        },
        {
            icon: ShieldCheck,
            title: "Quality Tested",
            description: "Rigorous testing ensures purity and taste",
            color: "from-purple-500 to-violet-600"
        },
        {
            icon: Truck,
            title: "Fresh Packaging",
            description: "Sealed for maximum freshness and aroma",
            color: "from-orange-500 to-red-600"
        }
    ]

    const highlights = [
        "Premium long-grain basmati rice",
        "Natural aroma and superior taste",
        "Carefully processed and aged",
        "Export quality standards",
        "Hygienic packaging process"
    ]

    return (
        <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_50%)]"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-emerald-100/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-medium text-sm">Our Signature Brand</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                        <span className="text-transparent bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text">
                            Kashmina
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
                        Premium basmati rice that brings excellence to your dining table. 
                        Discover the perfect balance of taste, aroma, and quality.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-12 lg:gap-16 items-center mb-20">
                    {/* Content Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="xl:col-span-3 space-y-8"
                    >
                        {/* Brand Story */}
                        <div className="space-y-6">
                            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                                Crafted for
                                <span className="text-emerald-600"> Perfection</span>
                            </h3>
                            <div className="space-y-4 text-lg leading-relaxed text-slate-600">
                                <p>
                                    Kashmina represents the pinnacle of basmati rice quality, carefully selected 
                                    from the finest grains and processed with precision to deliver an exceptional culinary experience.
                                </p>
                                <p>
                                    Every grain undergoes meticulous quality control, ensuring that when it reaches your kitchen, 
                                    you're getting nothing but the very best in taste, aroma, and texture.
                                </p>
                            </div>
                        </div>

                        {/* Highlights List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {highlights.map((highlight, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                    className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/80 transition-colors"
                                >
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex-shrink-0"></div>
                                    <span className="text-slate-700 font-medium">{highlight}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <Link href="/products?brand=kashmina" className="inline-flex items-center">
                                    Shop Kashmina Rice
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 rounded-xl">
                                <Link href="/products">
                                    View All Products
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Image Side */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="xl:col-span-2 relative"
                    >
                        {/* Main Product Image */}
                        <div className="relative rounded-3xl overflow-hidden group">
                            <Image
                                src="/rice_bags.png"
                                alt="Kashmina Premium Basmati Rice"
                                width={500}
                                height={600}
                                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            
                            {/* Floating Quality Badge */}
                            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl z-20">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="font-semibold text-slate-900 text-sm">Premium Quality</span>
                                </div>
                            </div>


                            {/* Bottom Info */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl z-20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-slate-900">Starting from</div>
                                        <div className="text-xl font-bold text-emerald-600">₹299/kg</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium text-slate-900">4.9/5</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
                        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 blur-xl"></div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                className="group"
                            >
                                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 p-6 group-hover:scale-105 group-hover:bg-white">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{feature.title}</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-white/20 shadow-lg">
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Experience Premium
                                <span className="text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text"> Quality</span>
                            </h3>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Join thousands of families who trust Kashmina for their daily meals. 
                                Discover why our premium basmati rice is the preferred choice for discerning cooks.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
                                <Badge variant="secondary" className="bg-white/80 text-emerald-700 px-4 py-2 border border-emerald-200">
                                    <Star className="w-4 h-4 mr-2 fill-emerald-400 text-emerald-400" />
                                    4.9/5 Customer Rating
                                </Badge>
                                <Badge variant="secondary" className="bg-white/80 text-blue-700 px-4 py-2 border border-blue-200">
                                    <Award className="w-4 h-4 mr-2" />
                                    Export Quality Standards
                                </Badge>
                                <Badge variant="secondary" className="bg-white/80 text-purple-700 px-4 py-2 border border-purple-200">
                                    <ShieldCheck className="w-4 h-4 mr-2" />
                                    100% Pure & Natural
                                </Badge>
                            </div>
                            <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <Link href="/products?brand=kashmina">
                                    Shop Kashmina Collection
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
