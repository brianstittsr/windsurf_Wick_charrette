// Minimal server for Vercel deployment
const express = require('express');
const path = require('path');

// Create Express app
const app = express();

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic API endpoint
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204); // No content
});

// Serve the minimal.html file for the root path
app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'public', 'minimal.html'));
  } catch (error) {
    // Fallback to inline HTML if file not found
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Charette System</title>
      <style>
        body {
          font-family: sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        h1 { color: #1976d2; }
        .container {
          border: 1px solid #ddd;
          padding: 20px;
          margin-top: 20px;
          border-radius: 8px;
        }
      </style>
    </head>
    <body>
      <h1>Charette System</h1>
      <div class="container">
        <h2>Welcome!</h2>
        <p>Server is running successfully.</p>
        <p>This is a minimal version of the Charette System.</p>
      </div>
    </body>
    </html>
    `;
    res.send(html);
  }
});

// Catch-all route
app.get('*', (req, res) => {
  res.redirect('/');
});

// Start server
const PORT = process.env.PORT || 3000;
module.exports = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
