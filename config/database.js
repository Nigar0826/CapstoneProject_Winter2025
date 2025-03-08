// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '', 
//   database: 'biz_horizon'
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     process.exit(1); // Exit process if the database fails to connect
//   }
//   console.log('Connected to MySQL database');
// });

// module.exports = connection;



// Import the mysql2 package to enable database connections
require('dotenv').config({ path: './config/keys.env' }); // Ensure correct path to keys.env
const mysql = require("mysql2");

// Create a connection pool for efficient database connections
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "biz_horizon",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;