'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, ArrowLeft } from 'lucide-react'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return {
          title: 'Account Already Exists',
          message: 'An account with this email address already exists. Please sign in with your email and password, then you can link your Google account from your profile settings.',
          suggestion: 'Try signing in with your email and password instead.'
        }
      case 'OAuthCallback':
        return {
          title: 'Authentication Failed',
          message: 'There was an error during the Google authentication process.',
          suggestion: 'Please try signing in again.'
        }
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          message: 'You denied access to your Google account.',
          suggestion: 'Please try again and allow access to continue.'
        }
      case 'Configuration':
        return {
          title: 'Configuration Error',
          message: 'There is a problem with the server configuration.',
          suggestion: 'Please contact support if this problem persists.'
        }
      default:
        return {
          title: 'Authentication Error',
          message: 'An unexpected error occurred during authentication.',
          suggestion: 'Please try again or contact support if the problem persists.'
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600 mt-4">
            {errorInfo.title}
          </CardTitle>
          <CardDescription>
            {errorInfo.message}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {errorInfo.suggestion}
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/auth/signin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                Go to Homepage
              </Link>
            </Button>
          </div>

          {error === 'OAuthAccountNotLinked' && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Need help linking accounts?{' '}
                <Link href="/contact" className="text-blue-600 hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <AlertTriangle className="h-6 w-6 text-gray-400 animate-pulse" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-600 mt-4">
              Loading...
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
}
