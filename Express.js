const express = require('express');
const cors = require('cors');  // Import the CORS module

const app = express();
const port = 5500;

// Enable CORS for all routes
app.use(cors());

// Enable JSON parsing
app.use(express.json());

// Product Catalog endpoint (GET)
app.get('/api/catalog', (req, res) => {
  try {
    res.json(products);  // Send JSON response
  } catch (error) {
    console.error('Error fetching product catalog:', error);
    res.status(500).json({ message: 'Failed to load products. Try again later.' });
  }
});

// User registration endpoint (POST)
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  // Validate data and send a response
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Mock successful registration
  res.json({ success: true, message: 'User registered successfully' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
