const productsModel = require('../models/productsModel');

function isValidName(name) {
  if (name.length < 5 || typeof name !== 'string') return false;

  return true;
}

function isValidQuantity(quantity) {
  if (typeof quantity !== 'number') return false;
  return true;
}

function isValidQuantityMin(quantity) {
  if (Number(quantity) <= 0) return false;
  return true;
}

async function isValidNameDifferentName(name) {
  const productName = await productsModel.getProductByName(name);

  if (productName) return false;
  return true;
}

async function createProduct({ name, quantity }) {
  const product = await productsModel.createProduct({ name, quantity });

  return product;
}

module.exports = {
  createProduct,
  isValidName,
  isValidQuantity,
  isValidQuantityMin,
  isValidNameDifferentName,
};