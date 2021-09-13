const express = require('express');

const router = express.Router();

const Product = require('../controllers/productController');
const validateProductBody = require('../middlewares/validateProductBody');
const validateProductId = require('../middlewares/validateProductId');

router.get(
  '/products',
  Product.getAllProducts,
);

router.get(
  '/products/:id',
  validateProductId,
  Product.getProductById,
);

router.post(
  '/products',
  validateProductBody,
  Product.insertProduct,
);

router.put(
  '/products/:id',
  validateProductBody,
  validateProductId,
  Product.updateProduct,
);

router.delete(
  '/products/:id',
  validateProductId,
  Product.deleteProduct,
);

module.exports = router;
