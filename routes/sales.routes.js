const { Router } = require('express');
const { createSales, listAll, saleById,
  updateSale, deleteSale } = require('../controllers/vendas.controller');
const { isValidQuantity, isValidQuantityUpdate,
  isValidId } = require('../middlewares/vendas.middlewares');

const routes = new Router();

routes.get('/sales/:id', saleById);

routes.delete('/sales/:id', isValidId, deleteSale);

routes.put('/sales/:id', isValidQuantityUpdate, updateSale);

routes.post('/sales', isValidQuantity, createSales);

routes.get('/sales', listAll);

module.exports = routes;
