const { Router } = require('express');
const { createSales } = require('../controllers/vendas.controller');
const { isValidQuantity } = require('../middlewares/vendas.middlewares');

const routes = new Router();

routes.post('/sales', isValidQuantity, createSales);

module.exports = routes;
