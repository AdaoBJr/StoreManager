const express = require('express');

const { 
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
} = require('../controllers/productsController');

const {
  validNameLength,
  validQntType,
  validQntValue,
  productExists,
  validId } = require('../middlewares/validations');

const router = express.Router();

router.route('/')
.post(
  validNameLength,
  validQntType,
  validQntValue,
  productExists,
  createProduct,
  )
.get(getAllProducts);

router.route('/:id')
.get(
  validId,
  getProductById,
  )
.put(
  validNameLength,
  validQntValue,
  validQntType,
  updateProductById,
);

module.exports = router;