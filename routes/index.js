const express = require('express');
const products = require('../controllers/controllerProducts');
const sales = require('../controllers/controllerSales');

const route = express.Router();

route.use('/products', products);
route.use('/sales', sales);

module.exports = route;
