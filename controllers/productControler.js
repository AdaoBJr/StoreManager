const express = require('express');
const rescue = require('express-rescue');
// dd

const { createService,
  getAll, filterById, update, excludeService } = require('../services/productService');
const { validateProductInput } = require('../middlewares/validateProducts');

const routerProducts = express.Router();

const STATUS_CODE_OK = 200;
const STATUS_CODE_CREATE = 201;

routerProducts.post('/', validateProductInput, rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  
  const product = await createService(name, quantity);

  if (product.isError) {
    return next(product);
  }
  
  const newProduct = {
    _id: product.insertedId,
    name,
    quantity,
  };
  
  return res.status(STATUS_CODE_CREATE).json(newProduct);
}));

routerProducts.get('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const products = await filterById(id);
  if (products.isError) {
    return next(products);
  }

  return res.status(STATUS_CODE_OK).json({ products });
}));

routerProducts.get('/', rescue(async (_req, res) => {
  const products = await getAll();
  return res.status(STATUS_CODE_OK).json({ products });
}));

routerProducts.put('/:id', validateProductInput, rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  await update(id, name, quantity);
  return res.status(STATUS_CODE_OK).json({ _id: id, name, quantity });
}));

routerProducts.delete('/:id', rescue(async (req, res, next) => {
  const { id } = req.params;
  const products = await excludeService(id);

  if (products.isError) {
    return next(products);
  }

  return res.status(STATUS_CODE_OK).json(products);
}));

// routerProducts.use(validateProductInput);

module.exports = routerProducts;
