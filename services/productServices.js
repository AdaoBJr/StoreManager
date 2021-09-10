const productModels = require('../models/productModels');

const isValidNameProduct = (name) => {
  const requiredNameSize = 5;

  if (name.length < requiredNameSize) {
    return { err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long' },
    }; 
  }

  return true; 
};

const isValidQuantityProduct = (quantity) => {
  const requiredQuantitySize = 0; 

  if (quantity <= requiredQuantitySize) {
    return { err: {
      code: 'invalid_data',
      message: '"quantity" length must be larger than or equal to 1' },
    }; 
  }

  if (typeof Number(quantity) !== 'number') {
    return { err: {
      code: 'invalid_data',
      message: '"quantity" must be a number' },
    };
  }

  return true;
};

const createProduct = async (name, quantity) => {
  const isValidName = isValidNameProduct(name);
  const isValidQuantity = isValidQuantityProduct(quantity);

  if (isValidName.err) return isValidName;
  if (isValidQuantity.err) return isValidQuantity;

  const resultModel = await productModels.createProduct(name, quantity);
  return resultModel;
};

module.exports = {
  createProduct,
};