const express = require('express');

const {
  createSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
} = require('../controllers/salesController');

const {
  validQntSale,
  validProductId,
  saleExists,
  validSaleId,
} = require('../middlewares/validations');

const router = express.Router();

router.route('/')
.post(
  validQntSale,
  validProductId,
  createSale,
)
.get(getAllSales);

router.route('/:id')
.get(
  saleExists,
  getSaleById,
)
.put(
  validQntSale,
  validProductId,
  updateSaleById,
)
.delete(
  validSaleId,
  saleExists,
  deleteSaleById,
);

module.exports = router;