import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Get version info from environment or package.json
    const versionInfo = {
      version: process.env.npm_package_version || '1.0.0',
      buildTime: process.env.BUILD_TIME || new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      commitHash: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_COMMIT_SHA || 'unknown',
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(versionInfo, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Version API error:', error)
    return NextResponse.json(
      { error: 'Failed to get version info' },
      { status: 500 }
    )
  }
}