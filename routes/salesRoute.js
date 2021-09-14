const { Router } = require('express');

const { createSales, allSales, soldById } = require('../controllers/salesController');
const { ValidQuantity } = require('../middlewares/saleMiddlewares');

const routes = new Router();

routes.get('/sales/:id', soldById);
routes.post('/sales', ValidQuantity, createSales);
routes.get('/sales', allSales);

module.exports = routes;
