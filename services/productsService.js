const productsModel = require('../models/productsModel');
const validateCreate = require('../validations/products/validateCreate');

async function create({ name, quantity }) {
  const validateName = await validateCreate.validateCreateName(name);
  if (validateName) return validateName;
  
  const validateQuantity = await validateCreate.validateCreateQuantity(quantity);
  if (validateQuantity) return validateQuantity;
  
  const createdProduct = await productsModel.create({ name, quantity });
  return createdProduct;
}

module.exports = {
  create,
};