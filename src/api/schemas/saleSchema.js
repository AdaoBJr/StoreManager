const Joi = require('joi');

const saleSchema = Joi.array().items({
  productId: Joi.string().required().error((errors) => {
    const editedErrors = errors.map((err) => {
      switch (err.type) {
        case 'any.required':
          return { ...err, message: 'Wrong product ID or invalid quantity' };
        case 'any.empty':
          return { ...err, message: 'Wrong product ID or invalid quantity' };
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
          return { ...err, message: 'Wrong product ID or invalid quantity' };
        case 'number.base':
          return { ...err, message: 'Wrong product ID or invalid quantity' };
        default:
          return { ...err };
      }
    });
    return editedErrors;
  }),
});

module.exports = saleSchema;
