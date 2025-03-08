const connection = require("../config/database");

// Create Payments Table if not exists
const createPaymentsTable = `
  CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

connection.query(createPaymentsTable, (err, results) => {
  if (err) {
    console.error("Error creating payments table:", err);
    return;
  }
  console.log("Payments table created or already exists");
});

module.exports = connection;
