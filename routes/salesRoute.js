const express = require('express');
const {
  quantityValidations,
  existenceValidation,
  idValidation,
  stockVerification,
 } = require('../middlewares/salesValidations');
const {
  addSales,
  getAllSales,
  getSaleById,
  updateSale,
  removeSale,
} = require('../controllers/salesController');

const router = express.Router();

router.route('/')
  .post(
    quantityValidations,
    stockVerification,
    addSales,
  )
  .get(getAllSales);

router.route('/:id')
    .get(
      idValidation,
      existenceValidation,
      getSaleById,
    )
    .put(
      quantityValidations,
      updateSale,
    )
    .delete(
      idValidation,
      existenceValidation,
      removeSale,
    );

module.exports = router;