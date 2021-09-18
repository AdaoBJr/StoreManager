// const { default: rescue } = require('express-rescue');
const Products = require('../models/Products');
const { isNameValid,
  isQuantityValid,
  isQuantityValidTwo } = require('../schema/validations');

const create = async (name, quantity) => {
  const existingProduct = await Products.findByName(name);
  const validateName = isNameValid(name);
  const validateQuantity = isQuantityValid(quantity);
  const valivalidateQuantityTwo = isQuantityValidTwo(quantity);

  if (validateName.err) return validateName;
  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  if (validateQuantity.err) return validateQuantity;
  if (valivalidateQuantityTwo.err) return valivalidateQuantityTwo;

  return Products.create(name, quantity);
};

module.exports = {
  create,
};