const express = require('express');
const productService = require('../services/productService');

const productRouter = express.Router();

productRouter.get('/', async (_req, res) => {
  const { status, messageResult } = await productService.getAllProducts();

  return res.status(status).json(messageResult);
});

productRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const { status, messageResult } = await productService.createProduct({ name, quantity });

  return res.status(status).json(messageResult);
});

productRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  const { status, messageResult } = await productService.getProductById(id);

  return res.status(status).json(messageResult);
});

module.exports = {
  productRouter,
};
