const express = require('express');
const { StatusCodes } = require('http-status-codes');
const productsService = require('../services/productsService');

const productsRouter = express.Router();

productsRouter.post('/', async (req, res) => {
  const { body } = req;
  const result = await productsService.createProduct(body);
  if (result.err) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result);
  }
  res.status(StatusCodes.CREATED).json(result);
});

module.exports = productsRouter;
