# Deploying to Vercel

This document explains how to deploy the Charette System to Vercel.

## Direct Server Approach

For simplicity and to avoid 404 errors, we're using a direct server approach for Vercel deployment. This means:

1. All requests are handled by a single server file (`direct-server.js`)
2. The server serves a simple HTML page at the root path
3. API endpoints are available at `/api/*`

## Deployment Steps

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Use the following settings in Vercel:
   - Framework Preset: `Other`
   - Build Command: `npm run vercel-build`
   - Output Directory: `public`
   - Install Command: `npm install`

## Vercel Configuration

The `vercel.json` file is configured to:

1. Use `direct-server.js` as the server
2. Route all requests to this server
3. Set the environment to production

## Testing the Deployment

Once deployed, you should see a simple welcome page at the root URL. You can test the API by visiting:

- `/api/status` - Check if the API is running
- `/api/charettes` - Get all charettes

## Troubleshooting

If you encounter a 404 error:

1. Check the Vercel deployment logs
2. Make sure `direct-server.js` is being used
3. Verify that the routes in `vercel.json` are correct

## Local Testing

To test the direct server approach locally:

```bash
npm start
```

This will start the direct server on port 5000.
