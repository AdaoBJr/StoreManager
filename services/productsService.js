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

async function isValidDifferentName(name) {
  const productName = await productsModel.getProductByName(name);

  if (productName) return false;
  
  return true;
}

async function isValidId(id) {
  const productId = await productsModel.getById(id);

  if (!productId) return false;

  return true;
}

async function create({ name, quantity }) {
  const product = await productsModel.create({ name, quantity });

  return product;
}

async function getAll() {
  const products = await productsModel.getAll();

  return products;
}

async function getById(id) {
  const product = await productsModel.getById(id);
  
  return product;
}

async function update(id, name, quantity) {
  const product = await productsModel.update(id, name, quantity);

  return product;
}

async function exclude(id) {
  const product = await productsModel.exclude(id);

  return product;
}

module.exports = {
  isValidName,
  isValidQuantity,
  isValidQuantityMin,
  isValidDifferentName,
  isValidId,
  create,
  getAll,
  getById,
  update,
  exclude,
};