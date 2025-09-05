'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, Copy, QrCode, TrendingUp, Calendar, Share2, Download, Mail, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import QRCodeLib from 'qrcode'
import Image from 'next/image'

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  joinedAt: string
  referrals: TeamMember[]
}

interface TeamStats {
  totalTeamSize: number
  levels: Array<{
    level: number
    count: number
  }>
}

interface TeamData {
  directReferrals: TeamMember[]
  teamStats: TeamStats
}

export default function TeamPage() {
  const { data: session } = useSession()
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [loading, setLoading] = useState(true)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [generatingQR, setGeneratingQR] = useState(false)

  useEffect(() => {
    fetchTeamData()
  }, [])

  const fetchTeamData = async () => {
    try {
      const response = await fetch('/api/dashboard/team')
      if (response.ok) {
        const data = await response.json()
        setTeamData(data)
      }
    } catch (error) {
      console.error('Error fetching team data:', error)
      toast.error('Failed to load team data')
    } finally {
      setLoading(false)
    }
  }

  const getReferralLink = () => {
    return `${window.location.origin}/auth/signup?ref=${session?.user?.referralCode}`
  }

  const copyReferralLink = () => {
    if (session?.user?.referralCode) {
      navigator.clipboard.writeText(getReferralLink())
      toast.success('Referral link copied to clipboard!')
    }
  }

  const generateQRCode = async () => {
    if (!session?.user?.referralCode) return
    
    setGeneratingQR(true)
    try {
      const url = await QRCodeLib.toDataURL(getReferralLink(), {
        width: 200,
        margin: 2,
        color: {
          dark: '#1f2937',
          light: '#ffffff'
        }
      })
      setQrCodeUrl(url)
      toast.success('QR code generated successfully!')
    } catch (error) {
      console.error('Error generating QR code:', error)
      toast.error('Failed to generate QR code')
    } finally {
      setGeneratingQR(false)
    }
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return
    
    const link = document.createElement('a')
    link.download = `referral-qr-${session?.user?.referralCode}.png`
    link.href = qrCodeUrl
    link.click()
    toast.success('QR code downloaded!')
  }

  const shareViaWhatsApp = () => {
    const message = `Hey! Join Padmaaja Rasooi premium rice business using my referral link and start earning: ${getReferralLink()}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  const shareViaEmail = () => {
    const subject = 'Join Padmaaja Rasooi Rice Business Partnership!'
    const body = `Hi there!\n\nI'd like to invite you to join Padmaaja Rasooi, a premium rice products business where you can earn through our partnership program.\n\nClick here to join: ${getReferralLink()}\n\nBest regards!`
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Team Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Team Size</p>
                  <p className="text-3xl font-bold">{teamData?.teamStats.totalTeamSize || 0}</p>
                  <p className="text-blue-100 text-xs mt-1">All levels combined</p>
                </div>
                <Users className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Direct Referrals</p>
                  <p className="text-3xl font-bold">{teamData?.directReferrals.length || 0}</p>
                  <p className="text-green-100 text-xs mt-1">Level 1 members</p>
                </div>
                <TrendingUp className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Active Levels</p>
                  <p className="text-3xl font-bold">
                    {teamData?.teamStats.levels.filter(l => l.count > 0).length || 0}
                  </p>
                  <p className="text-purple-100 text-xs mt-1">Out of 5 levels</p>
                </div>
                <Users className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Referral Code</p>
                  <p className="text-xl font-mono font-bold">{session?.user?.referralCode}</p>
                  <p className="text-orange-100 text-xs mt-1">Your unique code</p>
                </div>
                <QrCode className="h-10 w-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="direct">Direct Referrals</TabsTrigger>
              <TabsTrigger value="levels">Level Breakdown</TabsTrigger>
              <TabsTrigger value="tools">Referral Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Team Structure Overview</CardTitle>
                  <CardDescription>Your network across all 5 levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamData?.teamStats.levels.map((level) => (
                      <motion.div 
                        key={level.level}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: level.level * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            level.level === 1 ? 'bg-blue-100 text-blue-600' :
                            level.level === 2 ? 'bg-green-100 text-green-600' :
                            level.level === 3 ? 'bg-yellow-100 text-yellow-600' :
                            level.level === 4 ? 'bg-purple-100 text-purple-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            <span className="text-sm font-bold">{level.level}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">Level {level.level}</span>
                            <p className="text-xs text-gray-500">
                              {level.level === 1 ? 'Direct referrals' : `${level.level} levels down`}
                            </p>
                          </div>
                        </div>
                        <Badge variant={level.count > 0 ? 'default' : 'secondary'} className="text-sm">
                          {level.count} {level.count === 1 ? 'member' : 'members'}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="direct" className="space-y-4">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Direct Referrals</CardTitle>
                  <CardDescription>Members you directly referred</CardDescription>
                </CardHeader>
                <CardContent>
                  {(teamData?.directReferrals || []).length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No direct referrals yet</h3>
                      <p className="text-gray-500 mb-6">Start sharing your referral link to build your team</p>
                      <div className="flex justify-center space-x-3">
                        <Button onClick={copyReferralLink}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </Button>
                        <Button variant="outline" onClick={shareViaWhatsApp}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Share on WhatsApp
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {teamData?.directReferrals.map((member, index) => (
                        <motion.div 
                          key={member.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">
                                {member.name?.[0] || member.email[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{member.name || 'Unknown'}</p>
                              <p className="text-sm text-gray-500">{member.email}</p>
                              <p className="text-xs text-gray-400 flex items-center mt-1">
                                <Calendar className="h-3 w-3 mr-1" />
                                Joined {new Date(member.joinedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={member.role === 'MEMBER' ? 'default' : 'secondary'}>
                              {member.role}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              {member.referrals?.length || 0} referrals
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="levels" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamData?.teamStats.levels.map((level, index) => (
                  <motion.div
                    key={level.level}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border-0 shadow-lg ${
                      level.count > 0 
                        ? 'bg-gradient-to-br from-white to-blue-50' 
                        : 'bg-gradient-to-br from-gray-50 to-gray-100'
                    }`}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center">
                            <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${
                              level.level === 1 ? 'bg-blue-500 text-white' :
                              level.level === 2 ? 'bg-green-500 text-white' :
                              level.level === 3 ? 'bg-yellow-500 text-white' :
                              level.level === 4 ? 'bg-purple-500 text-white' :
                              'bg-red-500 text-white'
                            }`}>
                              {level.level}
                            </div>
                            Level {level.level}
                          </span>
                          <Badge variant={level.count > 0 ? 'default' : 'secondary'}>
                            {level.count}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {level.level === 1 ? 'Direct referrals' : `${level.level} levels down`}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold mb-2 text-gray-900">{level.count}</div>
                        <p className="text-sm text-gray-500">
                          {level.count === 1 ? 'member' : 'members'}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Referral Link Card */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Share2 className="h-5 w-5 mr-2" />
                      Referral Link
                    </CardTitle>
                    <CardDescription>Share your unique referral link</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <p className="text-sm font-mono break-all text-gray-700">
                        {getReferralLink()}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={copyReferralLink} size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </Button>
                      <Button variant="outline" onClick={shareViaWhatsApp} size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button variant="outline" onClick={shareViaEmail} size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* QR Code Card */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <QrCode className="h-5 w-5 mr-2" />
                      QR Code
                    </CardTitle>
                    <CardDescription>Generate and share QR code</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-center">
                      {qrCodeUrl ? (
                        <div className="relative">
                          <Image
                            src={qrCodeUrl}
                            alt="Referral QR Code"
                            width={200}
                            height={200}
                            className="rounded-lg border shadow-sm"
                          />
                        </div>
                      ) : (
                        <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <div className="text-center">
                            <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Click to generate QR code</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-center space-x-2">
                      <Button 
                        onClick={generateQRCode} 
                        disabled={generatingQR}
                        size="sm"
                      >
                        {generatingQR ? 'Generating...' : 'Generate QR Code'}
                      </Button>
                      {qrCodeUrl && (
                        <Button variant="outline" onClick={downloadQRCode} size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}