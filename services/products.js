const model = require('../models/products');

function nameValidation(name) {
  const error = new Error();
  error.status = 422;
  error.err = {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  };
  if (name.length < 5) throw error;
}

async function nameExists(name) {
  const product = await model.findByName(name);
  const error = new Error();
  error.status = 422;
  error.err = {
    code: 'invalid_data',
    message: 'Product already exists',
  };
  if (product) throw error;
}

function quantityValidation(quantity) {
  const error = new Error();
  error.status = 422;
  error.err = {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  };
  if (quantity < 1) throw error;
}

function quantityIsNumber(quantity) {
  const error = new Error();
  error.status = 422;
  error.err = {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  };
  if (typeof quantity !== 'number') throw error;
}

function productValidation(product) {
  const error = new Error();
  error.status = 422;
  error.err = {
    code: 'invalid_data',
    message: 'Wrong id format',
  };
  if (!product) throw error;
}

async function idValidation(id) {
  const product = await model.findById(id);
  const error = new Error();
  error.status = 422;
  error.err = {
    code: 'invalid_data',
    message: 'Wrong id format',
  };
  if (!product) throw error;
}

async function findById(id) {
  const result = await model.findById(id);
  console.log(result);
  productValidation(result);
  return result;
}

async function createProduct(name, quantity) {
  nameValidation(name);
  await nameExists(name);
  quantityValidation(quantity);
  quantityIsNumber(quantity);
  const result = await model.createProduct(name, quantity);
  return result;
}

async function fetchProducts() {
  const result = await model.fetchProducts();
  return { products: result };
}

async function updateProduct(id, name, quantity) {
  nameValidation(name);
  quantityValidation(quantity);
  quantityIsNumber(quantity);
  await model.updateProduct(id, name, quantity);
  return { _id: id, name, quantity };
}

module.exports = {
  findById,
  idValidation,
  createProduct,
  fetchProducts,
  updateProduct,
};
