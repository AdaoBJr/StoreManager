const express = require('express');
const {
  validateId,
  validateIdArray,
  validateIdOnDeletingSale,
  validateQuantityArray,
  createSales,
  getSaleById,
  getAllSales,
  editSale,
  deleteSale,
} = require('../controllers/sales');

const route = express.Router();

route.delete(
  '/:id',
  validateIdOnDeletingSale,
  deleteSale,
);

route.put(
  '/:id',
  validateId,
  validateQuantityArray,
  editSale,
);

route.get(
  '/:id',
  validateId,
  getSaleById,
);

route.get(
  '/',
  getAllSales,
);

route.post(
  '/',
  validateQuantityArray,
  validateIdArray,
  createSales,
);

module.exports = route;
