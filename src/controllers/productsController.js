const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const productsService = require('../services/productsService');

const registerProduct = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await productsService.registerProduct(name, quantity);
  if (newProduct.error) return next(newProduct.error);
  res.status(StatusCodes.CREATED).json(newProduct);
});

module.exports = { registerProduct };
