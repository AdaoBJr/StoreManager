const express = require('express');
const controllerProduct = require('../controllers/products');

const products = express.Router();

products.post('/products', controllerProduct.create);

module.exports = products;