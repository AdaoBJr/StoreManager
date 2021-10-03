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
  .then((response) => res.status(200).json(response));
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

module.exports = {
  router,
  validateQuantity,
  registerSale,
  getAll,
  getById,
  updateSale,
};
