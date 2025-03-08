const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Sales summary route
router.get('/sales-summary', analyticsController.getSalesSummary);

module.exports = router;