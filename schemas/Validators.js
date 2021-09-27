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

function genericValidator(data) {
  const { error } = Joi.object({
      productId: requireNonEmptyString.length(ID_LENGTH),
      quantity: quantityJoiValidation,
    }).validate(data);
    
    if (error) { return false; }

    return true;
}

function salesData(data) {
  const validated = data.every((sale) => genericValidator(sale));

  if (!validated) {
    return {
      error: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }

  return status;
}

module.exports = { productsData, salesData };
