const express = require('express');
const productsRouter = require('../controllers/productController');

const routers = express.Router();

routers.use('/products', productsRouter);

module.exports = routers; 