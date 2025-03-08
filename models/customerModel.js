const connection = require('../config/database');

// SQL query to create the 'customers' table if it does not exist
const createCustomersTable = `
  CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL
  )
`;

connection.query(createCustomersTable, (err, results) => {
    if (err) {
      console.error('Error creating customers table:', err);
      return;
    }
    //console.log('Customers table created or already exists');
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

//  Add a new customer to the database
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

// Update an existing customer's information
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

// Delete a customer by ID
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