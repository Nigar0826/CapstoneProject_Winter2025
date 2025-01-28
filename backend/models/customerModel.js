const connection = require('../config/database');

const createCustomersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL
  )
`;

connection.query(createCustomersTable, (err, results) => {
    if (err) {
      console.error('Error creating users table:', err);
      return;
    }
    console.log('Users table created or already exists');
  });

// Functions to interact with the database
const getAllCustomers = (callback) => {
    connection.query('SELECT * FROM customers', (err, results) => {
        if (err) {
            console.error('Error fetching customers:', err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

const addCustomer = (customer, callback) => {
    const query = 'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)';
    connection.query(query, [customer.name, customer.email, customer.phone], (err, result) => {
        if (err) {
            console.error('Error adding customer:', err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const updateCustomer = (id, customer, callback) => {
    const query = 'UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?';
    connection.query(query, [customer.name, customer.email, customer.phone, id], (err, result) => {
        if (err) {
            console.error('Error updating customer:', err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const deleteCustomer = (id, callback) => {
    const query = 'DELETE FROM customers WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting customer:', err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

module.exports = {
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
};