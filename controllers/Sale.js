const rescue = require('express-rescue');
const service = require('../services/Sale');

const getAll = rescue(async (_req, res) => {
  const sales = await service.getAll();

  res.status(200).json(sales);
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const sale = await service.findById(id);

  if (sale.error) return next(sale.error);

  res.status(200).json(sale);
});

const create = rescue(async (req, res, next) => {
  const newSale = await service.create(req.body);

  if (newSale.error) return next(newSale.error);

  return res.status(200).json(newSale);
});

const update = rescue(async (req, res, next) => {
  const { id } = req.params;

  const updatedSale = await service.update(id, req.body);

  if (updatedSale.error) return next(updatedSale.error);

  return res.status(200).json(updatedSale);
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