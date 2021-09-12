const { nameValidation, quantityValidation } = require('../schemas');
const { errorBuilder } = require('./errorMiddleware');

const validateName = (req, _res, next) => {
  const { name } = req.body;
  const validatedName = nameValidation(name);
  next(errorBuilder(validatedName));
};

const validateQuantity = (req, _res, next) => {
  const { quantity } = req.body;
  const validatedQuantity = quantityValidation(quantity);
  next(errorBuilder(validatedQuantity));
};

module.exports = {
  validateName, 
  validateQuantity,
};