const express = require('express');
const {
  validateId,
  getById,
  validateName,
  validateUniqueName,
  validatePostQuantity,
  createProduct,
  getAll,
  deleteById,
  editProduct,
} = require('../controllers/products');

const route = express.Router();

route.put(
  '/:id',
  validateId,
  validateName,
  validatePostQuantity,
  editProduct,
);

route.delete(
  '/:id',
  validateId,
  deleteById,
);

route.get(
  '/:id',
  validateId,
  getById,
);

route.post(
  '/',
  validateName,
  validateUniqueName,
  validatePostQuantity,
  createProduct,
);

route.get(
  '/',
  getAll,
);

module.exports = route;
