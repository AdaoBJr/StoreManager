const express = require('express');
const Product = require('../controllers/products.controllers');

const products = express.Router();

products.post('/products', Product.create);
products.get('/products', Product.getAll);
products.get('/products/:id', Product.getProductById);
products.put('/products/:id', Product.update);

module.exports = products;
