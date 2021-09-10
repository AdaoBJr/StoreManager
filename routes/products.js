const express = require('express');
const productsController = require('../controllers/products');

const route = express.Router();

route.get('/', productsController.getAll);

module.exports = route;
