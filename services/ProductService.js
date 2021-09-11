const ProductModel = require('../models/ProductModel');

const nameIsValid = (name) => {
  if (typeof name !== 'string' || name.length <= 5) return false;

  return true;
};

const quantityIsValid = (quantity) => {
  if (!Number.isInteger(quantity) || quantity <= 0) return false;

  return true;
};

const nameInvalid = {
  err: { 
    message: '"name" length must be at least 5 characters long',
    code: 'invalid_data',
  },
};

const quantNotNumber = {
  err: { 
    message: '"quantity" must be a number',
    code: 'invalid_data',
  },
};

const quantInvalid = {
  err: { 
    message: '"quantity" must be larger than or equal to 1',
    code: 'invalid_data',
  },
};

const nameNotUnique = {
  err: { 
    message: 'Product already exists',
    code: 'invalid_data',
  },
};

const idNotExistsErr = {
  err: { 
    message: 'Wrong id format',
    code: 'invalid_data',
  },
};

const getAll = async () => {
  const products = await ProductModel.getAll();

  return products;
};

const findById = async (id) => {
  const getProductId = await ProductModel.findById(id);

  if (!getProductId) return idNotExistsErr;

  return getProductId;
};

const create = async (name, quantity) => {
  const productNameValid = nameIsValid(name);
  const productQuantValid = quantityIsValid(quantity);  

  if (!productNameValid) {
    return nameInvalid;
  }

  if (typeof quantity !== 'number') {
    return quantNotNumber;
  }

  if (!productQuantValid) {
    return quantInvalid;
  }

  const isNotUnique = await ProductModel.findName(name);

  if (isNotUnique) {
    return nameNotUnique;
  }

  const productCreated = await ProductModel.create(name, quantity);

  return productCreated;
};

module.exports = {
  getAll,
  findById,
  create,
};