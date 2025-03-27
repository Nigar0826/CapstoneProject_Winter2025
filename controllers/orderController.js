const orderModel = require('../models/orderModel');

exports.getOrders = (req, res) => {
  orderModel.getAll((err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching orders', err });
    } else {
      res.status(200).send({ orders: results });
    }
  });
};

exports.addOrder = (req, res) => {
  const { customer_id, product_id, quantity } = req.body;

  if (!customer_id || !product_id || !quantity) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newOrder = { customer_id, product_id, quantity };

  orderModel.create(newOrder, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error adding order', err });
    } else {
      res.status(201).send({ message: 'Order added successfully!', order: result });
    }
  });
};

exports.updateOrder = (req, res) => {
  const orderId = req.params.id;
  const { customer_id, product_id, quantity , status} = req.body;

  if (!customer_id || !product_id || !quantity || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  orderModel.update(orderId, { customer_id, product_id, quantity, status }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error updating order", details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order updated successfully!" });
  });
};

exports.deleteOrder = (req, res) => {
  const orderId = req.params.id;

  orderModel.delete(orderId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting order', err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully!' });
  });
};
