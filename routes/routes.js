const { Router } = require('express');
const productController = require('../controllers/productController');

const router = Router();

router.post('/products',
  productController.isValidName,
  productController.isValidQuantity,
  productController.productsCreation);

  module.exports = {
    router,
  };
