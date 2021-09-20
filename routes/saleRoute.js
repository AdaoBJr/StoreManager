const express = require('express');
const saleController = require('../controllers/saleController');

const route = express.Router();

route.post('/', saleController.save);
route.get('/', saleController.list);
route.get('/:id', saleController.findById);
route.put('/:id', saleController.edit);

module.exports = route;