const model = require('../models/ProductsModel');

const nameIsValid = (name) => {
  if (typeof name !== 'string' || name.length <= 5) return false;
  return true;
};

const quantityIsValidate = (quantity) => {
  if (quantity <= 0) return false;
  return true;
};

const nameInvalid = {
  err: { 
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
};

const quantityInvalid = {
  err: { 
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
};

const nameIsNotTheOnlyOne = {
  err: { 
    code: 'invalid_data',
    message: 'Product already exists',
  },
};

const quantityNotNumber = {
  err: { 
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
};

const createProducts = async (name, quantity) => {
  const nameValidate = nameIsValid(name);
  const quantityValidate = quantityIsValidate(quantity);

  if (!nameValidate) return nameInvalid;
  if (!quantityValidate) return quantityInvalid;
  if (typeof quantity !== 'number') return quantityNotNumber;

  const notTheOnlyOne = await model.findName(name);
  if (notTheOnlyOne) return nameIsNotTheOnlyOne;

  const productsCreate = await model.createProducts(name, quantity);
  return productsCreate;
};

module.exports = {
  createProducts,
};
