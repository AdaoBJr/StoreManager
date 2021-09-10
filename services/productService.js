const { StatusCodes } = require('http-status-codes');
const productModel = require('../models/productModel');

const validateProduct = async ({ name, quantity }) => {
  const product = await productModel.create(name, quantity);
  if (product.name.length < 5) {
    return {
      code: StatusCodes.UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long',
    };
  }
  if (product.quantity <= 0) {
    return {
      code: StatusCodes.UNPROCESSABLE_ENTITY,
      message: '"quantity" must be larger than or equal to 1',
    };
  }
};

const newProduct = async ({ name, quantity }) => {
  const productExists = await productModel.productExists(name);
  if (productExists) { 
    return {
      code: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Product already exists',
    };
  }
  if (typeof quantity !== 'number') {
    return {
      code: StatusCodes.UNPROCESSABLE_ENTITY,
      message: '"quantity" must be a number',
    };
  }
};

const create = async ({ name, quantity }) => {
  await validateProduct({ name, quantity });
  await newProduct({ name, quantity });
};

module.exports = { create };