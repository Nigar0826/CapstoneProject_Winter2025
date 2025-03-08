const connection = require('../config/database');

// Create Users Table 
const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'user' -- Default role is 'user'
  )
`;

connection.query(createUserTable, (err) => {
  if (err) {
    console.error('Error creating users table:', err);
  } else {
    //console.log('Users table created or already exists');
  }
});

const User = {
  // Create a new user
  create: (userData, callback) => {
    const { username, password, email, role = 'user' } = userData;
    const query = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
    connection.query(query, [username, password, email, role], callback);
  },

  // Retrieve all users 
  getAll: (callback) => {
    const query = 'SELECT id, username, email FROM users';
    connection.query(query, callback);
  },

  // Update user details
  update: (id, user, callback) => {
    const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
    connection.query(query, [user.username, user.email, id], callback);
  },

  // Delete user by ID
delete: (id, callback) => {
  const query = 'DELETE FROM users WHERE id = ?';
  connection.query(query, [id], callback);
}

};

module.exports = User;