const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController'); 

// Routes
router.get('/customer', customerController.getAllCustomers);
router.post('/customer', customerController.addCustomer);
router.put('/customer/:id', customerController.updateCustomer);
router.delete('/customer/:id', customerController.deleteCustomer);

module.exports = router;