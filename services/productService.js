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

async function saveProduct(product) {
  const error = JoiSchema(product);
  // console.log(error);
  if (error) {
    return {
      err: {
        code: 'invalid_data',
        message: error.details[0].message,
      },
    };
  }
  const item = await models.saveProduct(product);
  return item;
}

module.exports = {
  saveProduct,
};