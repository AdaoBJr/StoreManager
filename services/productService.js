const Joi = require('joi');
const productModel = require('../models/productsModel');
const MINIMUM_NAME_LENGTH = 5;
const MINUMUM_QUANTITY_VALUE = 1;

const schema = Joi.object({
  name: Joi.string()
    .min(MINIMUM_NAME_LENGTH)
    .required(),
  quantity: Joi.number()
    .integer()
    .min(MINUMUM_QUANTITY_VALUE)
    .required(),
});

const validateProduct = async (product) => {
  const { name, quantity } = product;
  try {
    const value = await schema.validate({ name, quantity });
    const duplicateValidation = await productModel.getByName(name);
    if (duplicateValidation) {
      return { err:
        { code: 'invalid_data',
          message: 'Product already exists' }
      };
    }
    return productModel.insertProduct(value);
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = {
  validateProduct,
};
