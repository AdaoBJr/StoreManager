const { Router } = require('express');

const { createSales } = require('../controllers/salesController');
const { ValidQuantity } = require('../middlewares/saleMiddlewares');

const routes = new Router();

routes.post('/sales', ValidQuantity, createSales);

module.exports = routes;
