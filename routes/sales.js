const express = require('express');
const Sale = require('../controllers/sales');

const sales = express.Router();

sales.post('/sales', Sale.create);
sales.get('/sales', Sale.getAll);
sales.get('/sales/:id', Sale.getById);

module.exports = sales;