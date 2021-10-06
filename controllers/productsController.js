const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.getById(id);

  if (product.error) return next(product);

  res.status(200).json(product);
});

const getAll = rescue(async (_req, res, _next) => {
  const products = await productsService.getAll();

  res.status(200).json(products);
});

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  
  const newProduct = await productsService.create(name, quantity);
  if (newProduct.error) return next(newProduct);

  return res.status(201).json(newProduct);
});

const update = rescue(async (req, res, next) => {
  const { id } = req.params;
  
  const updatedProduct = await productsService.update(id);
  if (updatedProduct.error) return next(updatedProduct);

  return res.status(200).json(updatedProduct);
});
module.exports = {
  getAll,
  getById,
  create,
  update,
};