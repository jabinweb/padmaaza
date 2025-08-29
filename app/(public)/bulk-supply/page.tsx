'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Truck, Package, Users, Factory, Globe, Shield, Clock, CheckCircle, Calculator, Phone, Mail, Download, ArrowRight, Warehouse, Scale, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function BulkSupplyPage() {
  const bulkProducts = [
    {
      id: 1,
      name: 'Premium Basmati Rice',
      category: 'Rice & Grains',
      minOrder: '25 MT',
      pricing: '₹85-95/kg',
      packaging: '25kg, 50kg PP Bags',
      specifications: 'Extra Long Grain, Aged 2+ Years',
      image: '/api/placeholder/300/200',
      features: ['Export Quality', 'Sortex Cleaned', 'Moisture <12%']
    },
    {
      id: 2,
      name: 'Golden Sella Basmati',
      category: 'Rice & Grains',
      minOrder: '20 MT',
      pricing: '₹78-88/kg',
      packaging: '25kg, 50kg PP Bags',
      specifications: 'Parboiled, Golden Color',
      image: '/api/placeholder/300/200',
      features: ['Non-Sticky', 'Longer Shelf Life', 'Uniform Color']
    },
    {
      id: 3,
      name: 'Turmeric Powder',
      category: 'Spices',
      minOrder: '5 MT',
      pricing: '₹180-220/kg',
      packaging: '25kg Cartons/PP Bags',
      specifications: 'Curcumin 3-5%, Moisture <10%',
      image: '/api/placeholder/300/200',
      features: ['Single Polished', 'Chemical Free', 'High Curcumin']
    },
    {
      id: 4,
      name: 'Red Chili Powder',
      category: 'Spices',
      minOrder: '3 MT',
      pricing: '₹250-300/kg',
      packaging: '25kg Cartons/PP Bags',
      specifications: 'ASTA 120-140, Moisture <11%',
      image: '/api/placeholder/300/200',
      features: ['High Color Value', 'Steam Sterilized', 'Aflatoxin Free']
    },
    {
      id: 5,
      name: 'Wheat Flour',
      category: 'Flour & Grains',
      minOrder: '50 MT',
      pricing: '₹28-35/kg',
      packaging: '25kg, 50kg PP Bags',
      specifications: 'Protein 11-12%, Ash <0.60%',
      image: '/api/placeholder/300/200',
      features: ['Fortified', 'Pest Free', 'Uniform Texture']
    },
    {
      id: 6,
      name: 'Toor Dal (Arhar)',
      category: 'Pulses',
      minOrder: '10 MT',
      pricing: '₹120-140/kg',
      packaging: '25kg, 50kg PP Bags',
      specifications: 'Split & Polished, Protein 22%+',
      image: '/api/placeholder/300/200',
      features: ['Machine Cleaned', 'Double Polished', 'Stone Free']
    }
  ]

  const services = [
    {
      icon: Factory,
      title: 'Custom Processing',
      description: 'Tailored processing solutions to meet your specific requirements and quality standards.',
      features: ['Custom Grading', 'Special Packaging', 'Quality Specifications']
    },
    {
      icon: Truck,
      title: 'Logistics Support',
      description: 'End-to-end logistics solutions from our facility to your destination worldwide.',
      features: ['Container Loading', 'Documentation', 'Tracking Support']
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Comprehensive quality control with certifications and testing at every stage.',
      features: ['Pre-shipment Inspection', 'Quality Certificates', 'Sample Approval']
    },
    {
      icon: Globe,
      title: 'Export Services',
      description: 'Complete export facilitation with international compliance and documentation.',
      features: ['Export Documentation', 'Phytosanitary Certificates', 'COO Certificates']
    }
  ]

  const advantages = [
    {
      icon: Scale,
      title: 'Competitive Pricing',
      description: 'Direct from manufacturer pricing with volume-based discounts.',
      value: 'Up to 15% Savings'
    },
    {
      icon: Clock,
      title: 'Quick Turnaround',
      description: 'Fast processing and delivery to meet your timeline requirements.',
      value: '7-14 Days Delivery'
    },
    {
      icon: CheckCircle,
      title: 'Quality Guarantee',
      description: 'Assured quality with money-back guarantee on specifications.',
      value: '100% Quality Assurance'
    },
    {
      icon: Target,
      title: 'Flexible Terms',
      description: 'Customizable payment and delivery terms for long-term partnerships.',
      value: 'Flexible Payment Terms'
    }
  ]

  const specifications = [
    {
      parameter: 'Minimum Order Quantity',
      value: '3-50 MT (Product Dependent)',
      icon: Package
    },
    {
      parameter: 'Payment Terms',
      value: 'LC, TT, or Advance Payment',
      icon: Calculator
    },
    {
      parameter: 'Delivery Time',
      value: '7-21 Days from Order Confirmation',
      icon: Clock
    },
    {
      parameter: 'Packaging Options',
      value: 'PP Bags, Jute Bags, Cartons, Bulk',
      icon: Warehouse
    },
    {
      parameter: 'Quality Standards',
      value: 'FSSAI, ISO 22000, HACCP Certified',
      icon: Shield
    },
    {
      parameter: 'Documentation',
      value: 'COA, COO, Phytosanitary Available',
      icon: CheckCircle
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-emerald-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-600 rounded-2xl">
                <Warehouse className="w-8 h-8 text-white" />
              </div>
              <Badge variant="outline" className="text-blue-700 border-blue-200">
                Wholesale Solutions
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
              Bulk{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Supply Solutions
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Premium quality food products in bulk quantities for distributors, retailers, 
              and food manufacturers. Direct from source with competitive pricing and reliable supply chain.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <Package className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-slate-700">3+ MT Minimum Orders</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <Globe className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-slate-700">Global Shipping</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <Shield className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-slate-700">Quality Certified</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                <Calculator className="w-5 h-5 mr-2" />
                Get Quote
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300">
                <Download className="w-5 h-5 mr-2" />
                Download Catalog
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bulk Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Bulk Product Portfolio
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Premium quality products available in bulk quantities with competitive pricing and flexible terms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bulkProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 shadow-lg overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="w-16 h-16 text-slate-400" />
                    </div>
                    <Badge className="absolute top-3 left-3 bg-blue-600">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </CardTitle>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Min Order:</span>
                      <Badge variant="outline" className="text-blue-700 border-blue-200">
                        {product.minOrder}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500 block">Pricing Range</span>
                        <span className="font-semibold text-emerald-600">{product.pricing}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Packaging</span>
                        <span className="font-medium text-slate-700">{product.packaging}</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-slate-500 text-sm block mb-2">Specifications</span>
                      <p className="text-sm text-slate-600">{product.specifications}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {product.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                      Request Quote
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Comprehensive Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              End-to-end support for your bulk procurement needs with professional service excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl shadow-lg">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 mb-3">
                        {service.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span className="text-sm text-slate-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Why Choose Our Bulk Supply?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Competitive advantages that make us your preferred bulk supply partner.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 mb-3">
                        {advantage.title}
                      </h3>
                      
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {advantage.description}
                      </p>
                      
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        {advantage.value}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Specifications Table */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Order Specifications
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Complete order guidelines and specifications for bulk procurement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specifications.map((spec, index) => {
              const IconComponent = spec.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl shadow-lg">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-800 mb-2">
                            {spec.parameter}
                          </h3>
                          <p className="text-slate-600 font-medium">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Request Bulk Quote
            </h2>
            <p className="text-lg text-slate-600">
              Get competitive pricing for your bulk requirements. Our team will respond within 24 hours.
            </p>
          </motion.div>

          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input id="company" placeholder="Your Company Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Person *</Label>
                    <Input id="contact" placeholder="Contact Person Name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="email@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="product">Product Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rice">Rice & Grains</SelectItem>
                        <SelectItem value="spices">Spices</SelectItem>
                        <SelectItem value="flour">Flour & Grains</SelectItem>
                        <SelectItem value="pulses">Pulses</SelectItem>
                        <SelectItem value="mixed">Mixed Products</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Estimated Quantity (MT)</Label>
                    <Input id="quantity" placeholder="e.g., 25 MT" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Detailed Requirements</Label>
                  <Textarea 
                    id="requirements" 
                    placeholder="Please specify products, quantities, quality requirements, delivery timeline, and any special instructions..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 text-base py-3">
                  <Calculator className="w-5 h-5 mr-2" />
                  Submit Quote Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
