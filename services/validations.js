const ProducSchema = require('../schemas/ProductSchema');
const { ApiError } = require('../utils/ApiError');
const { getProdByName } = require('../models/productModel');

const validateProduct = async (name, quantity) => {
  const validations = await ProducSchema.validate(name, quantity);
  if (validations.message) {
    throw new ApiError(validations.message, 'invalid_data', validations.code);
  }
  const product = await getProdByName(name);
  if (product) {
    throw new ApiError('Product already exists', 'invalid_data', 422);
  }
};

module.exports = { validateProduct };
