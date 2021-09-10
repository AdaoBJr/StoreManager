const express = require('express');
const Sale = require('../controllers/sales.controllers');

const sales = express.Router();

sales.post('/sales', Sale.create);/*
sales.get('/sales', Sale.getAll);
sales.get('/sales/:id', Sale.getSaleById);
sales.put('/sales/:id', Sale.update);
sales.delete('/sales/:id', Sale.removeSale); */

module.exports = sales;
