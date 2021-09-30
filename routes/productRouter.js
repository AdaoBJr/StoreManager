const express = require('express');
const productController = require('../controllers/productController');
const nameValidation = require('../middleware/nameValidation');
const quantityValidation = require('../middleware/quantityValidation');

const router = express.Router();

router.post(
  '/',
  async (req, res, next) => nameValidation(req, res, next),
  quantityValidation,
  async (req, res) => productController.create(req, res),
);

module.exports = router;
