const express = require('express');

const SalesRouter = express.Router();

const SalesController = require('../controllers/SalesController');

SalesRouter.post('/', SalesController.addSale);

SalesRouter.get('/', SalesController.getSale);
SalesRouter.get('/:id', SalesController.getSaleById);

module.exports = SalesRouter;