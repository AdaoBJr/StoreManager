const express = require('express');

const {
  createSale,
  getAllSales,
  getSaleById,
  updateSaleById,
} = require('../controllers/salesController');

const {
  validQntSale,
  validProductId,
  saleExists, 
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
);

module.exports = router;