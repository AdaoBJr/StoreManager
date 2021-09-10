const Joi = require('joi');
const productsModels = require('../models/productsModel');

const validateName = (name) => {
  const isValid = Joi.string().min(5)
  .validate(name);
  console.log(isValid.error);
  if (isValid.error) {
    return {
      err: { 
        message: 'Dados inválidos',
        code: '"name" lenght must be at least 5 characters long',
      },
    };
  }
  return false;
};

const validateQuantity = (quantity) => {
  const { error } = Joi.number().required().integer().min(1)
  .validate(quantity);
  if (error) {
    return { 
      err: { 
        message: 'Dados inválidos',
        code: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  return false;
};

const registerNewProduct = (newProduct) => {
  const { name, quantity } = newProduct;
  const nameNotValid = validateName(name);
  const quantityNotValid = validateQuantity(quantity);
    if (nameNotValid) return nameNotValid;
    if (quantityNotValid) return quantityNotValid;
  return productsModels.registerNewProduct(newProduct);
};

module.exports = {
  registerNewProduct,
};
