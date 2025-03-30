require('dotenv').config({ path: './config/keys.env' });
const mysql = require('mysql2');

// Create connection pool with DigitalOcean credentials
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db-mysql-tor1-64403-do-user-18816496-0.d.db.ondigitalocean.com',
  user: process.env.DB_USER || 'doadmin',
  password: process.env.DB_PASSWORD || 'AVNS_vX5LJKjLqokZO5eeGe6',
  database: process.env.DB_NAME || 'defaultdb',
  port: process.env.DB_PORT || 25060,
  ssl: {
    rejectUnauthorized: false, 
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
