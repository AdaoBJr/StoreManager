const { productExists } = require('../models/productsModel');

const nameLengthError = {
  err: { 
    code: 'invalid_data', 
    message: '"name" length must be at least 5 characters long', 
  } };

const quantityToSmallError = {
  err: { 
    code: 'invalid_data', 
    message: '"quantity" must be larger than or equal to 1' } };

const existentProductError = { 
  err: { 
    code: 'invalid_data', 
    message: 'Product already exists' } };

const quantittyMustBeNumber = {
  err: { 
    code: 'invalid_data', 
    message: '"quantity" must be a number' } };

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) return nameLengthError;
  if (name.length <= 0) return nameLengthError;
  if (name.length < 5) {
    return res.status(422).json(nameLengthError);
  }
  next();
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity < 1) {
    return res.status(422).json(quantityToSmallError);
  }

  if (typeof quantity !== 'number') {
    return res.status(422).json(quantittyMustBeNumber); 
  }
  next();
};

const verifyProductExistence = async (req, res, next) => {
  const { name } = req.body;
  const product = await productExists(name);
  if (product) return res.status(422).json(existentProductError);
  next();
};

module.exports = { nameValidation, quantityValidation, verifyProductExistence };
