const rescue = require('express-rescue');
const SaleService = require('../services/SaleService');

const create = rescue(async (req, res, next) => {
  const saleAdd = await SaleService.create(req.body);

  if (saleAdd.err) return next(saleAdd.err);
  
  return res.status(200).json(saleAdd);
});

const update = rescue(async (req, res, next) => {
  const { id } = req.params;
  const productUpdated = await SaleService.update(id, req.body);
  
  if (productUpdated.err) return next(productUpdated.err);

  return res.status(200).json(productUpdated);
});

const findAll = rescue(async (_req, res, _next) => {
  const sales = await SaleService.findAll();

  res.status(200).json({ sales });
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const sale = await SaleService.findById(id);

  if (sale.err) return next(sale.err);

  res.status(200).json(sale);
});

module.exports = { create, findAll, findById, update };
