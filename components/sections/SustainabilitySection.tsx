'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Leaf, Heart, Droplets, Recycle, Users, Globe, ArrowRight, TreePine } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SustainabilitySection() {
    const initiatives = [
        {
            icon: Leaf,
            title: "Organic Farming Support",
            description: "Supporting farmers in transitioning to organic farming practices for sustainable agriculture",
            impact: "500+ Farmers",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Droplets,
            title: "Water Conservation",
            description: "Implementing water-efficient processing techniques and rainwater harvesting systems",
            impact: "30% Water Saved",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Recycle,
            title: "Zero Waste Processing",
            description: "Converting rice husk and by-products into renewable energy and organic fertilizers",
            impact: "95% Waste Recycled",
            color: "from-purple-500 to-violet-500"
        },
        {
            icon: TreePine,
            title: "Carbon Neutral Goals",
            description: "Working towards carbon-neutral operations through renewable energy adoption",
            impact: "50% Renewable Energy",
            color: "from-emerald-500 to-green-500"
        }
    ]

    const csrPrograms = [
        {
            title: "Farmer Welfare Program",
            description: "Direct support to rice farmers through fair pricing, agricultural training, and modern farming techniques",
            image: "/farmer.png",
            beneficiaries: "5000+ Farmers",
            focus: "Education & Support"
        },
        {
            title: "Community Development",
            description: "Healthcare, education and infrastructure development in rural farming communities",
            image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop&q=80",
            beneficiaries: "50+ Villages",
            focus: "Rural Development"
        },
        {
            title: "Food Security Initiative",
            description: "Ensuring food security through grain donation programs and nutritional awareness campaigns",
            image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop&q=80",
            beneficiaries: "10,000+ Meals",
            focus: "Food Security"
        }
    ]

    const certifications = [
        { name: "ISO 14001", desc: "Environmental Management" },
        { name: "FSSAI", desc: "Food Safety Standards" },
        { name: "HACCP", desc: "Hazard Analysis" },
        { name: "Organic", desc: "Certified Organic" }
    ]

    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-white"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.1),transparent_50%)]"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Environmental Initiatives */}
                <div className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {initiatives.map((initiative, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 group-hover:border-green-200 h-full">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 bg-gradient-to-br ${initiative.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <initiative.icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-semibold text-slate-900 mb-3">{initiative.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">{initiative.description}</p>
                                    
                                    {/* Impact */}
                                    <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        {initiative.impact}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CSR Programs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-blue-100/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <Heart className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-700 font-medium text-sm">Social Impact</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            Community Development Programs
                        </h3>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Creating positive impact in farming communities through targeted social initiatives
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {csrPrograms.map((program, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-blue-200">
                                    {/* Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={program.image}
                                            alt={program.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                        
                                        {/* Impact Badge */}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            {program.beneficiaries}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                                                {program.focus}
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-semibold text-slate-900 mb-3">{program.title}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">{program.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Certifications & Commitments */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div>
                            <div className="inline-flex items-center gap-2 bg-emerald-100/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                                <Globe className="w-4 h-4 text-emerald-600" />
                                <span className="text-emerald-700 font-medium text-sm">Global Standards</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                                Certified for Excellence
                            </h3>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                Our commitment to quality and sustainability is validated by international certifications and industry recognition.
                            </p>

                            {/* Certifications Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                                        <div className="text-lg font-bold text-emerald-600 mb-1">{cert.name}</div>
                                        <div className="text-xs text-slate-600">{cert.desc}</div>
                                    </div>
                                ))}
                            </div>

                            <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                <Link href="/about/certifications" className="inline-flex items-center">
                                    View All Certifications
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>

                        {/* Right Visual */}
                        <div className="relative">
                            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=400&fit=crop&q=80"
                                    alt="Sustainable farming"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent"></div>
                            </div>
                            
                            {/* Floating Stats */}
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                                <div className="text-2xl font-bold text-green-600">Carbon</div>
                                <div className="text-sm text-slate-600">Neutral by 2030</div>
                            </div>
                            
                            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                                <div className="text-2xl font-bold text-blue-600">Zero</div>
                                <div className="text-sm text-slate-600">Waste Goal</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
