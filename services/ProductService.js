const ProductModel = require('../models/ProductModel');

const isValidName = (name) => {
  if (!name) return { code: 'invalid_data', message: 'name is required' };

  if (typeof name !== 'string') return { code: 'invalid_data', message: '"name" must be string' };

  if (name.length < 5) {
 return {
     code: 'invalid_data', message: '"name" length must be at least 5 characters long' }; 
}
  return true;
  };

const isValidQuantity = (quantity) => {
  if (!quantity) return { code: 'invalid_data', message: '"quantity" is required' };

  if (typeof quantity !== 'number') {
     return { code: 'invalid_data', message: '"quantity" must be a number' }; 
}
 
  if (quantity <= 0) {
 return {
     code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' }; 
}

  return true;
}; 

// const getAll = async () => {
  //   return await ProductModel.getAll();
// };

// const findById = async (id) => {
//   return await ProductModel.findById(id);
// };

const create = async (name, quantity) => {
  const productNameValid = isValidName(name);
  const productQuantityValid = isValidQuantity(quantity);
  if (productNameValid !== true) return productNameValid;
  if (productQuantityValid !== true) return productQuantityValid;

  const product = await ProductModel
    .create({ name, quantity });

  return {
    code: 201,
    product,
  };
};

// const update = async (id, name, quantity) => {
//   return await ProductModel.update(id, name, quantity);
// };

module.exports = {
  create,
  // getAll,
}; 