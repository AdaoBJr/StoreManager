const express = require('express');
const products = require('../controllers/products');

const route = express.Router();

route.use('/products', products);

module.exports = route;
