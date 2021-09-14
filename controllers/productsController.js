const express = require('express');
const { StatusCode } = require('http-status-codes');
const productsService = require('../services/productsService');

const productsRouter = express.Router();

productsRouter.post('', async (req, res) => {
  const { body } = req;
  const result = await productsService.createProduct(body);
  res.status(StatusCode.OK).json(result);
});

module.exports = productsRouter;
