# Deployment Guide for Charette System

This guide provides instructions for deploying the Charette System application to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com/) account
- [Git](https://git-scm.com/) installed on your local machine
- [Node.js](https://nodejs.org/) (v14 or higher) and npm installed

## Environment Variables Setup

Before deploying, you need to set up the necessary environment variables:

### 1. Server Environment Variables

Create a `.env` file in the root directory with the following variables:
```
NODE_ENV=production
PORT=5000
```

### 2. Client Environment Variables

Create a `.env` file in the `client` directory with the following variables:
```
REACT_APP_API_URL=https://your-vercel-deployment-url.vercel.app
REACT_APP_DEMO_MODE=false

# Firebase Configuration (if using Firebase)
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Deployment Steps

### Option 1: Deploy from Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your Vercel account
3. Click "New Project"
4. Import your repository
5. Configure the project:
   - Set the Framework Preset to "Other"
   - Set the Root Directory to the project root
   - Set the Build Command to `npm run vercel-build`
   - Set the Output Directory to `client/build`
6. Add the environment variables from the sections above
7. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to your Vercel account:
   ```
   vercel login
   ```

3. Navigate to your project directory and run:
   ```
   vercel
   ```

4. Follow the prompts to configure your deployment
5. Add environment variables:
   ```
   vercel env add NODE_ENV production
   vercel env add REACT_APP_API_URL https://your-vercel-deployment-url.vercel.app
   # Add other environment variables as needed
   ```

6. Deploy to production:
   ```
   vercel --prod
   ```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check the build logs in the Vercel dashboard
   - Ensure all dependencies are correctly installed
   - Verify that the build commands are correct

2. **API Connection Issues**
   - Ensure `REACT_APP_API_URL` is correctly set to your Vercel deployment URL
   - Check CORS settings in `server.js`

3. **Socket.IO Connection Problems**
   - Verify that the Socket.IO route is correctly configured in `vercel.json`
   - Check browser console for connection errors

4. **Missing Files**
   - Ensure `phases.js` and `demo-loader.js` are included in your repository
   - If files are missing, the application includes fallback options

## Post-Deployment

After successful deployment:

1. Test all functionality in the production environment
2. Monitor the application for any errors
3. Set up any additional monitoring or analytics tools

## Updating the Deployment

To update your deployment:

1. Make changes to your code
2. Commit and push to your Git repository
3. Vercel will automatically redeploy your application

For manual redeployment, run:
```
vercel --prod
```
