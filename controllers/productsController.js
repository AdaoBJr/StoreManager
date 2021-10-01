const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!productsService.validateNameService(name)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  next();
};

const validateQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (!productsService.validateQuantityService(quantity)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }

  if (productsService.validateNumberQuantityService(quantity)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  next();
};

const validateExistance = async (req, res, next) => {
  const { name } = req.body;
  const productExists = await productsService.validateExistanceService(name);

  if (productExists) {
    return res.status(422).json({
      err: 'invalid_data',
      message: 'Product already exists',
    });
  }
  next();
};

const addNewProduct = (req, res) => {
  const { name, quantity } = req.body;
  productsService.createProductService({ name, quantity })
  .then((result) => res.status(201).json(result));
};

module.exports = {
  router,
  validateName,
  validateQuantity,
  validateExistance,
  addNewProduct,
};