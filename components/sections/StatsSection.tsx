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
            description: "Exporting premium quality rice across continents",
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: Wheat,
            value: "200+",
            label: "MT Daily Capacity", 
            description: "State-of-the-art processing facility",
            color: "from-emerald-500 to-emerald-600"
        },
        {
            icon: Users,
            value: "5000+",
            label: "Farmers Network",
            description: "Direct partnerships with quality farmers",
            color: "from-orange-500 to-orange-600"
        },
        {
            icon: Award,
            value: "20+",
            label: "Years Experience",
            description: "Legacy of trust and quality excellence",
            color: "from-purple-500 to-purple-600"
        },
        {
            icon: Factory,
            value: "99.9%",
            label: "Quality Assurance",
            description: "Consistent premium quality standards",
            color: "from-rose-500 to-rose-600"
        },
        {
            icon: Star,
            value: "10K+",
            label: "Happy Customers",
            description: "Trusted by households worldwide",
            color: "from-yellow-500 to-yellow-600"
        }
    ]

    const achievements = [
        {
            title: "Industry Leadership",
            description: "Leading exporter of premium basmati rice from Northern India",
            icon: Target
        },
        {
            title: "Quality Certifications",
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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            
            {/* Animated background elements */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300 font-medium text-sm">Our Impact</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Building Excellence
                        <span className="text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text"> Across Continents</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Two decades of commitment to quality, innovation, and customer satisfaction driving our global success
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
                                {/* Animated background */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Value */}
                                    <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                                        {stat.value}
                                    </div>

                                    {/* Label */}
                                    <div className="text-lg font-semibold text-gray-300 mb-3">
                                        {stat.label}
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {stat.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

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
