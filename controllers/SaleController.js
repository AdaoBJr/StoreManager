const rescue = require('express-rescue');
const SaleService = require('../services/SaleService');

// const ProductController = require('./ProductController');
const ProductModel = require('../models/ProductModel');

const create = rescue(async (req, res, next) => {
  const sale = req.body;
  const saleAdd = await SaleService.create(sale);

  if (saleAdd.err) return next(saleAdd.err);

  await ProductModel.updateFromSale(sale);

  return res.status(200).json(saleAdd);
});

const update = rescue(async (req, res, next) => {
  const sale = req.body;
  const { id } = req.params;
  const productUpdated = await SaleService.update(id, sale);

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

const exclude = rescue(async (req, res, next) => {
  const { id } = req.params;

  const productExcluded = await SaleService.exclude(id);

  if (productExcluded.err) return next(productExcluded.err);

  // const sale = await SaleService.findById(id);
  // await ProductModel.updateFromSale(sale, true);

  return res.status(200).json(productExcluded);
});

module.exports = { create, findAll, findById, update, exclude };
