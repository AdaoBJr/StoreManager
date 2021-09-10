const Joi = require('joi');
const productsModels = require('../models/productsModel');

const validateName = (name) => {
  const { error } = Joi.string().required().min(5)
  .validate(name);
  console.log(error);
  if (error.message) {
    return { 
      err: { 
        message: 'Dados inválidos',
        code: '"name" lenght must be at least 5 characters long',
      },
    };
  }
};

const validateQuantity = (quantity) => {
  const { error } = Joi.number().required().integer().min(0)
  .validate(quantity);
  // console.log(error);
  if (error) {
    return { 
      err: { 
        message: 'Dados inválidos',
        code: '"quantity" must be larger than or equal to 1',
      },
    };
  }
};

const registerNewProduct = (newProduct) => {
  const { name, quantity } = newProduct;
    validateName(name);
    validateQuantity(quantity);
  return productsModels.registerNewProduct(newProduct);
};

module.exports = {
  registerNewProduct,
};
