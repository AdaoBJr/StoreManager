const modelsProduct = require('../models/products');

const MIN_NAME_LENGTH = 5;

const isProductExists = async (name) => {
  const productExists = await modelsProduct.getByName(name);
  if (productExists) {
    return {
      code: 422,
      err: {
        code: 'invalid_data', message: 'Product already exists',
      },
    };
  }
  return true;
};

const isQuantityValid = (quantity) => {
  if (quantity < 1) {
    return {
      code: 422,
      err: {
        code: 'invalid_data', message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (typeof quantity !== 'number') {
    return {
      code: 422,
      err: {
        code: 'invalid_data', message: '"quantity" must be a number',
      },
    };
  }
  return true;
};

const isNameValid = (name) => {
  if (name.length < MIN_NAME_LENGTH) {
    return {
      code: 422,
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  return true;
};

const create = async ({ name, quantity }) => {
  const validationName = isNameValid(name);
  
  if (validationName.err) return validationName;
  const validationQuantity = isQuantityValid(quantity);
  
  if (validationQuantity.err) return validationQuantity;
  const productExists = await isProductExists(name);
  
  if (productExists.err) return productExists;
  const newProduct = await modelsProduct.create({ name, quantity });
  
  return { code: 201, newProduct };
};

module.exports = { create };
