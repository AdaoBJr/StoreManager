const express = require('express');
const ProductController = require('../controllers/productController');

const route = express.Router();

route.post('/', ProductController.saveProduct);
route.get('/', ProductController.listProducts);
route.get('/:id', ProductController.listProductById);
route.put('/:id', ProductController.editProduct);
route.delete('/:id', ProductController.removeProduct);

module.exports = route;