const express = require('express');
const Product = require('../controllers/products.controllers');

const products = express.Router();

products.post('/products', Product.create);

module.exports = products;
