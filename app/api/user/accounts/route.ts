import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { provider, providerAccountId, access_token, refresh_token, expires_at } = await request.json()

    if (!provider || !providerAccountId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if this account is already linked to another user
    const existingAccount = await prisma.account.findFirst({
      where: {
        provider,
        providerAccountId,
      },
    })

    if (existingAccount) {
      return NextResponse.json(
        { error: 'This account is already linked to another user' },
        { status: 400 }
      )
    }

    // Link the account to the current user
    const account = await prisma.account.create({
      data: {
        userId: session.user.id,
        type: 'oauth',
        provider,
        providerAccountId,
        access_token,
        refresh_token,
        expires_at,
        token_type: 'Bearer',
        scope: 'email profile openid',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Account linked successfully',
      account: {
        id: account.id,
        provider: account.provider,
      },
    })

  } catch (error) {
    console.error('Error linking account:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const provider = searchParams.get('provider')

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider is required' },
        { status: 400 }
      )
    }

    // Remove the linked account
    const deletedAccount = await prisma.account.deleteMany({
      where: {
        userId: session.user.id,
        provider,
      },
    })

    if (deletedAccount.count === 0) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Account unlinked successfully',
    })

  } catch (error) {
    console.error('Error unlinking account:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get all linked accounts for the current user
    const accounts = await prisma.account.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        provider: true,
        type: true,
      },
    })

    return NextResponse.json({
      accounts,
    })

  } catch (error) {
    console.error('Error fetching linked accounts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
