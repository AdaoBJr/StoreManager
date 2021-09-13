const { Router } = require('express');
const {
  createproduct,
  showProducts,
  updateProducts,
  deleteProducts,
} = require('../2controllers/products_controllers');

const products = new Router();

products.post('/products', createproduct);
products.get('/products/:id', showProducts);
products.get('/products', showProducts);
products.put('/products/:id', updateProducts);
products.delete('/products/:id', deleteProducts);

module.exports = products;