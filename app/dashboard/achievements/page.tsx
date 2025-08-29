'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Users, TrendingUp, Target, Star, Crown } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

// Simple Progress component if not available
const Progress = ({ value, className }: { value: number; className?: string }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div 
      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
      style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
    />
  </div>
)

interface Rank {
  id: string
  name: string
  description: string
  minReferrals: number
  minSalesVolume: number
  minTeamVolume: number
  commissionMultiplier: number
  benefits: string[]
  color: string
  icon: string
  order: number
}

interface UserProgress {
  currentRank: Rank | null
  nextRank: Rank | null
  metrics: {
    totalReferrals: number
    salesVolume: number
    teamVolume: number
  }
  achievements: {
    id: string
    rank: Rank
    achievedAt: string
  }[]
}

export default function AchievementsPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserProgress()
  }, [])

  const fetchUserProgress = async () => {
    try {
      const response = await fetch('/api/achievements')
      if (!response.ok) {
        throw new Error(`Failed to fetch achievements: ${response.status}`)
      }
      const data = await response.json()
      setProgress(data)
    } catch (error) {
      console.error('Error fetching achievements:', error)
      toast.error('Failed to load achievements')
      // Set default data to prevent crashes
      setProgress({
        currentRank: null,
        nextRank: null,
        metrics: {
          totalReferrals: 0,
          salesVolume: 0,
          teamVolume: 0
        },
        achievements: []
      })
    } finally {
      setLoading(false)
    }
  }

  const calculateProgress = (current: number, required: number) => {
    return Math.min((current / required) * 100, 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Achievements & Rankings
          </h1>
          <p className="text-gray-600">Track your progress and unlock new rewards</p>
        </motion.div>

        {progress && (
          <>
            {/* Current Rank */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-6xl">{progress.currentRank?.icon || '🥉'}</div>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">
                    {progress.currentRank?.name || 'Bronze'}
                  </h2>
                  <p className="text-lg opacity-90 mb-4">
                    {progress.currentRank?.description || 'Welcome to the journey!'}
                  </p>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {progress.currentRank?.commissionMultiplier || 1}x Commission Multiplier
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>

            {/* Progress to Next Rank */}
            {progress.nextRank && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-6 w-6 mr-2 text-blue-600" />
                      Progress to {progress.nextRank.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Referrals Progress */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Direct Referrals</span>
                        <span className="text-sm text-gray-500">
                          {progress.metrics.totalReferrals} / {progress.nextRank.minReferrals}
                        </span>
                      </div>
                      <Progress 
                        value={calculateProgress(progress.metrics.totalReferrals, progress.nextRank.minReferrals)} 
                        className="h-3"
                      />
                    </div>

                    {/* Sales Volume Progress */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Personal Sales (30 days)</span>
                        <span className="text-sm text-gray-500">
                          ₹{progress.metrics.salesVolume.toFixed(0)} / ₹{progress.nextRank.minSalesVolume.toFixed(0)}
                        </span>
                      </div>
                      <Progress 
                        value={calculateProgress(progress.metrics.salesVolume, progress.nextRank.minSalesVolume)} 
                        className="h-3"
                      />
                    </div>

                    {/* Team Volume Progress */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Team Sales (30 days)</span>
                        <span className="text-sm text-gray-500">
                          ₹{progress.metrics.teamVolume.toFixed(0)} / ₹{progress.nextRank.minTeamVolume.toFixed(0)}
                        </span>
                      </div>
                      <Progress 
                        value={calculateProgress(progress.metrics.teamVolume, progress.nextRank.minTeamVolume)} 
                        className="h-3"
                      />
                    </div>

                    {/* Next Rank Benefits */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        {progress.nextRank.name} Benefits:
                      </h4>
                      <ul className="space-y-1">
                        {progress.nextRank.benefits.map((benefit, index) => (
                          <li key={index} className="text-blue-700 text-sm flex items-center">
                            <Star className="h-4 w-4 mr-2 text-blue-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Achievement History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-6 w-6 mr-2 text-yellow-600" />
                    Achievement History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {progress.achievements.length === 0 ? (
                    <div className="text-center py-8">
                      <Crown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No achievements yet</p>
                      <p className="text-sm text-gray-400">Keep growing to unlock your first rank!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {progress.achievements.map((achievement, index) => (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + (index * 0.1) }}
                          className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                        >
                          <div className="text-3xl">{achievement.rank.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {achievement.rank.name} Achieved!
                            </h4>
                            <p className="text-sm text-gray-600">
                              {achievement.rank.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Achieved on {new Date(achievement.achievedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge 
                            className="bg-yellow-500 text-white"
                          >
                            {achievement.rank.commissionMultiplier}x Bonus
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
