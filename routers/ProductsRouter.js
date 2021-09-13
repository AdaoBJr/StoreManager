const express = require('express');

const { validName, validNameExists, validQuantity } = require('../middleware/ValidProducts');

const ProductsController = require('../controllers/ProductsController');

const ProductsRouter = express.Router();

ProductsRouter.post('/', validName, validQuantity,
 validNameExists, ProductsController.createProduct);

ProductsRouter.get('/', ProductsController.getProductsAll);

module.exports = ProductsRouter;