const express = require('express');

const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
 } = require('./productController');

 router.route('/:id')
 .get(getProductById)
 .put(updateProduct)
 .delete(deleteProduct);

router.route('/')
  .get(getAllProducts)
  .post(createProduct);

module.exports = router;
