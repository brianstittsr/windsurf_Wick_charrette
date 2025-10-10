// Script to switch back to the original architecture
const fs = require('fs');
const path = require('path');

console.log('Switching back to original architecture...');

// Restore original files
try {
  if (fs.existsSync('package.json.bak')) {
    fs.copyFileSync('package.json.bak', 'package.json');
    console.log('✓ Restored original package.json');
  } else {
    console.error('× Original package.json backup not found');
  }
  
  if (fs.existsSync('vercel.json.bak')) {
    fs.copyFileSync('vercel.json.bak', 'vercel.json');
    console.log('✓ Restored original vercel.json');
  } else {
    console.error('× Original vercel.json backup not found');
  }
} catch (err) {
  console.error('Error restoring files:', err);
  process.exit(1);
}

console.log('\nSwitch complete! The system is now using the original architecture.');
console.log('\nTo run the original application:');
console.log('1. npm install');
console.log('2. npm run dev-full');
