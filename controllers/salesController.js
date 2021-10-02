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

module.exports = {
  router,
  validateQuantity,
  registerSale,
};
