const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

// ADD
router.post('/', salesController.createSales);

module.exports = router;