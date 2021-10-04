const Joi = require('joi');
const salesModel = require('../models/salesModel');

const MINIMUM_NAME_LENGTH = 5;
const MINUMUM_QUANTITY_VALUE = 1;

const schema = Joi.array().items({
  productId: Joi.string()
    .min(MINIMUM_NAME_LENGTH)
    .required(),
  quantity: Joi.number()
    .integer()
    .min(MINUMUM_QUANTITY_VALUE)
    .required(),
});

const validateProducts = async (products) => {
  try {
    const validatedProducts = await schema.validate(products);
    if (validatedProducts) {
      return await salesModel.insertProduct(validatedProducts);
    }
  } catch (err) {
    return err;
  }
};

const getAllSales = async () => {
  const allSales = await salesModel.getAll();
  return allSales;
};

const validateToUpdate = async (product, id) => {
  try {
    const validatedSale = await schema.validate(product);
    return salesModel.updateSale(validatedSale, id);
  } catch (err) {
    return err;
  }
};

module.exports = {
  validateProducts,
  getAllSales,
  validateToUpdate,
};
