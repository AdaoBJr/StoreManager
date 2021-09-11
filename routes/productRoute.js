const express = require('express');
const controllers = require('../controllers/productController');

const route = express.Router();

route.post('/', controllers.saveProduct);

module.exports = route;