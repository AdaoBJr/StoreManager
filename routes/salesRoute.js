const express = require('express');
const { addSales } = require('../controllers/salesController');
const { quantityValidations } = require('../middlewares/salesValidations');

const router = express.Router();

router.route('/')
  .post(
    quantityValidations,
    addSales,
  );

module.exports = router;