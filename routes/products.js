const express = require('express');
const productsController = require('../controllers/products');

const route = express.Router();

route.get(
  '/:id',
  productsController.validateId,
  productsController.getById,
);

route.post(
  '/',
  productsController.validateName,
  productsController.createProduct,
);

route.get(
  '/',
  productsController.getAll,
);

module.exports = route;
