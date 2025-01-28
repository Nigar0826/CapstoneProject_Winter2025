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
  console.log('Catalog table created or already exists');
});

module.exports = {
  getAll: (callback) => {
    const query = 'SELECT * FROM catalog';
    connection.query(query, callback);
  },
};