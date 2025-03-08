const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Get all orders
router.get("/", orderController.getOrders);

// Add a new order
router.post("/", orderController.addOrder);

// Update an order by ID
router.put("/:id", orderController.updateOrder);

// Delete an order by ID
router.delete("/:id", orderController.deleteOrder);

module.exports = router;