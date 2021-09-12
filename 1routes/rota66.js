const { Router } = require('express');
const { createproduct } = require('../2controllers/products_controllers');

const products = new Router();

products.post('/products', createproduct);

module.exports = products;