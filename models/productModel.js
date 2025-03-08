const connection = require('../config/database');

const createCatalogTable = `
  CREATE TABLE IF NOT EXISTS catalog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
  )
`;

connection.query(createCatalogTable, (err, results) => {
  if (err) {
    console.error('Error creating catalog table:', err);
    return;
  }
  //console.log('Catalog table created or already exists');
});

module.exports = {
  getAll: (callback) => {
    const query = 'SELECT * FROM catalog';
    connection.query(query, callback);
  },

  // Add new product to the catalog
  create: (product, callback) => {
    const query = 'INSERT INTO catalog (name, description, price) VALUES (?, ?, ?)';
    connection.query(query, [product.name, product.description, product.price], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: result.insertId, ...product });
      }
    });
  },

  // Update product details
  update: (id, product, callback) => {
    const query = 'UPDATE catalog SET name = ?, description = ?, price = ? WHERE id = ?';
    connection.query(query, [product.name, product.description, product.price, id], callback);
  },

    // Delete a product
    delete: (id, callback) => {
      const query = 'DELETE FROM catalog WHERE id = ?';
      connection.query(query, [id], callback);
    }
  };





