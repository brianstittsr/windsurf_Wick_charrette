# Charette System: Combined Architecture

This document explains the combined architecture version of the Charette System, designed for demonstration purposes.

## Overview

The combined architecture integrates both the front-end and back-end into a single application. This simplifies deployment and development for demonstration purposes.

## Key Features

- **Single Entry Point**: One server handles both API requests and serves the React application
- **Simplified Deployment**: Only one process needs to be deployed and managed
- **Reduced Configuration**: No need to manage separate front-end and back-end environments
- **Same-Origin Communication**: No CORS issues since everything is served from the same origin

## How It Works

1. **Express Server**: Serves both the API endpoints and the static React files
2. **Socket.IO**: Integrated directly into the same server for real-time communication
3. **In-Memory Data Storage**: Maintains session data, messages, and user information
4. **React Front-End**: Built and served as static files from the Express server

## Files

- `combined-app.js`: The main application file that contains both server and API logic
- `combined-package.json`: Package configuration for the combined architecture
- `combined-vercel.json`: Vercel deployment configuration for the combined architecture

## Running the Combined Version

### Local Development

```bash
# Install dependencies
npm install

# Build the client
npm run build

# Start the combined application
npm start
```

### Development with Hot Reloading

```bash
# Run both client and server with hot reloading
npm run dev
```

### Deployment

The combined architecture can be deployed to Vercel using the `combined-vercel.json` configuration:

```bash
# Rename the configuration file
cp combined-vercel.json vercel.json

# Deploy to Vercel
vercel
```

## Differences from Original Architecture

1. **API URL Handling**: The client now uses relative URLs for API calls
2. **Socket.IO Configuration**: Socket.IO connects to the same origin
3. **Build Process**: The server builds and serves the client application
4. **Deployment**: Single deployment process for both front-end and back-end

## Limitations

While the combined architecture is simpler for demonstration purposes, it has some limitations:

1. **Scalability**: Cannot scale front-end and back-end independently
2. **Development Workflow**: Changes to the server require restarting the entire application
3. **Resource Sharing**: Server and client compete for the same resources
4. **Deployment Options**: Fewer options for optimizing deployment

For production use, the separated architecture is generally recommended for better scalability and maintainability.
