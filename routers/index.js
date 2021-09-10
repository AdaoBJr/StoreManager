const express = require('express');
const rescue = require('express-rescue');

const {
  createProduct, getProducts, updateProduct, deleteProduct,
} = require('../controllers/productsController');
const {
  createSale, getSales,
} = require('../controllers/salesController');

// PRODUCTS ROUTERS
const productsRouter = express.Router();

productsRouter.get('/', rescue(getProducts));
productsRouter.get('/:id', rescue(getProducts));
productsRouter.post('/', rescue(createProduct));
productsRouter.put('/:id', rescue(updateProduct));
productsRouter.delete('/:id', rescue(deleteProduct));

// SALES ROUTERS
const salesRouter = express.Router();

salesRouter.get('/', rescue(getSales));
salesRouter.get('/:id', rescue(getSales));
salesRouter.post('/', rescue(createSale));

// rescue captura todos os erros e envia para o middlware de erros genéricos

module.exports = {
  productsRouter,
  salesRouter,
};