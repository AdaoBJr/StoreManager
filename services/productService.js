const productModel = require('../models/productModel');

const verifyName = (name) => {
  if (name.length < 5) {
  const error = { err:
    { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };
      return error;
  }
  return true;
};

const verifyQuantity = (quantity) => {
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
};

const verifyNameExists = async (name) => {
const nameExists = await productModel.productExists(name);
console.log(nameExists);
  if (nameExists) {
  const error = { err:
    { code: 'invalid_data', message: 'Product already exists' } };
    return error;
  }
  return true;
};

const add = async ({ name, quantity }) => {
  const callVerifyName = verifyName(name);
  if (callVerifyName.err) return Promise.reject(callVerifyName);
  const callVerifyQuantity = verifyQuantity(quantity);
  if (callVerifyQuantity.err) return Promise.reject(callVerifyQuantity);
  const callverifyNameExists = await verifyNameExists(name);
  console.log(callverifyNameExists);
  if (callverifyNameExists.err) return Promise.reject(callverifyNameExists);

  const callModel = await productModel.add({ name, quantity });
  return callModel;
};

module.exports = { add };
