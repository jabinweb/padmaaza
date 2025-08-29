'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Wheat, 
  Shield, 
  Award, 
  Leaf
} from 'lucide-react'

const values = [
  {
    title: "Quality Assurance",
    description: "Every grain is carefully selected and tested to ensure premium quality.",
    icon: Shield
  },
  {
    title: "Farm Fresh",
    description: "Direct sourcing from trusted farmers ensures freshness and authenticity.",
    icon: Wheat
  },
  {
    title: "Excellence",
    description: "Committed to delivering excellence in every product we offer.",
    icon: Award
  },
  {
    title: "Sustainable Farming",
    description: "Supporting eco-friendly farming practices for a healthier planet and future generations.",
    icon: Leaf
  }
]

export default function OurValues() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 px-3 py-1 text-sm font-medium">
            Our Values
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            What Drives Us Forward
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Our commitment to excellence is built on four core values that guide everything we do, 
            from sourcing to delivery of premium rice products.
          </p>
        </motion.div>

        {/* Values Grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 
                }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-white">
                  <CardContent className="p-8 text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">
                      {value.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 text-lg mb-6">
            Experience the difference that our values make in every grain
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="text-emerald-700 border-emerald-300 px-4 py-2">
              🌾 Farm to Table
            </Badge>
            <Badge variant="outline" className="text-blue-700 border-blue-300 px-4 py-2">
              🛡️ Quality Certified
            </Badge>
            <Badge variant="outline" className="text-green-700 border-green-300 px-4 py-2">
              🌱 Eco-Friendly
            </Badge>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
