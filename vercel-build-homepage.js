// This script ensures the homepage is properly built for Vercel
const fs = require('fs');
const path = require('path');

console.log('Running Vercel build script for homepage...');

// Paths
const clientBuildDir = path.join(__dirname, 'client', 'build');
const indexHtmlPath = path.join(clientBuildDir, 'index.html');
const notFoundHtmlPath = path.join(clientBuildDir, '404.html');

// Ensure the build directory exists
if (!fs.existsSync(clientBuildDir)) {
  console.log('Creating client build directory...');
  fs.mkdirSync(clientBuildDir, { recursive: true });
}

// Create a simple index.html if it doesn't exist
if (!fs.existsSync(indexHtmlPath)) {
  console.log('Creating index.html...');
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Charette System</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
      color: #333;
      text-align: center;
    }
    .container {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #1976d2;
      border-bottom: 2px solid #f0f0f0;
      padding-bottom: 10px;
    }
    .loading {
      display: inline-block;
      width: 50px;
      height: 50px;
      border: 3px solid rgba(25, 118, 210, 0.3);
      border-radius: 50%;
      border-top-color: #1976d2;
      animation: spin 1s ease-in-out infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <h1>Charette System</h1>
  
  <div class="container">
    <h2>Welcome to the Charette System</h2>
    <p>Collaborative facilitation platform for structured group discussions</p>
    <div class="loading"></div>
    <p>Loading application...</p>
  </div>
</body>
</html>`;

  fs.writeFileSync(indexHtmlPath, indexHtml);
}

// Create a 404.html that redirects to index.html
console.log('Creating 404.html...');
const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="0;url=/">
  <title>Redirecting...</title>
  <script>
    window.location.href = '/';
  </script>
</head>
<body>
  <p>Redirecting to homepage...</p>
</body>
</html>`;

fs.writeFileSync(notFoundHtmlPath, notFoundHtml);

console.log('Vercel build script completed successfully!');
