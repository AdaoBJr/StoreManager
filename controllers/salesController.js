const express = require('express');

const router = express.Router();
const salesServices = require('../services/salesServices');
const salesModel = require('../models/salesModel');

const OK_STATUS = 200;
const UNPROCESSABLE_ENTITY_STATUS = 422;
const NOT_FOUND_STATUS = 404;

router.post('/', async (req, res) => {
  const products = req.body;
  const validatedProducts = await salesServices.validateProducts(products);
  if (validatedProducts.isJoi) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).send({ err:
      { code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity' } });
  }
  return res.status(OK_STATUS).send(validatedProducts);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const saleById = await salesModel.getById(id);
  if (saleById) {
    return res.status(OK_STATUS).json(saleById);
  }
  return res.status(NOT_FOUND_STATUS).json({ err:
    { code: 'not_found', message: 'Sale not found' } });
});

router.get('/', async (_req, res) => {
  const allSales = await salesServices.getAllSales();
  if (allSales) {
    return res.status(OK_STATUS).json({ sales: allSales });
  }
});

module.exports = router;
