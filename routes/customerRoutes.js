const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController'); 

// Routes
router.get('/', customerController.getAllCustomers);
router.post('/', customerController.addCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;