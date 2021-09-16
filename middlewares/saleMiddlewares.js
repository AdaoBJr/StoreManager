// const salesModel = require('../models/salesModel');

const { ObjectId } = require('mongodb');

const validateQuantity = (req, res, next) => {
  const sales = req.body;
  const invalidNumber = sales.filter((s) => s.quantity <= 0);
  const invalidString = sales.filter((s) => typeof s.quantity !== 'number');

  if (invalidNumber.length > 0 || invalidString.length > 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

const saleExists = (req, res, next) => {
  const { id } = req.params;
  
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  next();
};

module.exports = {
  validateQuantity,
  saleExists,
};