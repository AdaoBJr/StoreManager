const express = require('express');

const {
  createSale,
  getAllSales,
  getSaleById,
} = require('../controllers/salesController');

const {
  validSale,
  saleExists, 
} = require('../middlewares/validations');

const router = express.Router();

router.route('/')
.post(
  validSale,
  createSale,
)
.get(getAllSales);

router.route('/:id')
.get(
  saleExists,
  getSaleById,
);

module.exports = router;