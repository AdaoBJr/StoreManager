const express = require('express');
const {
  validateId,
  getById,
  validateName,
  validatePostQuantity,
  createProduct,
  getAll,
} = require('../controllers/products');

const route = express.Router();

route.get(
  '/:id',
  validateId,
  getById,
);

route.post(
  '/',
  validateName,
  validatePostQuantity,
  createProduct,
);

route.get(
  '/',
  getAll,
);

module.exports = route;
