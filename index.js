const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs')

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'biz_horizon'
  });

  db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
  });
  
  app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    // Check if the user already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new user into the database
      db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });