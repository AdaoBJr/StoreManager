const express = require('express');
const rescue = require('express-rescue');
const validateSales = require('../middlewares/validateSales');

const { createServiceSales,
  update, excludeService, getAll, getById } = require('../services/salesService');
// const { validateProductInput } = require('../middlewares/validateProducts');

const routerSales = express.Router();

// const STATUS_CODE_OK = 200;
// const STATUS_CODE_CREATE = 201;

routerSales.post('/', validateSales, rescue(async (req, res, next) => {
  const response = await createServiceSales(req.body);

  if (response.isError) return next(response);

  const newSales = {
    _id: response.insertedId,
    itensSold: req.body,
  };

  return res.status(200).json(newSales);
}));

routerSales.get(
  '/:id',
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const sale = await getById(id);
    if (sale.isError) return next(sale);
    return res.status(200).json(sale);
  }),
);
routerSales.get(
  '/',
  rescue(async (_req, res) => {
    const saleList = await getAll();
    res.status(200).json({ sales: saleList });
  }),
);

routerSales.put(
  '/:id', validateSales,
  rescue(async (req, res) => {
    const { id } = req.params;
    const salesList = await update(id, req.body);
    return res.status(200).json(salesList);
  }),
);

routerSales.delete('/:id',
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const sale = await excludeService(id);
    if (sale.isError) return next(sale);
    return res.status(200).json(sale);
  }));

module.exports = routerSales;
