const { Router } = require('express');
const { createSales, listAll, saleById, updateSale } = require('../controllers/vendas.controller');
const { isValidQuantity, isValidQuantityUpdate,
  isValidSale } = require('../middlewares/vendas.middlewares');

const routes = new Router();

routes.get('/sales/:id', isValidSale, saleById);

routes.put('/sales/:id', isValidQuantityUpdate, updateSale);

routes.post('/sales', isValidQuantity, createSales);

routes.get('/sales', listAll);

module.exports = routes;
