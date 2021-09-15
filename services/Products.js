const model = require('../models/Products');

const checkNameLength = (name) => {
  if (name.length < 5) {
    const error = new Error();
    error.statusCode = 'invalidName';
    throw error;
  }
};

const checkValidQuantity = (quantity) => {
  if (quantity < 1) {
    const error = new Error();
    error.statusCode = 'invalidQuantity';
    throw error;
  }

  if (typeof quantity !== 'number') {
    const error = new Error();
    error.statusCode = 'invalidQuantityType';
    throw error;
  }
};

const checkProductId = (productId) => {
  if (!productId) {
    const error = new Error();
    error.statusCode = 'invalidIdFormat';
    throw error;
  }
};

const findProductByName = async (name) => {
  const product = await model.findByName(name);
  if (product) {
    const error = new Error();
    error.statusCode = 'alreadyExists';
    throw error;
  }
};

const createProduct = async ({ name, quantity }) => {
  checkNameLength(name);
  checkValidQuantity(quantity);
  await findProductByName(name);
  const result = await model.createProduct({ name, quantity });
  return result;
};

const getAll = () => model.getAll();

const getById = async (id) => {
  const result = await model.getById(id);
  checkProductId(result);
  return result;
};

const updateProduct = async (id, name, quantity) => {
  checkNameLength(name);
  checkValidQuantity(quantity);
  const result = await model.updateProduct(id, name, quantity);
  checkProductId(result);
  return result;
};

const deleteProduct = async (id) => {
  const result = await model.deleteProduct(id);
  checkProductId(result);
  return result;
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
