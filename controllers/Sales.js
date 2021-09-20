const express = require('express');
const rescue = require('express-rescue');

const Sales = require('../services/Sales');
const { saleValidate } = require('../middlewares');
const { SUCCESS } = require('../configs/statusCodes');

const sales = express.Router();

sales.post('/',
  saleValidate,
  rescue(async (req, res, next) => {
    const sale = await Sales.create(req.body);

    if (sale.isError) return next(sale);

    return res.status(SUCCESS).json(sale);
}));

sales.get('/',
  rescue(async (_req, res) => {
    const listSales = await Sales.getAll();
    
    res.status(SUCCESS).json({ sales: listSales });
}));

sales.get('/:id',
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const sale = await Sales.findById(id);

    if (sale.isError) return next(sale);

    return res.status(SUCCESS).json(sale);
}));

sales.put('/:id',
  saleValidate,
  rescue(async (req, res) => {
    const { id } = req.params;
    const sale = await Sales.update(id, req.body);

    return res.status(SUCCESS).json(sale);
}));

module.exports = sales;
