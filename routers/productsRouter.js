const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');
const {
  checkQuantity,
  checkNameLength,
  checkProductExist,
} = require('../middlewares/productMiddleware');

router.delete('/:id', productsController.deleteProduct);

router.put(
  '/:id',
  checkNameLength,
  checkQuantity,
  productsController.updateProduct,
);

router.get('/:id', productsController.getProductById);

router.get('/', productsController.getProducts);

router.post(
  '/',
  checkNameLength,
  checkProductExist,
  checkQuantity,
  productsController.registerProduct,
);

module.exports = router;
