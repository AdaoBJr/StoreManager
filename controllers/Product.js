const rescue = require('express-rescue');
const service = require('../services/Product');

const getAll = rescue(async (_req, res) => {
  const products = await service.getAll();

  res.status(200).json(products);
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const product = await service.findById(id);

  if (product.error) return next(product.error);

  res.status(200).json(product);
});

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const newProduct = await service.create(name, quantity);

  if (newProduct.error) return next(newProduct.error);

  return res.status(201).json(newProduct);
});

const update = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await service.update(id, name, quantity);

  if (updatedProduct.error) return next(updatedProduct.error);

  return res.status(200).json(updatedProduct);
});

const remove = rescue(async (req, res, next) => {
  const { id } = req.params;

  const removedProduct = await service.remove(id);

  if (removedProduct.error) return next(removedProduct.error);

  return res.status(200).json(removedProduct);
});

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};