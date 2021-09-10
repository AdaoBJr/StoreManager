const express = require('express');
const rescue = require('express-rescue');
const { saleValidate } = require('../middlewares');
const Sales = require('../services/Sales');
const { SUCCESS } = require('../utils/statusCode');

const sales = express.Router();

sales.get(
  '/',
  rescue(async (req, res) => {
    const saleList = await Sales.getAll();
    res.status(SUCCESS).json({ sales: saleList });
  }),
);

sales.get(
  '/:id',
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const sale = await Sales.findById(id);
    if (sale.isError) return next(sale);
    return res.status(SUCCESS).json(sale);
  }),
);

sales.use(saleValidate);

sales.post(
  '/',
  rescue(async (req, res, next) => {
    const sale = await Sales.create(req.body);
    if (sale.isError) return next(sale);
    return res.status(SUCCESS).json(sale);
  }),
);

module.exports = sales;
