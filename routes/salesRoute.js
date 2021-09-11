const express = require('express');
const { quantityValidations, idValidation } = require('../middlewares/salesValidations');
const {
  addSales,
  getAllSales,
  getSaleById,
  updateSale,
} = require('../controllers/salesController');

const router = express.Router();

router.route('/')
  .post(
    quantityValidations,
    addSales,
  )
  .get(getAllSales);

router.route('/:id')
    .get(
      idValidation,
      getSaleById,
    )
    .put(
      quantityValidations,
      updateSale,
    );

module.exports = router;