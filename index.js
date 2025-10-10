// Simple entry point for Vercel
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
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
        </div>
      </body>
    </html>
  `);
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});

// Export for Vercel
module.exports = app;
