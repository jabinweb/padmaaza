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
import PageHero from '@/components/PageHero'
import PartTimeRegistrationForm from '@/components/PartTimeRegistrationForm'

export default function PartTimePage() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)

  const jobBenefits = [
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Work according to your available time schedule"
    },
    {
      icon: Home,
      title: "Work From Home",
      description: "Remote work opportunities with online training"
    },
    {
      icon: TrendingUp,
      title: "Performance Bonuses",
      description: "Earn extra income based on your achievements"
    },
    {
      icon: Award,
      title: "Skill Development",
      description: "Learn digital marketing and sales skills"
    }
  ]

  const jobRoles = [
    {
      id: 1,
      icon: Users,
      title: "Social Media Marketing",
      description: "Promote products on social media platforms",
      requirements: ["Basic social media knowledge", "Good communication skills", "2-3 hours daily"],
      earnings: "₹5,000 - ₹15,000/month",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: Phone,
      title: "Customer Support",
      description: "Handle customer inquiries and provide assistance",
      requirements: ["Good communication skills", "Basic computer knowledge", "4-5 hours daily"],
      earnings: "₹8,000 - ₹20,000/month",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      icon: Target,
      title: "Sales Representative",
      description: "Generate leads and promote products to potential customers",
      requirements: ["Sales experience preferred", "Excellent communication", "3-4 hours daily"],
      earnings: "₹10,000 - ₹25,000/month",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      icon: FileText,
      title: "Content Creator",
      description: "Create engaging content for marketing campaigns",
      requirements: ["Creative writing skills", "Basic design knowledge", "2-3 hours daily"],
      earnings: "₹6,000 - ₹18,000/month",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 5,
      icon: Mail,
      title: "Email Marketing",
      description: "Manage email campaigns and customer communications",
      requirements: ["Email marketing knowledge", "Good writing skills", "2-3 hours daily"],
      earnings: "₹7,000 - ₹16,000/month",
      color: "from-red-500 to-red-600"
    },
    {
      id: 6,
      icon: Briefcase,
      title: "Business Development",
      description: "Find new business opportunities and partnerships",
      requirements: ["Business acumen", "Networking skills", "3-4 hours daily"],
      earnings: "₹12,000 - ₹30,000/month",
      color: "from-indigo-500 to-indigo-600"
    }
  ]

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
        title="Part-Time Job Opportunities"
        description="Join our team and earn extra income with flexible part-time jobs. Work from home, choose your hours, and grow your skills while building a successful career."
        backgroundGradient="from-purple-600 to-purple-700"
        badge={{
          text: "Part-Time Jobs",
          variant: "outline"
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
              Why Choose Part-Time Work With Us?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Flexible opportunities designed for students, homemakers, and professionals looking for extra income
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
              Available Part-Time Positions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Choose from various roles that match your skills and availability
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobRoles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group-hover:-translate-y-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center`}>
                        <role.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-900">
                          {role.title}
                        </CardTitle>
                        <Badge className="bg-green-100 text-green-800 mt-1">
                          {role.earnings}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-4">
                      {role.description}
                    </p>
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {role.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              How It Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Simple 4-step process to start your part-time career with us
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
              Success Stories
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Real people earning real income with our part-time opportunities
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Social Media Marketing",
                earnings: "₹12,000/month",
                story: "As a college student, I needed flexible work. This part-time job helps me earn while studying.",
                rating: 5
              },
              {
                name: "Rahul Gupta",
                role: "Customer Support",
                earnings: "₹18,000/month",
                story: "Working from home has been amazing. Great support from the team and steady income.",
                rating: 5
              },
              {
                name: "Anjali Verma",
                role: "Content Creator",
                earnings: "₹15,000/month",
                story: "I can work during my free time and the training provided was excellent. Highly recommended!",
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
