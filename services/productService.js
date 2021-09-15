const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

const create = async ({ name, quantity }) => {
  const result = {
    err: {
      code: 'invalid_data',
    },
  };
  if (name.length < 5) {
    result.err.message = '"name" length must be at least 5 characters long';
    return result;
  }
  if (typeof quantity === 'string') {
    result.err.message = '"quantity" must be a number';
    return result;
  }
  if (quantity < 1) {
    result.err.message = '"quantity" must be larger than or equal to 1';
    return result;
  }
  return productModel.create({ name, quantity });
};

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  return productModel.getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
};
