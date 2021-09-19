const express = require('express');
const controllerProduct = require('../controllers/products');

const products = express.Router();

products.post('/products', controllerProduct.create);
products.get('/products', controllerProduct.getAll);
products.get('/products/:id', controllerProduct.getById);
products.put('/products/:id', controllerProduct.update);

module.exports = products;