const express = require('express');
const Sale = require('../controllers/sales.controllers');

const sales = express.Router();

sales.post('/sales', Sale.create);

module.exports = sales;