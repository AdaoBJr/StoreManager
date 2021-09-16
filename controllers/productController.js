const express = require('express');

const productsRouter = express.Router();
const rescue = require('express-rescue');

const { checkName } = require('../services/productService');
const { validateProductInput } = require('../middlewares/errorProducts');

productsRouter.post('/', validateProductInput, rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  
  const product = await checkName(name, quantity);

  if (product.isError) {
    return next(product);
  }
  
  const newProduct = {
    _id: product.insertedId,
    name,
    quantity,
  };
  
  return res.status(201).json(newProduct);
}));

module.exports = productsRouter;