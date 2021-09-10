const { Router } = require('express');
const { createSales, listAll, saleById, updateSale } = require('../controllers/vendas.controller');
const { isValidQuantity, isValidSale } = require('../middlewares/vendas.middlewares');

const routes = new Router();

routes.post('/sales', isValidQuantity, createSales);

routes.get('/sales', listAll);

routes.get('/sales/:id', isValidSale, saleById);

routes.put('/sales/:id',
isValidQuantity, updateSale);

module.exports = routes;
