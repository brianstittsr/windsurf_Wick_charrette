#!/bin/bash
# Coolify Deployment Script for Charette System
# This script automates the deployment process to Digital Ocean using Coolify

# Exit on error
set -e

echo "===== Charette System Deployment to Digital Ocean Coolify ====="
echo "Starting deployment process..."

# Check if required files exist
if [ ! -f "Dockerfile" ]; then
  echo "Error: Dockerfile not found"
  exit 1
fi

if [ ! -f "docker-compose.yml" ]; then
  echo "Error: docker-compose.yml not found"
  exit 1
fi

if [ ! -f ".env" ]; then
  echo "Warning: .env file not found. Creating from .env.example..."
  if [ -f ".env.example" ]; then
    cp .env.example .env
    echo "Please update the .env file with your actual configuration values."
    exit 1
  else
    echo "Error: .env.example not found. Cannot create .env file."
    exit 1
  fi
fi

# Check for firebase service account file
if [ ! -f "firebase-service-account.json" ]; then
  echo "Warning: firebase-service-account.json not found."
  echo "You will need to add this file to Coolify as a secret."
fi

# Check if git is installed
if ! command -v git &> /dev/null; then
  echo "Error: git is not installed"
  exit 1
fi

# Ensure we're on the main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
  echo "Warning: You're not on the main/master branch. Current branch: $CURRENT_BRANCH"
  read -p "Do you want to continue? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Commit any changes
git status
read -p "Do you want to commit any changes? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  read -p "Enter commit message: " commit_message
  git add .
  git commit -m "$commit_message"
fi

# Push to remote repository
read -p "Push to remote repository? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  git push origin $CURRENT_BRANCH
fi

echo "===== Deployment preparation complete ====="
echo ""
echo "Next steps for Coolify deployment:"
echo "1. Log in to your Coolify dashboard"
echo "2. Create a new service and select 'GitHub Repository'"
echo "3. Connect to your GitHub account and select this repository"
echo "4. Configure the deployment with the following settings:"
echo "   - Build method: Dockerfile"
echo "   - Port: 5000"
echo "   - Environment variables: Import from .env file"
echo "5. Add the firebase-service-account.json as a secret file"
echo "6. Deploy the application"
echo ""
echo "For more detailed instructions, refer to the DIGITAL_OCEAN_DEPLOYMENT.md file."