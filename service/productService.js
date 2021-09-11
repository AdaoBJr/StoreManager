const { ObjectId } = require('mongodb');
const productModel = require('../models/productsModel');

const isValidName = (name) => {
  const ifString = typeof name !== 'string';
  const lengthName = name.length <= 5;
  if (ifString || lengthName) {
    return false;
  }

  return true;
};

const isValidQuantityZero = (quantity) => {
    const moreZero = quantity > 0;    
    if (!moreZero) {
      return false;
    }
    return true;
  };

const isValidQuantityNotNumber = (quantity) => {
  const notNumber = typeof quantity === 'number';
  if (!notNumber) {
    return false;
  }
  return true;
};

const create = async ({ name, quantity }) => {
  const isProductNameValid = isValidName(name);
  const isProductQuantityValidZero = isValidQuantityZero(quantity);
  const isProductQuantityNotNumber = isValidQuantityNotNumber(quantity);
  const existingProduct = await productModel.findByName(name);
  if (!isProductNameValid) {
    return { code: 'invalid_data', message: '"name" length must be at least 5 characters long' }; 
  }
  if (!isProductQuantityNotNumber) {
    return { code: 'invalid_data', message: '"quantity" must be a number' }; 
  }
  if (!isProductQuantityValidZero) {
    return { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' };
  }
  if (existingProduct) { return { code: 'invalid_data', message: 'Product already exists' }; }
  const { id } = await productModel.create({ name, quantity });
  return { id, name, quantity };
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) { 
    return { code: 'invalid_data', message: 'Wrong id format' }; 
  }
  const productId = await productModel.getById(id);
  return productId;
};

const update = async ({ id, name, quantity }) => {
  const NameValid = isValidName(name);
  const QuantityValidZero = isValidQuantityZero(quantity);
  const QuantityNotNumber = isValidQuantityNotNumber(quantity);
  if (!NameValid) {
    return { code: 'invalid_data', message: '"name" length must be at least 5 characters long' }; 
  }
  if (!QuantityNotNumber) {
    return { code: 'invalid_data', message: '"quantity" must be a number' }; 
  }
  if (!QuantityValidZero) {
    return { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' };
  }
  const productUpdate = await productModel.update({ id, name, quantity });
  return productUpdate;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) { 
    return { code: 'invalid_data', message: 'Wrong id format' }; 
  }
  const excluded = await productModel.exclude(id);
  return excluded;
};

module.exports = {
  create,
  getById,
  update,
  exclude,
}; 