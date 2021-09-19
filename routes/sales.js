const express = require('express');
const controllerSale = require('../controllers/sales');

const sales = express.Router();

sales.post('/sales', controllerSale.create);
sales.get('/sales', controllerSale.getAll);
sales.get('/sales/:id', controllerSale.getById);
sales.put('/sales/:id', controllerSale.update);
sales.delete('/sales/:id', controllerSale.exclude);

module.exports = sales;
