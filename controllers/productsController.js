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
      err: {
        code: 'invalid_data',
        message: 'Product already exists' }, 
    }); 
  }
  next();
};

const addNewProduct = (req, res) => {
  const { name, quantity } = req.body;
  productsService.createProductService({ name, quantity })
  .then((result) => res.status(201).json(result));
};

const getAll = (req, res) => {
  productsService.getAllService()
  .then((result) => res.status(200).json({ products: result }));
};

const getById = (req, res) => {
  const { id } = req.params;
  productsService.getByIdService(id)
  .then((result) => {
    if (result === null) {
      return res.status(422).json({
        err: {
          code: 'invalid_data', message: 'Wrong id format',
        },
      });
    }
  return res.status(200).json(result);
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  productsService.updateProdService(id, name, quantity)
  .then((result) => res.status(200).json(result));
};

const deleteIdProduct = async (req, res, next) => {
  const { id } = req.params;
  productsService.getByIdService(id)
  .then((result) => {
    if (!result) {
      return res.status(422).json({
        err: { code: 'invalid_data', message: 'Wrong id format',
        },
      });
    }
    return res.status(200).json(result);
  })
  .catch(() => res.status(422).json({
    err: { code: 'invalid_data', messae: 'Wrong id format',
    },
  }));
  next();
};

const deleteProduct = async (req, _res) => {
  const { id } = req.params;
  productsService.deleteProductService(id);
};

module.exports = {
  router,
  validateExistance,
  validateName,
  validateQuantity,
  addNewProduct,
  getAll,
  getById,
  updateProduct,
  deleteIdProduct,
  deleteProduct,
};