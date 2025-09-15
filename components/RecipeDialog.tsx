'use client'

import { useState, useEffect } from 'react'
import { Recipe } from '@/lib/recipe-data'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { 
  Clock, 
  Users, 
  ChefHat, 
  Lightbulb, 
  X, 
  Heart, 
  Share2, 
  Printer, 
  Check,
  CheckCircle2,
  PlayCircle,
  Pause,
  RotateCcw,
  Timer
} from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RecipeDialogProps {
  recipe: Recipe | null
  isOpen: boolean
  onClose: () => void
}

export default function RecipeDialog({ recipe, isOpen, onClose }: RecipeDialogProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set())
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerTime, setTimerTime] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'instructions' | 'tips'>('overview')

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime(time => {
          if (time <= 1) {
            setIsTimerRunning(false)
            // Could add notification here
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timerTime])

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setActiveStep(0)
      setCompletedSteps(new Set())
      setCheckedIngredients(new Set())
      setIsTimerRunning(false)
      setTimerTime(0)
      setActiveTab('overview')
    }
  }, [isOpen])

  if (!recipe) return null

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const toggleIngredientCheck = (index: number) => {
    const newChecked = new Set(checkedIngredients)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedIngredients(newChecked)
  }

  const toggleStepComplete = (index: number) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(index)) {
      newCompleted.delete(index)
    } else {
      newCompleted.add(index)
    }
    setCompletedSteps(newCompleted)
  }

  const startTimer = (minutes: number) => {
    setTimerTime(minutes * 60)
    setIsTimerRunning(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = recipe.instructions.length > 0 ? (completedSteps.size / recipe.instructions.length) * 100 : 0
  const ingredientProgress = recipe.ingredients.length > 0 ? (checkedIngredients.size / recipe.ingredients.length) * 100 : 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-screen h-screen max-w-none max-h-none p-0 rounded-none border-0 bg-white overflow-hidden [&>button]:hidden">
        <VisuallyHidden>
          <DialogTitle>{recipe.name} - Recipe Details</DialogTitle>
        </VisuallyHidden>
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="relative flex-shrink-0">
            {/* Hero Image */}
            <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 rounded-full w-10 h-10"
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Action Buttons */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={cn(
                    "bg-black/20 backdrop-blur-sm rounded-full w-10 h-10 transition-colors",
                    isFavorited ? "text-red-500 hover:bg-red-500/20" : "text-white hover:bg-black/40"
                  )}
                >
                  <Heart className={cn("h-5 w-5", isFavorited && "fill-current")} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 rounded-full w-10 h-10"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 rounded-full w-10 h-10"
                >
                  <Printer className="h-5 w-5" />
                </Button>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 drop-shadow-lg">
                  {recipe.name}
                </h1>
                <p className="text-white/90 text-base sm:text-lg drop-shadow-lg max-w-2xl line-clamp-2">
                  {recipe.description}
                </p>
              </div>
            </div>

            {/* Recipe Meta Info */}
            <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap gap-4 items-center justify-between mb-3">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium">{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{recipe.servings} servings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChefHat className="w-4 h-4 text-purple-600" />
                      <Badge className={getDifficultyColor(recipe.difficulty)}>
                        {recipe.difficulty}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-orange-700 border-orange-200 text-xs">
                      {recipe.category}
                    </Badge>
                  </div>
                  
                  {/* Timer */}
                  {timerTime > 0 && (
                    <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200">
                      <Timer className="w-4 h-4 text-orange-600" />
                      <span className="font-mono text-sm font-medium text-orange-800">
                        {formatTime(timerTime)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className="p-1 h-auto"
                      >
                        {isTimerRunning ? <Pause className="w-3 h-3" /> : <PlayCircle className="w-3 h-3" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTimerTime(0)}
                        className="p-1 h-auto"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Progress Bars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Ingredients checked</span>
                      <span>{checkedIngredients.size}/{recipe.ingredients.length}</span>
                    </div>
                    <Progress value={ingredientProgress} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Steps completed</span>
                      <span>{completedSteps.size}/{recipe.instructions.length}</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b border-gray-200 flex-shrink-0">
              <div className="max-w-7xl mx-auto px-4">
                <nav className="flex space-x-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: ChefHat },
                    { id: 'ingredients', label: 'Ingredients', icon: Check },
                    { id: 'instructions', label: 'Instructions', icon: PlayCircle },
                    { id: 'tips', label: 'Tips', icon: Lightbulb }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={cn(
                        "flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors",
                        activeTab === tab.id
                          ? "border-orange-500 text-orange-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      )}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto recipe-dialog-scroll">
            <div className="max-w-7xl mx-auto p-4">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {/* Nutrition Info */}
                    {recipe.nutritionInfo && (
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">📊</span>
                          </div>
                          Nutrition Information (per serving)
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                            <div className="text-2xl font-bold text-orange-600">{recipe.nutritionInfo.calories}</div>
                            <div className="text-gray-600 font-medium">Calories</div>
                          </div>
                          <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                            <div className="text-2xl font-bold text-blue-600">{recipe.nutritionInfo.protein}</div>
                            <div className="text-gray-600 font-medium">Protein</div>
                          </div>
                          <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                            <div className="text-2xl font-bold text-green-600">{recipe.nutritionInfo.carbs}</div>
                            <div className="text-gray-600 font-medium">Carbs</div>
                          </div>
                          <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                            <div className="text-2xl font-bold text-purple-600">{recipe.nutritionInfo.fat}</div>
                            <div className="text-gray-600 font-medium">Fat</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button
                        variant="outline"
                        onClick={() => startTimer(5)}
                        className="h-20 flex flex-col gap-2 hover:bg-orange-50 hover:border-orange-200"
                      >
                        <Timer className="w-6 h-6 text-orange-600" />
                        <span className="text-sm">5 min timer</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => startTimer(10)}
                        className="h-20 flex flex-col gap-2 hover:bg-orange-50 hover:border-orange-200"
                      >
                        <Timer className="w-6 h-6 text-orange-600" />
                        <span className="text-sm">10 min timer</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => startTimer(15)}
                        className="h-20 flex flex-col gap-2 hover:bg-orange-50 hover:border-orange-200"
                      >
                        <Timer className="w-6 h-6 text-orange-600" />
                        <span className="text-sm">15 min timer</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab('ingredients')}
                        className="h-20 flex flex-col gap-2 hover:bg-green-50 hover:border-green-200"
                      >
                        <Check className="w-6 h-6 text-green-600" />
                        <span className="text-sm">Start cooking</span>
                      </Button>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'ingredients' && (
                  <motion.div
                    key="ingredients"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="bg-green-50 p-6 border-b border-green-100">
                        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">🥘</span>
                          </div>
                          Ingredients
                        </h3>
                        <p className="text-gray-600 mt-2">Check off ingredients as you gather them</p>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          {recipe.ingredients.map((ingredient, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className={cn(
                                "flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md",
                                checkedIngredients.has(index)
                                  ? "bg-green-50 border-green-200 text-green-800"
                                  : "bg-white border-gray-200 hover:border-gray-300"
                              )}
                              onClick={() => toggleIngredientCheck(index)}
                            >
                              <div className={cn(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                checkedIngredients.has(index)
                                  ? "bg-green-500 border-green-500"
                                  : "border-gray-300"
                              )}>
                                {checkedIngredients.has(index) && (
                                  <Check className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <span className={cn(
                                "text-lg leading-relaxed flex-1",
                                checkedIngredients.has(index) && "line-through"
                              )}>
                                {ingredient}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'instructions' && (
                  <motion.div
                    key="instructions"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="bg-blue-50 p-6 border-b border-blue-100">
                        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">📝</span>
                          </div>
                          Cooking Instructions
                        </h3>
                        <p className="text-gray-600 mt-2">Follow these steps to create your delicious meal</p>
                      </div>
                      <div className="p-6">
                        <div className="space-y-6">
                          {recipe.instructions.map((instruction, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={cn(
                                "flex gap-6 p-6 rounded-xl border-2 transition-all",
                                completedSteps.has(index)
                                  ? "bg-green-50 border-green-200"
                                  : activeStep === index
                                  ? "bg-blue-50 border-blue-200 shadow-lg"
                                  : "bg-white border-gray-200"
                              )}
                            >
                              <div className="flex flex-col items-center gap-3">
                                <button
                                  onClick={() => toggleStepComplete(index)}
                                  className={cn(
                                    "w-12 h-12 rounded-full font-bold text-lg transition-all flex items-center justify-center",
                                    completedSteps.has(index)
                                      ? "bg-green-500 text-white"
                                      : activeStep === index
                                      ? "bg-blue-500 text-white"
                                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                  )}
                                >
                                  {completedSteps.has(index) ? (
                                    <CheckCircle2 className="w-6 h-6" />
                                  ) : (
                                    index + 1
                                  )}
                                </button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setActiveStep(index)}
                                  className={cn(
                                    "text-xs",
                                    activeStep === index ? "text-blue-600" : "text-gray-500"
                                  )}
                                >
                                  {activeStep === index ? "Current" : "Go to"}
                                </Button>
                              </div>
                              <div className="flex-1">
                                <p className={cn(
                                  "text-lg leading-relaxed",
                                  completedSteps.has(index) && "line-through text-gray-500"
                                )}>
                                  {instruction}
                                </p>
                                {index === activeStep && (
                                  <div className="mt-4 flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() => startTimer(5)}
                                      variant="outline"
                                      className="text-orange-600 border-orange-200 hover:bg-orange-50"
                                    >
                                      <Timer className="w-4 h-4 mr-1" />
                                      5 min
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={() => startTimer(10)}
                                      variant="outline"
                                      className="text-orange-600 border-orange-200 hover:bg-orange-50"
                                    >
                                      <Timer className="w-4 h-4 mr-1" />
                                      10 min
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'tips' && recipe.tips && recipe.tips.length > 0 && (
                  <motion.div
                    key="tips"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 overflow-hidden">
                      <div className="bg-yellow-100 p-6 border-b border-yellow-200">
                        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                          <Lightbulb className="w-8 h-8 text-yellow-600" />
                          Chef's Tips & Tricks
                        </h3>
                        <p className="text-gray-600 mt-2">Professional insights to elevate your cooking</p>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          {recipe.tips.map((tip, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-4 p-4 bg-white rounded-lg border border-yellow-200 shadow-sm"
                            >
                              <span className="text-2xl">💡</span>
                              <p className="text-lg leading-relaxed text-gray-700 flex-1">{tip}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
