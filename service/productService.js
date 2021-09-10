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
  const notNumber = typeof quantity !== 'number';
  if (notNumber) {
    return false;
  }
  return true;
};
  
const create = async (name, quantity) => {
  const isProductNameValid = isValidName(name);
  const isProductQuantityValidZero = isValidQuantityZero(quantity);
  const isProductQuantityNotNumber = isValidQuantityNotNumber(quantity);  
  if (!isProductNameValid) {
    return { code: 'invalid_data', message: '"name" length must be at least 5 caracters long' }; 
  }
  if (!isProductQuantityValidZero) {
    return { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' };
  }

  if (!isProductQuantityNotNumber) {
    return {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    }; 
  }

  const { id } = await productModel.create(name, quantity);
  return { id, name, quantity };
};

module.exports = {
  create,
  /* getAll */
}; 