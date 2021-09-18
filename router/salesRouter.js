const express = require('express');
const salesController = require('../controller/salesController');

const router = express.Router();

router.get('/', salesController.getAllSales)
      .get('/:id', salesController.getSaleById)
      .post('/', salesController.createSale)
      .put('/:id', salesController.updateSale);

module.exports = router;
