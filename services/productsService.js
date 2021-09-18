const productsModel = require('../models/productsModel');
const validateCreate = require('../validations/products/validateCreate');

async function getAll() {
  const products = await productsModel.getAll();
  return products;
}

async function getById({ id }) {
  if (id.length < 24) return 'wrong id';

  const product = await productsModel.getById({ id });

  if (!product) return 'wrong id';
  
  return product;
}

async function create({ name, quantity }) {
  const validateName = await validateCreate.validateCreateName(name);
  if (validateName) return validateName;
  
  const validateQuantity = await validateCreate.validateCreateQuantity(quantity);
  if (validateQuantity) return validateQuantity;
  
  const createdProduct = await productsModel.create({ name, quantity });
  return createdProduct;
}

module.exports = {
  getAll,
  getById,
  create,
};