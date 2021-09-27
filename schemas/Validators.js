const Joi = require('@hapi/joi');

const quantityJoiValidation = Joi.number().integer().positive().required();
const requireNonEmptyString = Joi.string().not().empty().required();
const ID_LENGTH = '61510b2610153b46b4f11969'.length;
const status = { isValid: true };

function productsData(data) {
  const { error } = Joi.object({
    name: requireNonEmptyString.min(5).max(300),
    quantity: quantityJoiValidation,
  }).messages({
    'number.positive': '"quantity" must be larger than or equal to 1',
  }).validate(data);

  if (error) { return { error }; } 

  return status;
}

function salesData(data) {
  const { error } = Joi.object({
    productId: requireNonEmptyString.length(ID_LENGTH),
    quantity: quantityJoiValidation,
  }).messages({
    'string.length': 'Wrong product ID or invalid quantity',
    'number.positive': 'Wrong product ID or invalid quantity',
  }).validate(data);

  if (error) { return { error }; }

  return status;
}

module.exports = { productsData, salesData };
