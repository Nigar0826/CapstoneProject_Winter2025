const connection = require('../config/database');

const createOrdersTable = `
  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES catalog(id)
  )
`;

connection.query(createOrdersTable, (err) => {
  if (err) {
    console.error('Error creating orders table:', err);
  } else {
    //console.log('Orders table created or already exists');
  }
});

module.exports = {
  getAll: (callback) => {
    const query = 'SELECT * FROM orders';
    connection.query(query, callback);
  },

  create: (order, callback) => {
    const query = 'INSERT INTO orders (customer_id, product_id, quantity) VALUES (?, ?, ?)';
    connection.query(query, [order.customer_id, order.product_id, order.quantity], callback);
  },

  update: (id, order, callback) => {
    const query = 'UPDATE orders SET customer_id = ?, product_id = ?, quantity = ? WHERE id = ?';
    connection.query(query, [order.customer_id, order.product_id, order.quantity, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM orders WHERE id = ?';
    connection.query(query, [id], callback);
  }
};
