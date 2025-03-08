const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/productController');

// Get all products
router.get("/", catalogController.getCatalog);

// Add a new product
router.post("/", catalogController.addProduct);

// Update a product by ID
router.put("/:id", catalogController.updateProduct);

// Add delete product route
router.delete("/:id", catalogController.deleteProduct);

module.exports = router;
