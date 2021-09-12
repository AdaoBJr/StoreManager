const { Router } = require('express');
const { createproduct, showProducts } = require('../2controllers/products_controllers');

const products = new Router();

products.post('/products', createproduct);
products.get('/products/:id', showProducts);
products.get('/products', showProducts);

module.exports = products;