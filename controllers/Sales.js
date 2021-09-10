const express = require('express');
const rescue = require('express-rescue');
const { saleValidate } = require('../middlewares');
const Sales = require('../services/Sales');
const { SUCCESS } = require('../utils/statusCode');

const sales = express.Router();

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
