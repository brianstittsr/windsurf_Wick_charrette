#!/bin/bash

# This script runs before the Vercel build process
# It ensures that demo-loader.js is properly created if it doesn't exist

# Check if demo-loader.js exists
if [ ! -f "demo-loader.js" ]; then
  echo "Creating demo-loader.js from create-demo.js..."
  node create-demo.js
fi

# Continue with the normal build process
echo "Vercel build hook completed successfully"
