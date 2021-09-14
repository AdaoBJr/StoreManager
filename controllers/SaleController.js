const rescue = require('express-rescue');
const SaleService = require('../services/SaleService');

const ProductService = require('../services/ProductService');

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const sale = await SaleService.findById(id);

  if (sale.err) return next(sale.err);

  res.status(200).json(sale);
});

const findAll = rescue(async (_req, res, _next) => {
  const sales = await SaleService.findAll();

  res.status(200).json({ sales });
});

const create = rescue(async (req, res, next) => {
  const sale = req.body;
  const saleAdd = await SaleService.create(sale);

  if (saleAdd.err) return next(saleAdd.err);

  const updatedSale = await ProductService.updateFromSale(sale);

  if (updatedSale.err) return next(updatedSale.err);

  return res.status(200).json(saleAdd);
});

const update = rescue(async (req, res, next) => {
  const sale = req.body;
  const { id } = req.params;
  const productUpdated = await SaleService.update(id, sale);

  if (productUpdated.err) return next(productUpdated.err);

  return res.status(200).json(productUpdated);
});

const exclude = rescue(async (req, res, next) => {
  const { id } = req.params;

  const sale = await SaleService.findById(id);

  if (!sale.err) {
    const updatedSale = await ProductService.updateFromSale(
      sale.itensSold,
      true,
    );
    if (updatedSale.err) return next(updatedSale.err);
  }

  const productExcluded = await SaleService.exclude(id);

  if (productExcluded.err) return next(productExcluded.err);

  return res.status(200).json(productExcluded);
});

module.exports = { findById, findAll, create, update, exclude };
