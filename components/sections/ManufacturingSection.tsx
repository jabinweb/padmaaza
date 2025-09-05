'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Factory, Users, TrendingUp, Award, ArrowRight, CheckCircle, Gauge, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ManufacturingSection() {
    const facilities = [
        {
            icon: Factory,
            title: "Advanced Rice Milling",
            description: "Modern rice milling facility with precision technology for perfect grain separation and quality",
            value: "200+ MT/Day",
            label: "Rice Processing"
        },
        {
            icon: CheckCircle,
            title: "Rice Quality Assurance",
            description: "Multi-stage quality checks ensuring every rice grain meets export quality standards",
            value: "99.9%",
            label: "Pure Rice Quality"
        },
        {
            icon: Globe,
            title: "Basmati Export Hub",
            description: "Specialized facility for Basmati rice aging, processing and international export",
            value: "25+",
            label: "Countries Export"
        },
        {
            icon: Users,
            title: "Rice Processing Experts",
            description: "Skilled team with traditional knowledge and modern techniques in rice processing",
            value: "100+",
            label: "Rice Specialists"
        }
    ]

    const processSteps = [
        {
            step: "01",
            title: "Premium Paddy Sourcing",
            description: "Direct procurement from Punjab & Haryana's best rice growing regions",
            image: "/farmer.png"
        },
        {
            step: "02", 
            title: "Traditional Rice Aging",
            description: "Natural aging process for Basmati rice to develop characteristic aroma and length",
            image: "/factory.png"
        },
        {
            step: "03",
            title: "Rice Quality Laboratory",
            description: "Comprehensive testing for grain length, aroma, moisture and purity standards",
            image: "/lab.png"
        },
        {
            step: "04",
            title: "Premium Rice Packaging",
            description: "Food-grade packaging with moisture control for long-lasting rice freshness",
            image: "/rice_bags.png"
        }
    ]

    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50/30"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(245,158,11,0.05),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.05),transparent_50%)]"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-amber-100/50 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                        <Factory className="w-4 h-4 text-amber-600" />
                        <span className="text-amber-700 font-medium text-sm">Rice Processing Excellence</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                        From Paddy Fields to 
                        <span className="text-transparent bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 bg-clip-text"> Premium Rice</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        State-of-the-art rice processing facilities ensuring every grain of Basmati and Sella rice meets international quality standards
                    </p>
                </motion.div>

                {/* Facilities Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {facilities.map((facility, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-amber-200"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <facility.icon className="w-6 h-6 text-amber-600" />
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-amber-600">{facility.value}</div>
                                    <div className="text-xs text-slate-500 font-medium">{facility.label}</div>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{facility.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{facility.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Process Flow */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            Our Quality Process
                        </h3>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Every step carefully monitored to deliver premium quality rice that exceeds expectations
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative text-center group"
                            >
                                {/* Step Number */}
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full font-bold text-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {step.step}
                                </div>

                                {/* Image */}
                                <div className="relative w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <h4 className="text-lg font-semibold text-slate-900 mb-3">{step.title}</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>

                                {/* Connector Line */}
                                {index < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-emerald-200 to-emerald-300 transform translate-x-4"></div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-12">
                        <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                            <Link href="/about" className="inline-flex items-center">
                                Visit Our Facility
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
