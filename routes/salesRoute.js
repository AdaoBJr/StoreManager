const express = require('express');
const { addSales, getAllSales, getSaleById } = require('../controllers/salesController');
const { quantityValidations, idValidation } = require('../middlewares/salesValidations');

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
    );

module.exports = router;