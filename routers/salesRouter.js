const express = require('express');

const router = express.Router();

const Sale = require('../controllers/saleController');
const validateSaleBody = require('../middlewares/validateSaleBody');
const validateSaleId = require('../middlewares/validateSaleId');
const validateDeleteSale = require('../middlewares/validateDeleteId');
const ValidateStock = require('../middlewares/validateStock');

router.get(
  '/sales',
  Sale.getAllSales,
);

router.get(
  '/sales/:id',
  validateSaleId,
  Sale.getSaleById,
);

router.post(
  '/sales',
  validateSaleBody,
  ValidateStock,
  Sale.insertSale,
);

router.put(
  '/sales/:id',
  validateSaleBody,
  Sale.updateSale,
);

router.delete(
  '/sales/:id',
  validateDeleteSale,
  Sale.deleteSale,
);

module.exports = router;
