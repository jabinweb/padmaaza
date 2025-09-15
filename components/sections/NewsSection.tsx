'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight, ExternalLink, Clock, TrendingUp, Wheat, Users, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NewsSection() {
    // Content data in JSON format for easy management
    const riceStoriesData = {
        header: {
            badge: "Padmaaja Rasooi",
            title: "Rice Stories",
            description: "For nearly 10,000 years, rice has nourished more communities than any other grain. Deeply woven into human history across continents, it remains our timeless bond with the golden grain."
        },
        stories: [
            {
                id: 1,
                category: "Culinary Heritage",
                title: "Global Favourite",
                description: "Rice inspires delicious dishes in every culture.",
                image: "https://www.indiagatefoods.com/wp-content/themes/india-gate/static/images/rice-dish-varieties.jpg",
                buttonText: "DISCOVER MORE",
                bgGradient: "from-amber-900 via-orange-800 to-red-900",
                categoryColor: "text-amber-300",
                categoryIcon: "Wheat"
            },
            {
                id: 2,
                category: "Cultural Journey",
                title: "Where Rice Meets Heart",
                description: "Every grain connects us to family and tradition.",
                image: "https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/media/2025-09-07/indian-family-dinner",
                buttonText: "EXPLORE MORE",
                bgGradient: "from-emerald-900 via-teal-800 to-blue-900",
                categoryColor: "text-emerald-300",
                categoryIcon: "Users"
            },
            {
                id: 3,
                category: "Traditional Farming",
                title: "Heritage Cultivation",
                description: "Ancient farming wisdom shapes every harvest.",
                image: "https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/media/2025-09-07/deepak-kumar-b4eRRodrirQ-unsplash%20%281%29.webp",
                buttonText: "LEARN MORE",
                bgGradient: "from-green-900 to-emerald-800",
                categoryColor: "text-green-300",
                categoryIcon: "Wheat"
            },
            {
                id: 4,
                category: "Premium Quality",
                title: "Miracle Grain",
                description: "Discover unique rice varieties and their benefits.",
                image: "https://4m5m4tx28rtva30c.public.blob.vercel-storage.com/media/2025-09-07/Image_fx%20%2840%29%20%281%29.jpg",
                buttonText: "DISCOVER MORE",
                bgGradient: "from-amber-900 to-orange-800",
                categoryColor: "text-amber-300",
                categoryIcon: "Sparkles"
            }
        ]
    }

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'Wheat':
                return <Wheat className="w-5 h-5" />
            case 'Users':
                return <Users className="w-5 h-5" />
            case 'Sparkles':
                return <Sparkles className="w-5 h-5" />
            default:
                return <Wheat className="w-5 h-5" />
        }
    }
    return (
        <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-red-50/20">
    
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    
                    <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-amber-700 via-red-600 to-orange-700 bg-clip-text text-transparent">
                            {riceStoriesData.header.title}
                        </span>
                    </h2>
                    
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mb-6"></div>
                    
                    <p className="text-lg md:text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
                        {riceStoriesData.header.description}
                    </p>
                </motion.div>

                {/* Main Content Grid - 4 Cards in 2 Rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {riceStoriesData.stories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className={`relative overflow-hidden rounded-xl shadow-lg h-96 bg-gradient-to-br ${story.bgGradient}`}>
                                <Image
                                    src={story.image}
                                    alt={story.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                    quality={80}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                
                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                                        {story.title}
                                    </h3>
                                    
                                    <p className="text-white/90 leading-relaxed mb-6 drop-shadow-lg">
                                        {story.description}
                                    </p>
                                    
                                    <Button 
                                        variant="secondary" 
                                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 group"
                                    >
                                        {story.buttonText}
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
