// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const writeResponseToFile = require('./utils/writeResponse');

const app = express();
const PORT = 4000; // Choose a different port for your Node server

// Middleware
app.use(cors()); // Allow CORS from any origin
app.use(bodyParser.json()); // Parse JSON bodies

// Endpoint to write data to a JS file
app.post('/write', (req, res) => {
  const { data } = req.body;

  // Check if data is provided
  if (!data) {
    return res.status(400).json({ error: 'No data provided' });
  }

  // Call the function to write data to the JS file
  writeResponseToFile(data, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to write file' });
    }

    // Success response
    res.status(200).json({ message: 'File written successfully' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
