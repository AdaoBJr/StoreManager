const express = require('express');
const products = require('../controllers/Products');

const routes = express.Router();

routes.use('/products', products);

module.exports = routes;
