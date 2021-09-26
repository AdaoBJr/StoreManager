const Joi = require('@hapi/joi');

function productsData(data) {
  const requireNonEmptyString = Joi.string().not().empty().required();

  const { error } = Joi.object({
    name: requireNonEmptyString.min(5).max(300),
    quantity: Joi.number().integer().positive().required(),
  }).messages({
    'number.positive': '"quantity" must be larger than or equal to 1',
  }).validate(data);

  if (error) return { error }; 

  const status = { isValid: true };

  return status;
}

module.exports = { productsData };
