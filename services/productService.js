const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

const lengthError = { err:
  { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };

const quantityLargerError = { err:
  { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };

const mustBeANumbererror = { err:
  { code: 'invalid_data', message: '"quantity" must be a number' } };

const productAlreadyExistsError = { err:
  { code: 'invalid_data', message: 'Product already exists' } };

  const formatError = { err:
    { code: 'invalid_data', message: 'Wrong id format' } };

const getById = (id) => {
  if (!ObjectId.isValid(id)) return formatError;
  return productModel.getById(id);
};

const add = async ({ name, quantity }) => {
  const nameExists = await productModel.productExists(name);
  if (nameExists) return productAlreadyExistsError;
  if (name.length < 5) return lengthError;
  if (quantity < 1) return quantityLargerError;
  if (typeof quantity !== 'number') return mustBeANumbererror;

  return productModel.add({ name, quantity });
};

const update = async ({ id, name, quantity }) => {
  const productExists = await productModel.getById(id);
  if (!productExists) return formatError;
  if (name.length < 5) return lengthError;
  if (quantity < 1) return quantityLargerError;
  if (typeof quantity !== 'number') return mustBeANumbererror;
  return productModel.update({ id, name, quantity });
};

const remove = async (id) => {
  const productExists = await productModel.getById(id);
  if (!productExists) return formatError;
  return productModel.remove(id);
};

module.exports = { add, getById, update, remove };
