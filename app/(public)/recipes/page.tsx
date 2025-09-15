'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, ChefHat, Eye } from 'lucide-react'
import { riceRecipes, Recipe } from '@/lib/recipe-data'
import RecipeDialog from '@/components/RecipeDialog'
import PageHero from '@/components/sections/PageHero'
import Link from 'next/link'

export default function RecipesPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedRecipe(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Main Course': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Breakfast': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Dessert': return 'bg-pink-100 text-pink-800 border-pink-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/20">
      {/* Header Section */}
      <PageHero
        title="Rice Recipes"
        description="Discover delicious and authentic rice recipes from across India. From comfort food to festive dishes, explore the versatility of premium rice with our curated collection."
        titleGradient="secondary"
        backgroundGradient="from-amber-50/50 via-orange-50/30 to-yellow-50/20"
        icon={{
          component: ChefHat,
          bgColor: "bg-gradient-to-br from-amber-600 to-orange-600"
        }}
        features={[
          {
            icon: ChefHat,
            label: "Premium Basmati Rice",
            color: "orange"
          },
          {
            icon: Users,
            label: "Healthy & Nutritious", 
            color: "green"
          },
          {
            icon: Eye,
            label: "Authentic Recipes",
            color: "orange"
          }
        ]}
      />

      {/* Recipes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {riceRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group h-full overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={recipe.image}
                        alt={recipe.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className={`${getCategoryColor(recipe.category)} border`}>
                          {recipe.category}
                        </Badge>
                      </div>

                      {/* Difficulty Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className={`${getDifficultyColor(recipe.difficulty)} border`}>
                          {recipe.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                          {recipe.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                          {recipe.description}
                        </p>
                      </div>

                      {/* Recipe Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span className="font-medium">{recipe.cookTime}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{recipe.servings}</span>
                          </div>
                        </div>

                        {recipe.nutritionInfo && (
                          <div className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                            {recipe.nutritionInfo.calories} cal
                          </div>
                        )}
                      </div>

                      {/* View Recipe Button */}
                      <Button 
                        onClick={() => handleViewRecipe(recipe)}
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                      >
                        <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        View Recipe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Cook These Amazing Recipes?
            </h2>
            <p className="text-xl text-amber-100 leading-relaxed">
              Get premium quality Basmati rice delivered fresh to your kitchen. 
              Perfect for all your cooking adventures!
            </p>
            <Link href="/products" className='mt-4 inline-block'>
              <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-amber-700 hover:bg-amber-50 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
              <ChefHat className="w-5 h-5 mr-2" />
              Shop Premium Rice
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Recipe Dialog */}
      <RecipeDialog
        recipe={selectedRecipe}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  )
}