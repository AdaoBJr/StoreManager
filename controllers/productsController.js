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

productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getProductById(id);

  if (result.err) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result);
  }

  return res.status(StatusCodes.OK).json(result);
});

productsRouter.get('/', async (_req, res) => {
  const result = await productsService.getAllProducts();
  return res.status(StatusCodes.OK).json(result);
});

productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await productsService.excludeProductById(id);

  if (result.err) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result);
  }

  return res.status(StatusCodes.OK).json(result);
});

module.exports = productsRouter;
