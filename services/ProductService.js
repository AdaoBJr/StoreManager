const ProductModel = require('../models/ProductModel');

const CREATED = 201;

const nameRequired = {
  code: 'invalid_data',
  message: 'name is required',
};

const shortName = {
  code: 'invalid_data',
  message: '"name" length must be at least 5 characters long',
};

const lowQuantity = {
  code: 'invalid_data',
  message: '"quantity" must be larger than or equal to 1',
};

const quantityNotNumber = {
  code: 'invalid_data',
  message: '"quantity" must be a number',
};

const emptyQuantity = {
  code: 'invalid_data',
  message: '"quantity" is required',
};

const isValidName = (name) => {
  if (!name) return nameRequired;

  if (name.length < 5) {
 return shortName;
}
  return true;
  };

const isValidQuantity = (quantity) => {
  if (quantity < 1) {
    return lowQuantity;
}
  if (!quantity) return emptyQuantity;

  if (typeof quantity !== 'number') {
     return quantityNotNumber; 
}

  return true;
}; 

const create = async (name, quantity) => {
  const isProductNameValid = isValidName(name);
  const isQuantityValid = isValidQuantity(quantity);
  if (!isProductNameValid) return isProductNameValid;
  if (!isQuantityValid) return isQuantityValid;

  const searchProduct = await ProductModel.findByName(name);
  if (searchProduct) return { code: 'invalid_data', message: 'Product already exists' };

  const { id } = await ProductModel
    .create({ name, quantity });

  return {
    code: CREATED,
    id,
    name,
    quantity,
  };
};

module.exports = {
  create,
};  