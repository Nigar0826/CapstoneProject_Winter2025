const catalogModel = require('../models/productModel');

exports.getCatalog = (req, res) => {
  catalogModel.getAll((err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching catalog', err });
    } else {
      res.status(200).send({ catalog: results });
    }
  });
};

// Add a new product to the catalog
exports.addProduct = (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newProduct = { name, price, description };

  catalogModel.create(newProduct, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error adding product', err });
    } else {
      res.status(201).send({ message: 'Product added successfully!', product: result });
    }
  });
};

// Update product details
exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  catalogModel.update(productId, { name, description, price }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error updating product", details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product updated successfully!" });
  });
};

// Delete product function
exports.deleteProduct = (req, res) => {
  const productId = req.params.id;

  catalogModel.delete(productId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting product', err });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully!' });
  });
};