const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const { validNameQuantity } = require('../middleware/ValidProducts');

const ProductsRouter = express.Router();

ProductsRouter.post('/', validNameQuantity, ProductsController.createProduct);

module.exports = ProductsRouter;