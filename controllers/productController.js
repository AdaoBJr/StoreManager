const express = require('express');
const productService = require('../services/productService');

const productRouter = express.Router();

productRouter.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const result = await productService.createProduct({ name, quantity });
  
  res
    .status(200)
    .json({ id: result.insertedId, name, quantity });
});

module.exports = {
  productRouter,
};
