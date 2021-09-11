const productsModel = require('../models/productsModel');

const createProduct = async ({ name, quantity }) => {
  const productExists = await productsModel.productExists(name);

  const ZERO = 0;
  const FIVE = 5;

  if (name.length < FIVE) {
    return { err: 'INVALID_LENGTH' };
  }
  if (quantity <= ZERO) {
    return { err: 'INVALID_QUANTITY' };
  }
  if (typeof quantity === 'string') {
    return { err: 'MUST_BE_NUMBER' };
  }
  if (productExists) return { err: 'ALREADY_EXIST' };

  return productsModel.createProduct({ name, quantity });
};

const getProducts = async (id) => {
  if (id) {
    return productsModel.getOne(id);
  }
  return productsModel.getAll();
};

const updateProduct = async ({ id, name, quantity }) => {
  const productExists = await productsModel.productExists(name);
  const ZERO = 0;
  const FIVE = 5;

  if (name.length < FIVE) {
    return { err: 'INVALID_LENGTH' };
  }
  if (quantity <= ZERO) {
    return { err: 'INVALID_QUANTITY' };
  }
  if (typeof quantity === 'string') {
    return { err: 'MUST_BE_NUMBER' };
  }
  if (productExists) return { err: 'ALREADY_EXIST' };

  return productsModel.updateProduct({ id, name, quantity });
};

const deleteProduct = async (id) => productsModel.deleteProduct(id);

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
