'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Clock,
  MapPin,
  Users,
  TrendingUp,
  Shield,
  Star,
  CheckCircle,
  Calendar,
  DollarSign,
  Award,
  Target,
  Zap,
  Heart,
  Briefcase,
  Home,
  Phone,
  Mail,
  FileText,
  UserPlus
} from 'lucide-react'
import PageHero from '@/components/sections/PageHero'
import PartTimeRegistrationForm from '@/components/forms/PartTimeRegistrationForm'

export default function PartTimePage() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)

  const jobBenefits = [
    {
      icon: DollarSign,
      title: "Fixed Monthly Salary",
      description: "Guaranteed ₹10,000 monthly salary regardless of sales"
    },
    {
      icon: TrendingUp,
      title: "1% Sales Incentive",
      description: "Earn 1% commission on every successful sale you make"
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Work according to your available time schedule"
    },
    {
      icon: Award,
      title: "Sales Training",
      description: "Free product knowledge and sales technique training"
    }
  ]

  const jobRole = {
    id: 1,
    icon: Target,
    title: "Sales Executive",
    description: "Sell premium Kashmiri rice products to customers",
    requirements: [
      "Good communication skills", 
      "Basic smartphone knowledge", 
      "3-4 hours daily availability",
      "Willingness to learn"
    ],
    salary: "₹10,000/month",
    incentive: "1% commission on sales",
    totalEarnings: "₹10,000 + Sales Commission",
    color: "from-green-500 to-green-600"
  }

  const workProcess = [
    {
      step: 1,
      icon: UserPlus,
      title: "Apply Online",
      description: "Fill out our simple registration form"
    },
    {
      step: 2,
      icon: Phone,
      title: "Interview Call",
      description: "Quick phone interview to assess your skills"
    },
    {
      step: 3,
      icon: Award,
      title: "Training Provided",
      description: "Free online training and skill development"
    },
    {
      step: 4,
      icon: Zap,
      title: "Start Working",
      description: "Begin your part-time job and earn money"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        title="Join Our Sales Team"
        subtitle="Sales Executive Position"
        description="₹10,000 guaranteed monthly salary + 1% commission. Flexible hours, comprehensive training, premium products."
        backgroundGradient="from-green-600 to-emerald-700"
        badge={{
          text: "Now Hiring"
        }}
        actions={[
          {
            label: "Apply Now",
            onClick: () => setShowRegistrationModal(true),
            variant: "primary"
          },
        ]}
      />

      {/* Job Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Why Work With Us?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Guaranteed salary + unlimited earning potential
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {jobBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group-hover:-translate-y-2">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-purple-500 group-hover:to-purple-600 transition-all duration-300">
                      <benefit.icon className="h-8 w-8 text-purple-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Job Roles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Position Details
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Everything you need to know about the role
            </motion.p>
          </div>

          <div className="flex justify-center">
            <div className="max-w-md w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group-hover:-translate-y-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${jobRole.color} rounded-xl flex items-center justify-center`}>
                        <jobRole.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-900">
                          {jobRole.title}
                        </CardTitle>
                        <Badge className="bg-green-100 text-green-800 mt-1">
                          {jobRole.totalEarnings}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-4">
                      {jobRole.description}
                    </p>
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Base Salary:</span>
                        <span className="font-semibold text-green-600">{jobRole.salary}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Commission:</span>
                        <span className="font-semibold text-green-600">{jobRole.incentive}</span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {jobRole.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              How To Get Started
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Simple 4-step process to start earning
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workProcess.map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <process.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {process.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-600">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              What Our Team Says
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Real experiences from our sales team
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Sales Executive",
                earnings: "₹13,500/month",
                story: "The guaranteed salary of ₹10,000 plus commission gives me financial security. Great training and support!",
                rating: 5
              },
              {
                name: "Rahul Gupta",
                role: "Sales Executive", 
                earnings: "₹15,200/month",
                story: "I love the 1% commission structure. The more I sell, the more I earn. Management is very supportive.",
                rating: 5
              },
              {
                name: "Anjali Verma",
                role: "Sales Executive",
                earnings: "₹12,800/month",
                story: "Perfect for someone who wants stable income with growth potential. Training helped me develop sales skills.",
                rating: 5
              }
            ].map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(story.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{story.story}"</p>
                    <div className="border-t pt-4">
                      <h4 className="font-bold text-gray-900">{story.name}</h4>
                      <p className="text-sm text-gray-500">{story.role}</p>
                      <Badge className="bg-green-100 text-green-800 mt-2">
                        Earning: {story.earnings}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Part-Time Registration Modal */}
      <PartTimeRegistrationForm 
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
      />
    </div>
  )
}
