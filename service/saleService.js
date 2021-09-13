// const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

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

const create = async (productId, quantity) => {
    const isProductQuantityValidZero = isValidQuantityZero(quantity);
    // console.log(isProductQuantityValidZero, 'service');
    const isProductQuantityNotNumber = isValidQuantityNotNumber(quantity);
    // console.log(isProductQuantityNotNumber, 'service');
    if (!isProductQuantityNotNumber) {
      return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }; 
    }
    if (!isProductQuantityValidZero) {
      return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
    }
    const { id } = await salesModel.create({ productId, quantity });
    return { id, productId, quantity };
};

module.exports = { create };
