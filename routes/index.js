const express = require('express');
const products = require('../controllers/controllerProducts');

const route = express.Router();

route.use('/products', products);

module.exports = route;
