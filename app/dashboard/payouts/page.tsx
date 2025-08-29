'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DollarSign, Download, Clock, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Loading } from '@/components/ui/loading'

interface Payout {
  id: string
  amount: number
  status: string
  bankDetails: string
  adminNotes?: string
  createdAt: string
  updatedAt: string
}

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [loading, setLoading] = useState(true)
  const [requesting, setRequesting] = useState(false)
  const [amount, setAmount] = useState('')
  const [bankDetails, setBankDetails] = useState('')
  const [currentBalance, setCurrentBalance] = useState(0)

  useEffect(() => {
    fetchPayouts()
    fetchBalance()
  }, [])

  const fetchPayouts = async () => {
    try {
      const response = await fetch('/api/payouts')
      if (response.ok) {
        const data = await response.json()
        setPayouts(data)
      }
    } catch (error) {
      console.error('Error fetching payouts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBalance = async () => {
    try {
      const response = await fetch('/api/dashboard')
      if (response.ok) {
        const data = await response.json()
        setCurrentBalance(data.stats.currentBalance)
      }
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  const handleRequestPayout = async () => {
    if (!amount || !bankDetails) {
      toast.error('Please fill in all fields')
      return
    }

    const payoutAmount = parseFloat(amount)
    if (payoutAmount <= 0 || payoutAmount > currentBalance) {
      toast.error('Invalid payout amount')
      return
    }

    setRequesting(true)
    try {
      const response = await fetch('/api/payouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: payoutAmount,
          bankDetails,
        }),
      })

      if (response.ok) {
        toast.success('Payout request submitted successfully')
        setAmount('')
        setBankDetails('')
        fetchPayouts()
        fetchBalance()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to submit payout request')
      }
    } catch (error) {
      console.error('Error requesting payout:', error)
      toast.error('Something went wrong')
    } finally {
      setRequesting(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'APPROVED':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'REJECTED':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'PAID':
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'APPROVED':
        return 'bg-green-100 text-green-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      case 'PAID':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payout Management</h1>
          <p className="text-gray-600 mt-2">Request withdrawals and track your payout history</p>
        </div>

        {/* Balance Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Available Balance
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Request Payout
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Payout</DialogTitle>
                    <DialogDescription>
                      Enter the amount you want to withdraw and your bank details
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        max={currentBalance}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Available: ₹{currentBalance.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="bankDetails">Bank Details</Label>
                      <Textarea
                        id="bankDetails"
                        placeholder="Enter your bank account details (Account number, IFSC code, etc.)"
                        value={bankDetails}
                        onChange={(e) => setBankDetails(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <Button 
                      onClick={handleRequestPayout} 
                      disabled={requesting}
                      className="w-full"
                    >
                      {requesting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">₹{currentBalance.toFixed(2)}</div>
            <p className="text-gray-500">Ready for withdrawal</p>
          </CardContent>
        </Card>

        {/* Payout History */}
        <Card>
          <CardHeader>
            <CardTitle>Payout History</CardTitle>
            <CardDescription>Track all your withdrawal requests</CardDescription>
          </CardHeader>
          <CardContent>
            {payouts.length === 0 ? (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No payout requests yet</h3>
                <p className="text-gray-500">Your payout requests will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {payouts.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(payout.status)}
                      <div>
                        <p className="font-medium">₹{payout.amount.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">
                          Requested on {new Date(payout.createdAt).toLocaleDateString()}
                        </p>
                        {payout.adminNotes && (
                          <p className="text-sm text-gray-600 mt-1">
                            Note: {payout.adminNotes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(payout.status)}>
                        {payout.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        Updated {new Date(payout.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}