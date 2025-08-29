'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Wallet,
  DollarSign,
  TrendingUp,
  ArrowLeft,
  Download,
  Plus,
  Minus,
  CreditCard,
  Calendar
} from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import Link from 'next/link'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

interface WalletData {
  balance: number
  totalEarnings: number
  totalWithdrawn: number
  transactions: {
    id: string
    type: 'COMMISSION' | 'PAYOUT' | 'WITHDRAWAL'
    amount: number
    description: string
    status: string
    createdAt: string
  }[]
}

export default function WalletPage() {
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [loading, setLoading] = useState(true)
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [bankDetails, setBankDetails] = useState('')
  const [requesting, setRequesting] = useState(false)

  const fetchWalletData = useCallback(async () => {
    try {
      const response = await fetch('/api/dashboard/wallet')
      const data = await response.json()
      setWalletData(data)
    } catch (error) {
      console.error('Error fetching wallet data:', error)
      toast.error('Failed to load wallet data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWalletData()
  }, [fetchWalletData])

  const handleWithdrawalRequest = async () => {
    const amount = parseFloat(withdrawalAmount)
    
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    if (amount > (walletData?.balance || 0)) {
      toast.error('Insufficient balance')
      return
    }

    if (!bankDetails.trim()) {
      toast.error('Please provide bank details')
      return
    }

    setRequesting(true)
    try {
      const response = await fetch('/api/dashboard/payouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          bankDetails
        })
      })

      if (!response.ok) throw new Error('Failed to request withdrawal')

      toast.success('Withdrawal request submitted successfully')
      setWithdrawalAmount('')
      setBankDetails('')
      fetchWalletData()
    } catch (error) {
      toast.error('Failed to submit withdrawal request')
    } finally {
      setRequesting(false)
    }
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <DashboardHeader
          title="My Wallet"
          description="Manage your earnings and withdrawals"
          icon={<Wallet className="h-6 w-6 text-white" />}
          actions={
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Statement
            </Button>
          }
        />

        {/* Wallet Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Available Balance</p>
                  <p className="text-3xl font-bold">₹{walletData?.balance.toFixed(2) || '0.00'}</p>
                </div>
                <Wallet className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Earnings</p>
                  <p className="text-3xl font-bold">₹{walletData?.totalEarnings.toFixed(2) || '0.00'}</p>
                </div>
                <TrendingUp className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Withdrawn</p>
                  <p className="text-3xl font-bold">₹{walletData?.totalWithdrawn.toFixed(2) || '0.00'}</p>
                </div>
                <DollarSign className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Withdrawal Request */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Request Withdrawal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Amount (₹)</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    max={walletData?.balance || 0}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Available: ₹{walletData?.balance.toFixed(2) || '0.00'}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">Bank Details</label>
                  <Textarea
                    placeholder="Enter your bank account details (Account number, IFSC, Bank name)"
                    value={bankDetails}
                    onChange={(e) => setBankDetails(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <Button 
                  onClick={handleWithdrawalRequest}
                  disabled={requesting}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                >
                  {requesting ? 'Processing...' : 'Request Withdrawal'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transaction History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                {walletData?.transactions && walletData.transactions.length > 0 ? (
                  <div className="space-y-4">
                    {walletData.transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'COMMISSION' ? 'bg-green-100' :
                            transaction.type === 'PAYOUT' ? 'bg-blue-100' :
                            'bg-red-100'
                          }`}>
                            {transaction.type === 'COMMISSION' ? (
                              <Plus className="h-5 w-5 text-green-600" />
                            ) : (
                              <Minus className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold text-lg ${
                            transaction.type === 'COMMISSION' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'COMMISSION' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                          </p>
                          <Badge variant={transaction.status === 'COMPLETED' ? 'default' : 'secondary'}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Wallet className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
                    <p className="text-gray-500">Your transaction history will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
                  
