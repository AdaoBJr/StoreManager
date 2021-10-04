const express = require('express');

const router = express.Router();
const productService = require('../services/productService');
const productModel = require('../models/productsModel');

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const UNPROCESSABLE_ENTITY_STATUS = 422;

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.validateProduct({ name, quantity });
  if (newProduct.isJoi) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).send({ err:
      { code: 'invalid_data',
        message: newProduct.details[0].message } });
  }
  if (newProduct.err) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).send(newProduct);
  }
  return res.status(CREATED_STATUS).json(newProduct);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const productById = await productModel.getById(id);
  if (productById) {
    return res.status(OK_STATUS).json(productById);
  }
  return res.status(UNPROCESSABLE_ENTITY_STATUS).json({ err:
    { code: 'invalid_data', message: 'Wrong id format' } });
});

router.get('/', async (_req, res) => {
  const allProducts = await productModel.getAll();
  if (allProducts) {
    return res.status(OK_STATUS).json({ products: allProducts });
  }
  return res.status(UNPROCESSABLE_ENTITY_STATUS).json({ err:
    { code: 'invalid_data', message: 'Wrong id format' } });
});

router.put('/:id', async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const productToUpdate = await productService.validateToUpdate({ name, quantity, id });
  if(productToUpdate.isJoi) {
    return res.status(UNPROCESSABLE_ENTITY_STATUS).send({ err:
      { code: 'invalid_data',
        message: productToUpdate.details[0].message } });
  }
  const productUpdated = await productModel.getById(id);
  return res.status(OK_STATUS).json(productUpdated);
});

module.exports = router;
