const express = require('express');
const rescue = require('express-rescue');

const { createProduct, getAll } = require('../controllers/productController');

const productsRouter = express.Router();

productsRouter.get('/', rescue(getAll));
productsRouter.post('/', rescue(createProduct));

module.exports = productsRouter;
