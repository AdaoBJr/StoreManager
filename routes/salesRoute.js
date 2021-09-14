const express = require('express');

const {
  addSales,
  getAllSales,
  getSaleById,
  updateSale,
  removeSale,
} = require('../controllers/salesController');

const router = express.Router();

router.route('/')
  .post(addSales)
  .get(getAllSales);

router.route('/:id')
  .get(getSaleById)
  .put(updateSale)
  .delete(removeSale);

module.exports = router;