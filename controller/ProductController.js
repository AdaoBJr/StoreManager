const express = require('express');
const ProductService = require('../services/ProductService');

const ProductRouters = express.Router();

ProductRouters.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const insert = await ProductService.insert(name, quantity);

  if (insert.err) return res.status(422).json(insert);

  res.status(201).json(insert);
});

ProductRouters.get('/', async (_req, res) => {
  const products = await ProductService.getAllProduct();

  res.status(200).json(products);
});

ProductRouters.get('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await ProductService.getProductById(id);

  if (product.err) return res.status(422).json(product);

  res.status(200).json(product);
});

ProductRouters.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const insert = await ProductService.updateProduct(id, { name, quantity });

  if (insert.err) return res.status(422).json(insert);

  res.status(200).json(insert);
});

ProductRouters.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await ProductService.deleteProduct(id);

  if (product.err) return res.status(422).json(product);

  res.status(200).json(product);
});

module.exports = ProductRouters;
