const express = require('express');
const SalesServices = require('../services/salesServices');

const SalesRouter = express.Router();

SalesRouter.post('/', async (req, res) => {
  const salesInfo = req.body;

  const insert = await SalesServices.createSale(salesInfo);

  if (insert.err) {
    if (insert.err.code === 'stock_problem') return res.status(404).json(insert);
    return res.status(422).json(insert);
  }
  res.status(200).json(insert);
});

SalesRouter.get('/', async (req, res) => {
  const sales = await SalesServices.getAllSales();

  res.status(200).json(sales);
});

SalesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const saleId = await SalesServices.getSaleById(id);

  if (saleId.err) return res.status(404).json(saleId);

  res.status(200).json(saleId);
});

SalesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const salesInfo = req.body;

  const sale = await SalesServices.updateSale(id, salesInfo);

  if (sale.err) return res.status(422).json(sale);

  res.status(200).json(sale);
});

SalesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const sale = await SalesServices.deleteSale(id);

  if (sale.err) return res.status(422).json(sale);

  res.status(200).json(sale);
});

module.exports = SalesRouter;
