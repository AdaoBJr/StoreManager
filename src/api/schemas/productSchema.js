const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required().error((errors) => {
    const editedErrors = errors.map((err) => {
      switch (err.type) {
        case 'any.required':
          return { ...err, message: 'O campo "name" é obrigatório' };
        case 'any.empty':
          return { ...err, message: 'O campo "name" é obrigatório' };
        case 'string.min':
          return {
            ...err,
            // `O "name" deve ter pelo menos ${err.context.limit} caracteres`
            message: '"name" length must be at least 5 characters long',
          };
        default:
          return { ...err };
      }
    });
    return editedErrors;
  }),
  quantity: Joi.number().greater(0).required().error((errors) => {
    const editedErrors = errors.map((err) => {
      switch (err.type) {
        case 'any.required':
          return { ...err, message: 'O campo "quantity" é obrigatório' };
        case 'any.empty':
          return { ...err, message: 'O campo "quantity" é obrigatório' };
        case 'number.greater':
          return { ...err, message: '"quantity" must be larger than or equal to 1' };
        case 'number.base':
          return { ...err, message: '"quantity" must be a number' };
        default:
          return { ...err };
      }
    });
    return editedErrors;
  }),
});

module.exports = productSchema;
