const { createProduct, findById, updateProduct } = require('../models/productsModel');
const {
  isProductValid,
  alreadyExists,
  idValidation,
} = require('../validations/productsValidations'); 

const create = async (name, quantity) => {
  const validations = isProductValid(name, quantity);
  if (validations.message) return validations;

  const existenceValidation = await alreadyExists(name);
  if (existenceValidation.message) return existenceValidation;

  const createdProd = await createProduct(name, quantity);
  return createdProd;
};

const getById = async (id) => {
  const validation = await idValidation(id);
  if (validation.message) return validation;

  const result = findById(id);
  return result;
};

const update = async (id, name, quantity) => {
  const validation = isProductValid(name, quantity);
  if (validation.message) return validation;
  
  await updateProduct(id, name, quantity);
  return { _id: id, name, quantity };
};

module.exports = { 
  create,
  getById,
  update,
};
