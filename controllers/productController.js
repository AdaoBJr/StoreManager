const express = require('express');

const productsRouter = express.Router();

const { checkName } = require('../services/productService');
const errorProducts = require('../middlewares/errorProducts');

productsRouter.post('/', errorProducts, async (req, res, next) => {
  const { name, quantity } = req.body;
  const statusProduct = await checkName(name, quantity);

  if (statusProduct.isError) {
    return next(statusProduct);
  }

  const productRegistered = {
    _id: statusProduct.insertedId,
    name,
    quantity,
  };

 return res.status(201).json(productRegistered);
});

module.exports = productsRouter;