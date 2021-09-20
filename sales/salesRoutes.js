const express = require('express');

const router = express.Router();

const salesController = require('./salesController');

router.route('/')
.get(salesController.getAllSales)
.post(salesController.validQuantity,
  salesController.createSale);

router.route('/:id')
  .get(salesController.getSaleById)
  .put(salesController.validQuantity,
    salesController.updateSale)
  .delete(salesController.deleteSale);

module.exports = router;
