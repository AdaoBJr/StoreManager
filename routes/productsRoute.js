const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require('../controllers/productsController');

const router = express.Router();

router.route('/')
  .post(createProduct)
  .get(getAllProducts);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct);

module.exports = router;
