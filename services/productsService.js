const productsModel = require('../models/productsModel');
const validateCreate = require('../validations/products/validateCreate');
const validateUpdate = require('../validations/products/validateUpdate');

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

async function update({ id, name, quantity }) {
  if (id.length < 24) return 'wrong id';

  const validateName = await validateUpdate.validateUpdateName(name);
  if (validateName) return validateName;
  
  const validateQuantity = await validateUpdate.validateUpdateQuantity(quantity);
  if (validateQuantity) return validateQuantity;
  
  const updatedProduct = await productsModel.update({ id, name, quantity });
  return updatedProduct;
}

async function remove({ id }) {
  if (id.length < 24) return 'wrong id';

  const product = await productsModel.getById({ id });

  if (!product) return 'wrong id';

  await productsModel.remove({ id });
  
  return product;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};