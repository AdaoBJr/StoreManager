const productModel = require('../models/productModel');

const lengthError = { err:
  { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };

const quantityLargerError = { err:
  { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };
const mustBeANumbererror = { err:
  { code: 'invalid_data', message: '"quantity" must be a number' } };

const productAlreadyExistsError = { err:
  { code: 'invalid_data', message: 'Product already exists' } };

/* const verifyName = (name) => {
  if (name.length < 5) return lengthError;
}; */

/* const verifyQuantity = (quantity) => {
  if (quantity < 1) {
  const error = { err:
    { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };
    return error;
  } if (typeof quantity !== 'number') {
    const error = { err:
      { code: 'invalid_data', message: '"quantity" must be a number' } };
      return error;
  }
  return true;
}; */

/* const verifyNameExists = async (name) => {
const nameExists = await productModel.productExists(name);
  if (nameExists) {
  const error = { err:
    { code: 'invalid_data', message: 'Product already exists' } };
    return error;
  }
  return true;
}; */

/* const verifyProductDoesntExist = async (id) => {
  const productExists = await productModel.getById(id);
    if (!productExists) {
    const error = { err:
      { code: 'invalid_data', message: 'Wrong id format' } };
      return error;
    }
    return true;
  }; */

const add = async ({ name, quantity }) => {
  const nameExists = await productModel.productExists(name);
  if (nameExists) return productAlreadyExistsError;
  if (name.length < 5) return lengthError;
  if (quantity < 1) return quantityLargerError;
  if (typeof quantity !== 'number') return mustBeANumbererror;
/*   const callVerifyName = await verifyName(name);
  if (callVerifyName.err) return Promise.reject(callVerifyName); */
/*   const callVerifyQuantity = await verifyQuantity(quantity);
  if (callVerifyQuantity.err) return Promise.reject(callVerifyQuantity);
  const callverifyNameExists = await verifyNameExists(name);
  if (callverifyNameExists.err) return Promise.reject(callverifyNameExists);
/*   const callverifyProductExists = await verifyProductDoesntExist(id);
  if (callverifyProductExists.err) return Promise.reject(callverifyProductExists); */

  return productModel.add({ name, quantity });
};

module.exports = { add };
