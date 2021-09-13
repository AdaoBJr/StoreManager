const { ObjectId } = require('mongodb');

const { findById } = require('../models/salesModel');

const validateQuanty = (quantity) => quantity < 1 || typeof quantity === 'string';

const verifyQuantity = (req, res, next) => {
  const itensSold = req.body;
  let nextStage = true;

  itensSold.forEach(({ quantity }) => {
    if (validateQuanty(quantity)) {
      nextStage = false;
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        },
      });
    }
  }); 

  if (nextStage) next();
};

const JsonErrorNotFound = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

const existsSale = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(404).json(JsonErrorNotFound);

  const { sale } = await findById({ id });
  if (!sale) return res.status(404).json(JsonErrorNotFound);
  
  next();
};

const JsonErrorIdWrong = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  },
};

const isCorrectId = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(422).json(JsonErrorIdWrong);

  next();
};

module.exports = {
  verifyQuantity,
  existsSale,
  isCorrectId,
};