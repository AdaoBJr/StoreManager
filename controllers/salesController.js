const express = require('express');
const { StatusCodes } = require('http-status-codes');
const salesService = require('../services/salesService');

const salesRouter = express.Router();

salesRouter.post('/', async (req, res) => {
  const { body } = req;
  const result = await salesService.createSale(body);

  if (result.err) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result);
  }
  
  return res.status(StatusCodes.OK).json(result);
});

salesRouter.get('/', async (_req, res) => {
  const result = await salesService.getAllSales();
  return res.status(StatusCodes.OK).json(result);
});

module.exports = salesRouter;
