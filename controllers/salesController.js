const express = require('express');
const rescue = require('express-rescue');
const validateSales = require('../middlewares/validateSales');

const { createServiceSales } = require('../services/salesService');
// const { validateProductInput } = require('../middlewares/validateProducts');

const routerSales = express.Router();

// const STATUS_CODE_OK = 200;
// const STATUS_CODE_CREATE = 201;

routerSales.post('/', validateSales, rescue(async (req, res, _next) => {
  const teste = req.body;
  const response = await createServiceSales(teste);

  const newSales = {
    _id: response.insertedId,
    itensSold: req.body,
  };

  return res.status(200).json(newSales);
}));

// routerSales.get('/:id', rescue(async (req, res, next) => {
//   const { id } = req.params;
//   const products = await filterById(id);
//   if (products.isError) {
//     return next(products);
//   }

//   return res.status(STATUS_CODE_OK).json({ products });
// }));

// routerSales.get('/', rescue(async (_req, res) => {
//   const products = await getAll();
//   return res.status(STATUS_CODE_OK).json({ products });
// }));

// routerSales.put('/:id', validateProductInput, rescue(async (req, res) => {
//   const { name, quantity } = req.body;
//   const { id } = req.params;
//   await update(id, name, quantity);
//   return res.status(STATUS_CODE_OK).json({ _id: id, name, quantity });
// }));

// routerSales.delete('/:id', rescue(async (req, res, next) => {
//   const { id } = req.params;
//   const products = await excludeService(id);

//   if (products.isError) {
//     return next(products);
//   }

//   return res.status(STATUS_CODE_OK).json(products);
// }));

// routerSales.use(validateProductInput);

module.exports = routerSales;
