const Joi = require('joi');
const models = require('../models/productModels');

function JoiSchema(product) {
  const schema = Joi.object({
    name: Joi.string()
        .min(5)
        .required(),

    quantity: Joi.number().min(1).strict().required(),
  });

  return schema.validate(product).error;
}

function formatMessage(message) {
  return {
    err: {
      code: 'invalid_data',
      message,
    },
  };
}

async function saveProduct(product) {
  const error = JoiSchema(product);
  if (error) {
    return formatMessage(error.details[0].message);
  }
  const exists = await models.findProduct(product);
  if (exists) {
    return formatMessage('Product already exists');
  }
  const item = await models.saveProduct(product);
  return item;
}

module.exports = {
  saveProduct,
};