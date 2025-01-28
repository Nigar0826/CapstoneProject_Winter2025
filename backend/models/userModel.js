const connection = require('../config/database');

const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
  )
`;

connection.query(createUserTable, (err, results) => {
  if (err) {
    console.error('Error creating users table:', err);
    return;
  }
  console.log('Users table created or already exists');
});

module.exports = {
  create: (userData, callback) => {
    const { username, password, email } = userData;
    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    connection.query(query, [username, password, email], callback);
  },
};