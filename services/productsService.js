const Joi = require('joi');
const productsModels = require('../models/productsModel');

const validateName = (name) => {
  const isValid = Joi.string().min(5)
  .validate(name);
  console.log(isValid.error);
  if (isValid.error) {
    return {
      err: { 
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  return false;
};

const validateQuantity = (quantity) => {
  if (quantity < 1) {
    return { 
      err: { 
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  return false;
};

const isNumber = (quantity) => {
  console.log(typeof quantity === 'string');
  if (typeof quantity === 'string') {
    return { 
      err: { 
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return false;
};

const registerNewProduct = (newProduct) => {
  const { name, quantity } = newProduct;
  const quantityNotNumber = isNumber(quantity);
  const nameNotValid = validateName(name);
  const quantityNotValid = validateQuantity(quantity);

    if (nameNotValid) return nameNotValid;
    if (quantityNotNumber) return quantityNotNumber;
    if (quantityNotValid) return quantityNotValid;

  return productsModels.registerNewProduct(newProduct);
};

module.exports = {
  registerNewProduct,
};
