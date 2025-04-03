const connection = require('../config/database');

exports.getSalesSummary = (req, res) => {
  const queries = {
    totalSales: 'SELECT SUM(price * quantity) AS total_sales FROM orders JOIN catalog ON orders.product_id = catalog.id',
    totalOrders: 'SELECT COUNT(*) AS total_orders FROM orders',
    salesByProduct: 'SELECT catalog.name, SUM(price * quantity) AS sales FROM orders JOIN catalog ON orders.product_id = catalog.id GROUP BY catalog.name',
    salesByCustomer: 'SELECT customers.name, SUM(price * quantity) AS sales FROM orders JOIN customers ON orders.customer_id = customers.id JOIN catalog ON orders.product_id = catalog.id GROUP BY customers.name',
    salesByMonth: "SELECT DATE_FORMAT(order_date, '%Y-%m') AS month, SUM(price * quantity) AS sales FROM orders JOIN catalog ON orders.product_id = catalog.id GROUP BY month ORDER BY month"
  };

  const results = {};
  const queryKeys = Object.keys(queries);
  let completedQueries = 0;

  queryKeys.forEach((key) => {
    connection.query(queries[key], (err, result) => {
      if (err) {
        console.error(`Error fetching ${key}:`, err);
        if (!res.headersSent) {
          res.status(500).send({ message: `Error fetching ${key}`, err });
        }
        return;
      }

      results[key] = result;
      completedQueries++;

      if (completedQueries === queryKeys.length) {
        res.status(200).json(results);
      }
    });
  });
};
