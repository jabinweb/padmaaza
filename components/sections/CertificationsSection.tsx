'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function CertificationsSection() {
    const certifications = [
        {
            id: 1,
            name: "FSSAI",
            image: "/certifications/Frame-1000003749.png",
        },
        {
            id: 2,
            name: "ISO",
            image: "/certifications/Frame-1000003750.png",
        },
        {
            id: 3,
            name: "GMP",
            image: "/certifications/Frame-1000003751.png",
        },
        {
            id: 4,
            name: "HACCP",
            image: "/certifications/image-371-1.png",
        },
        {
            id: 5,
            name: "FDA",
            image: "/certifications/image-375-1.png",
        },
        {
            id: 6,
            name: "BRC",
            image: "/certifications/image-377-2.png",
        },
        {
            id: 7,
            name: "Quality",
            image: "/certifications/image-92.png",
        }
    ]

    return (
        <section className="relative py-12 md:py-16 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        <span className="text-transparent bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text">
                            Certified By
                        </span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Our commitment to quality is validated by prestigious international certifications
                    </p>
                </motion.div>

                {/* Certifications Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12"
                >
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200 flex items-center justify-center p-3">
                                <Image
                                    src={cert.image}
                                    alt={cert.name}
                                    fill
                                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                                    sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                                />
                            </div>
                            <p className="text-center text-xs md:text-sm font-medium text-gray-600 mt-2 group-hover:text-gray-900 transition-colors">
                                {cert.name}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-8 md:mt-12"
                >
                    <p className="text-sm text-gray-500 max-w-xl mx-auto">
                        Trusted by industry leaders worldwide for our commitment to quality, safety, and excellence in food production.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
