const express = require('express');
const productController = require('../controllers/productController');
const nameValidation = require('../middleware/nameValidation');
const quantityValidation = require('../middleware/quantityValidation');

const router = express.Router();

router.post(
  '/',
  // eslint-disable-next-line no-return-await
  async (req, res, next) => await nameValidation(req, res, next),
  quantityValidation,
  // eslint-disable-next-line no-return-await
  async (req, res) => await productController.create(req, res),
);

module.exports = router;
