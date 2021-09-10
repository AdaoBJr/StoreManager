const { isProductValid, alreadyExists } = require('../validations/productValidations'); 
const { createProduct } = require('../models/productsModel');

const create = async (name, quantity) => {
  const validations = isProductValid(name, quantity);
  if (validations.message) return validations;

  const existenceValidation = alreadyExists(name);
  if (existenceValidation.message) return existenceValidation;

  const createdProd = await createProduct(name, quantity);
  return createdProd;
};

module.exports = { 
  create,
};
