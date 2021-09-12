const express = require('express');
const rescue = require('express-rescue');

const ProductsController = require('../controllers/ProductsController');

const ProductsRouter = express.Router();

ProductsRouter.post('/', rescue(ProductsController.createProduct));

module.exports = ProductsRouter;