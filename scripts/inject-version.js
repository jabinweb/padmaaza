const fs = require('fs')
const path = require('path')

// Get package version
const packageJson = require('../package.json')
const version = packageJson.version

// Get build time
const buildTime = new Date().toISOString()

// Get git commit hash if available
let commitHash = 'unknown'
try {
  const { execSync } = require('child_process')
  commitHash = execSync('git rev-parse HEAD').toString().trim()
} catch (error) {
  console.warn('Could not get git commit hash:', error.message)
}

// Create .env.local with version info (only if it doesn't exist)
const envLocalPath = path.join(__dirname, '..', '.env.local')
const versionContent = `# Auto-generated version info - DO NOT EDIT
NEXT_PUBLIC_APP_VERSION=${version}
NEXT_PUBLIC_BUILD_TIME=${buildTime}
NEXT_PUBLIC_COMMIT_HASH=${commitHash}
BUILD_TIME=${buildTime}
GIT_COMMIT_SHA=${commitHash}
`

// Check if .env.local exists
if (!fs.existsSync(envLocalPath)) {
  fs.writeFileSync(envLocalPath, versionContent)
  console.log('✅ Created .env.local with version info')
} else {
  // Read existing content and update version info
  let existingContent = fs.readFileSync(envLocalPath, 'utf8')

  // Remove existing version lines
  existingContent = existingContent
    .split('\n')
    .filter(line =>
      !line.startsWith('NEXT_PUBLIC_APP_VERSION=') &&
      !line.startsWith('NEXT_PUBLIC_BUILD_TIME=') &&
      !line.startsWith('NEXT_PUBLIC_COMMIT_HASH=') &&
      !line.startsWith('BUILD_TIME=') &&
      !line.startsWith('GIT_COMMIT_SHA=')
    )
    .join('\n')

  // Add new version info
  const updatedContent = versionContent + '\n' + existingContent
  fs.writeFileSync(envLocalPath, updatedContent)
  console.log('✅ Updated .env.local with new version info')
}

console.log(`📦 Build Info:
   Version: ${version}
   Build Time: ${buildTime}
   Commit: ${commitHash}`)