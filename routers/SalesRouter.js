const express = require('express');

const SalesRouter = express.Router();

const SalesController = require('../controllers/SalesController');

SalesRouter.post('/', SalesController.addSale);

module.exports = SalesRouter;