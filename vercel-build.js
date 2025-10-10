// This script is used by Vercel to build the application
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Log the current directory
console.log('Current directory:', process.cwd());
console.log('Files in current directory:', fs.readdirSync('.'));

try {
  // Install dependencies in the root directory
  console.log('Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Install dependencies in the client directory
  console.log('Installing client dependencies...');
  execSync('cd client && npm install', { stdio: 'inherit' });

  // Build the client
  console.log('Building client...');
  execSync('cd client && npm run build', { stdio: 'inherit' });

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
