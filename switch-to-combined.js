// Script to switch to the combined architecture
const fs = require('fs');
const path = require('path');

console.log('Switching to combined architecture...');

// Backup original files
try {
  if (fs.existsSync('package.json')) {
    fs.copyFileSync('package.json', 'package.json.bak');
    console.log('✓ Backed up package.json');
  }
  
  if (fs.existsSync('vercel.json')) {
    fs.copyFileSync('vercel.json', 'vercel.json.bak');
    console.log('✓ Backed up vercel.json');
  }
} catch (err) {
  console.error('Error backing up files:', err);
  process.exit(1);
}

// Copy combined architecture files
try {
  if (fs.existsSync('combined-package.json')) {
    fs.copyFileSync('combined-package.json', 'package.json');
    console.log('✓ Installed combined package.json');
  }
  
  if (fs.existsSync('combined-vercel.json')) {
    fs.copyFileSync('combined-vercel.json', 'vercel.json');
    console.log('✓ Installed combined vercel.json');
  }
} catch (err) {
  console.error('Error installing combined files:', err);
  process.exit(1);
}

console.log('\nSwitch complete! The system is now using the combined architecture.');
console.log('\nTo run the combined application:');
console.log('1. npm install');
console.log('2. npm run build');
console.log('3. npm start');
console.log('\nTo switch back to the original architecture:');
console.log('1. node switch-to-original.js');
