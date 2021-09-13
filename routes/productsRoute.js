const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  removeProduct,
} = require('../controllers/productsController');

const router = express.Router();

router.route('/')
  .post(createProduct)
  .get(getAllProducts);

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(removeProduct);

module.exports = router;
