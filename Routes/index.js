const express = require('express');
const products = require('../controllers/Products');
const sales = require('../controllers/Sales');

const routes = express.Router();

routes.use('/products', products);
routes.use('/sales', sales);

module.exports = routes;
