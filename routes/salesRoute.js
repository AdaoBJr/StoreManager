const { Router } = require('express');

const { createSales, allSales, soldById, updateSale } = require('../controllers/salesController');
const { ValidQuantity, ValidQuantityToUpdate } = require('../middlewares/saleMiddlewares');

const routes = new Router();

routes.get('/sales/:id', soldById);
routes.put('/sales/:id', ValidQuantityToUpdate, updateSale);
routes.post('/sales', ValidQuantity, createSales);
routes.get('/sales', allSales);

module.exports = routes;
