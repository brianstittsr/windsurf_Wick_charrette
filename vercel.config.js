// Vercel configuration
module.exports = {
  // Specify which directory contains the build output
  outputDirectory: './client/build',
  
  // Configure routes for SPA
  routes: [
    // Serve static files
    { src: '/static/(.*)', dest: '/static/$1' },
    { src: '/(.*)\\.(?:js|css|svg|png|jpg|ico)$', dest: '/$1.$2' },
    
    // API routes
    { src: '/api/(.*)', dest: '/server.js' },
    { src: '/socket.io/(.*)', dest: '/server.js' },
    
    // All other routes go to index.html for client-side routing
    { src: '/(.*)', dest: '/index.html' }
  ],
  
  // Environment variables
  env: {
    NODE_ENV: 'production'
  }
};
