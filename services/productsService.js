const productModel = require('../models/productsModel');

const validateNameService = (name) => {
  if (name.length < 5 || typeof (name) !== 'string') return false;
  return true;
};

const validateQuantityService = (quantity) => {
  if (quantity <= 0) return false;
  return true;
};

const validateNumberQuantityService = (quantity) => {
  if (typeof (quantity) !== 'number') return false;
  return true;
};

const validateExistanceService = async (name) => {
  const productsExists = await productModel.findProductByName(name);
  if (productsExists) return true;
  return false;
};

const createProductService = async ({ name, quantity }) => {
  const newProd = await productModel.createProduct({ name, quantity });

  return newProd;
};

module.exports = {
  validateNameService,
  validateQuantityService,
  validateNumberQuantityService,
  validateExistanceService,
  createProductService,
};