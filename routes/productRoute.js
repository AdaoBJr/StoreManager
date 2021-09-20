const express = require('express');
const ProductController = require('../controllers/productController');

const route = express.Router();

route.post('/', ProductController.save);
route.get('/', ProductController.list);
route.get('/:id', ProductController.listById);
route.put('/:id', ProductController.edit);
route.delete('/:id', ProductController.remove);

module.exports = route;