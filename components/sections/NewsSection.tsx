'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight, ExternalLink, Clock, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NewsSection() {
    const featuredNews = {
        title: "Padmaaja Rasooi Expands Premium Rice Export to European Markets",
        summary: "New partnerships established with leading European distributors, marking significant growth in international presence",
        date: "January 15, 2025",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop&q=80",
        category: "Business Growth",
        readTime: "3 min read"
    }

    const news = [
        {
            title: "ISO 22000 Certification Achieved for Food Safety Excellence",
            summary: "Latest international certification reinforces our commitment to highest food safety standards",
            date: "January 10, 2025",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop&q=80",
            category: "Quality Assurance",
            readTime: "2 min read"
        },
        {
            title: "Sustainable Farming Initiative Reaches 1000+ Farmers",
            summary: "Our organic farming support program continues to grow, benefiting farming communities across regions",
            date: "January 8, 2025",
            image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=250&fit=crop&q=80",
            category: "Sustainability",
            readTime: "4 min read"
        },
        {
            title: "New Processing Facility Inaugurated in Punjab",
            summary: "State-of-the-art facility doubles our processing capacity with advanced quality control systems",
            date: "December 28, 2024",
            image: "/factory.png",
            category: "Infrastructure",
            readTime: "3 min read"
        },
        // {
        //     title: "Kashmina Brand Wins Premium Rice Award 2024",
        //     summary: "Recognition for excellence in basmati rice quality and export standards at national level",
        //     date: "December 20, 2024",
        //     image: "https://images.unsplash.com/photo-1568700942726-90896e3e37b5?w=400&h=250&fit=crop&q=80",
        //     category: "Awards",
        //     readTime: "2 min read"
        // },
        {
            title: "Digital Platform Launch for Direct Farmer Connect",
            summary: "New technology platform enables direct communication and transparent pricing with farmer network",
            date: "December 15, 2024",
            image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=250&fit=crop&q=80",
            category: "Technology",
            readTime: "3 min read"
        }
    ]

    const categories = ["All", "Business Growth", "Quality Assurance", "Sustainability", "Infrastructure", "Awards", "Technology"]

    const getCategoryColor = (category: string) => {
        const colors = {
            "Business Growth": "bg-blue-100 text-blue-700",
            "Quality Assurance": "bg-green-100 text-green-700",
            "Sustainability": "bg-emerald-100 text-emerald-700",
            "Infrastructure": "bg-purple-100 text-purple-700",
            "Awards": "bg-amber-100 text-amber-700",
            "Technology": "bg-rose-100 text-rose-700"
        }
        return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700"
    }

    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.05),transparent_50%)]"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Featured News */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Image */}
                            <div className="relative h-64 lg:h-auto overflow-hidden">
                                <Image
                                    src={featuredNews.image}
                                    alt={featuredNews.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                
                                {/* Featured Badge */}
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                    Featured
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getCategoryColor(featuredNews.category)}`}>
                                        {featuredNews.category}
                                    </span>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Calendar className="w-4 h-4" />
                                        {featuredNews.date}
                                    </div>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                                    {featuredNews.title}
                                </h3>
                                
                                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                                    {featuredNews.summary}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Clock className="w-4 h-4" />
                                        {featuredNews.readTime}
                                    </div>
                                    
                                    <Button variant="outline" className="group hover:bg-blue-50 hover:border-blue-300">
                                        Read Full Story
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-wrap gap-3 justify-center mb-12"
                >
                    {categories.map((category, index) => (
                        <Button
                            key={index}
                            variant={index === 0 ? "default" : "outline"}
                            size="sm"
                            className={index === 0 ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50 hover:border-blue-300"}
                        >
                            {category}
                        </Button>
                    ))}
                </motion.div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {news.map((article, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-blue-200">
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    
                                    {/* Category Badge */}
                                    <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(article.category)}`}>
                                        {article.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 mb-3 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {article.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {article.readTime}
                                        </div>
                                    </div>

                                    <h4 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {article.title}
                                    </h4>
                                    
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {article.summary}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0">
                                            Read More
                                        </Button>
                                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center">
                    <Button size="lg" variant="outline" className="hover:bg-blue-50 hover:border-blue-300 px-8 py-4">
                        Load More News
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
