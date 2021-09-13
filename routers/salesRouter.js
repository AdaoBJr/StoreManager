const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

// ADD
router.post('/', salesController.createSales);

// READ
router.get('/', salesController.getAllSales);

// READ ID
router.get('/:id', salesController.getIdSale);

// UPDATE
router.put('/:id', salesController.updateSale);

module.exports = router;