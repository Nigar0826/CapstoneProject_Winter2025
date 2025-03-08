const customerModel = require('../models/customerModel'); 

// Get all customers
const getAllCustomers = (req, res) => {
    customerModel.getAllCustomers((err, customers) => {
        if (err) {
            res.status(500).send('Error fetching customers');
        } else {
            res.json(customers);
        }
    });
};

// Add a new customer
const addCustomer = (req, res) => {
    const { name, email, phone } = req.body;
    customerModel.addCustomer({ name, email, phone }, (err, result) => {
        if (err) {
            res.status(500).send('Error adding customer');
        } else {
            res.status(201).send('Customer added successfully');
        }
    });
};

// Update a customer
const updateCustomer = (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    customerModel.updateCustomer(id, { name, email, phone }, (err, result) => {
        if (err) {
            res.status(500).send('Error updating customer');
        } else {
            res.send('Customer updated successfully');
        }
    });
};

// Delete a customer
const deleteCustomer = (req, res) => {
    const { id } = req.params;
    customerModel.deleteCustomer(id, (err, result) => {
        if (err) {
            res.status(500).send('Error deleting customer');
        } else {
            res.send('Customer deleted successfully');
        }
    });
};

module.exports = {
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
};
