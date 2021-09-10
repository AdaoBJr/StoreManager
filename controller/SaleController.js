const express = require('express');
const SaleService = require('../services/SaleService');

const SalesRouter = express.Router();

SalesRouter.post('/', async (req, res) => {
  const saleInfo = req.body;

  const insert = await SaleService.insert(saleInfo);

  if (insert.err) {
    if (insert.err.code === 'stock_problem') return res.status(404).json(insert);
    return res.status(422).json(insert);
  }
  res.status(200).json(insert);
});

SalesRouter.get('/', async (_req, res) => {
  const products = await SaleService.getAllProduct();

  res.status(200).json(products);
});

SalesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await SaleService.getProductById(id);

  if (product.err) return res.status(404).json(product);

  res.status(200).json(product);
});

SalesRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const salesInfo = req.body;

  const insert = await SaleService.updateProduct(id, salesInfo);

  if (insert.err) return res.status(422).json(insert);

  res.status(200).json(insert);
});

SalesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await SaleService.deleteProduct(id);

  if (product.err) return res.status(422).json(product);

  res.status(200).json(product);
});

module.exports = SalesRouter;
