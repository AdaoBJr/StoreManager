const express = require('express');

const router = express.Router();

const salesService = require('../services/salesService');

const validateQuantity = (req, res, next) => {
  const newSale = req.body;
  const invalidQuant = salesService.validateQuantity(newSale);
  const invalidNumber = salesService.validateQuantityType(newSale);
  if (invalidNumber.length !== 0 || invalidQuant.length !== 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

const registerSale = (req, res) => {
  const newSale = req.body;
  salesService.registerSaleService(newSale)
  .then((response) => {
    if (response === null) {
      return res.status(404).json({
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
      });
    }
    return res.status(200).json(response);
  });
};

const getAll = (req, res) => 
  salesService.getAllService()
  .then((result) => res.status(200).json({ sales: result }));

const getById = (req, res) => {
  const { id } = req.params;
  salesService.getByIdService(id)
  .then((result) => {
    if (result === null) {
      return res.status(404).json({
        err: { code: 'not_found', message: 'Sale not found' },
      });
    }
    return res.status(200).json(result);
  })
  .catch(() => res.status(404).json({
    err: { code: 'not_found', message: 'Sale not found' },
  }));
};

const updateSale = (req, res) => {
  const { id } = req.params;
  const saleDetails = req.body;
  salesService.updateSaleService(id, saleDetails)
  .then((result) => res.status(200).json(result));
};

const deleteSale = (req, res) => {
  const { id } = req.params;
  salesService.deleteSaleService(id)
  .then((result) => {
    if (result === null || result === undefined) {
      return res.status(422).json({
        err: { code: 'invalid_data', message: 'Wrong sale ID format',
        },
      });
    }
    res.status(200).json(result);
  })
  .catch(() => res.status(422).json({
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  }));
};

module.exports = {
  router,
  validateQuantity,
  registerSale,
  getAll,
  getById,
  updateSale,
  deleteSale,
};
