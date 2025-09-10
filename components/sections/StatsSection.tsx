'use client'

import { Badge } from '@/components/ui/badge'
import { TrendingUp, Globe, Users, Award, Factory, Wheat, Star, Target } from 'lucide-react'
import { motion } from 'framer-motion'

export default function StatsSection() {
    const stats = [
        {
            icon: Globe,
            value: "25+",
            label: "Countries Served",
            description: "Exporting premium Basmati rice across continents",
            color: "from-amber-500 to-yellow-600"
        },
        {
            icon: Wheat,
            value: "200+",
            label: "MT Rice Daily", 
            description: "Processing capacity for premium rice varieties",
            color: "from-yellow-500 to-orange-600"
        },
        {
            icon: Users,
            value: "5000+",
            label: "Rice Farmers",
            description: "Direct partnerships across Punjab & Haryana rice belt",
            color: "from-emerald-500 to-green-600"
        },
        {
            icon: Award,
            value: "20+",
            label: "Years in Rice Trade",
            description: "Two decades of rice expertise and quality",
            color: "from-orange-500 to-red-600"
        },
        {
            icon: Factory,
            value: "99.9%",
            label: "Pure Rice Quality",
            description: "Consistent premium rice standards",
            color: "from-red-500 to-pink-600"
        },
        {
            icon: Star,
            value: "10K+",
            label: "Rice Loving Families",
            description: "Households enjoying our premium rice daily",
            color: "from-yellow-500 to-amber-600"
        }
    ]

    const achievements = [
        {
            title: "Basmati Rice Leadership",
            description: "Leading exporter of aged Basmati 1121 rice from Northern India",
            icon: Target
        },
        {
            title: "Rice Quality Certifications",
            description: "ISO, HACCP, FSSAI certified processing facility",
            icon: Award
        },
        {
            title: "Export Excellence",
            description: "Consistent export quality meeting international standards",
            icon: Globe
        },
        {
            title: "Innovation Pioneer",
            description: "Advanced processing technology for superior quality",
            icon: TrendingUp
        }
    ]

    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.1),transparent_50%)]"></div>
            
            {/* Animated background elements */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                {/* <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-300 font-medium text-sm">Rice Excellence</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        From Fields to
                        <span className="text-transparent bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text"> Global Tables</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Two decades of rice expertise, bringing premium Basmati and Sella varieties from Northern India's fertile plains to kitchens worldwide
                    </p>
                </motion.div> */}

                {/* Stats Grid */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:bg-white/10">
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                
                                <div className="relative z-10">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className="w-8 h-8 text-white" />
                                    </div>

                                    <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                                        {stat.value}
                                    </div>

                                    <div className="text-lg font-semibold text-gray-300 mb-3">
                                        {stat.label}
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {stat.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div> */}

                {/* Achievements Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Key Achievements
                        </h3>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Milestones that define our commitment to excellence and industry leadership
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <achievement.icon className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="text-lg font-semibold text-white mb-3">
                                    {achievement.title}
                                </h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {achievement.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
