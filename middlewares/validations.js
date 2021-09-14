const { ObjectId } = require('mongodb');

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

const isValidQuant = (quantity) => {
  const requiredQuantitySize = 0; 
  if (quantity <= requiredQuantitySize) {
    return { err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1' } }; 
  }

  if (typeof quantity !== 'number') {
    return { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  }
  return true;
};

const isValidQuantitySales = (quantity) => {
  const requiredQuantitySize = 0; 
  if (quantity <= requiredQuantitySize) {
    return { err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity' } }; 
  }

  if (typeof quantity !== 'number') {
    return { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }
  return true;
};

const isValidID = (id) => {
  if (!ObjectId.isValid(id)) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  return true;
};

const isValidIdForReqSix = (id) => {
  if (!ObjectId.isValid(id)) {
    return { err: { code: 'not_found', message: 'Sale not found' } };
  }
  return true;
};

module.exports = {
  isValidNameProduct,
  isValidQuant,
  isValidID,
  isValidQuantitySales,
  isValidIdForReqSix,
};