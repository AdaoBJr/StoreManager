const { alreadyExists, invalidIdFormat } = require('../errors/errors');
const model = require('./productModels');

const { validateNameLength, validateQuantity, validateProductId } = require('./validations');

const createProduct = async (name, quantity) => {
  const productExists = await model.productExists(name);

  if (productExists) return null;

  validateNameLength(name);
  validateQuantity(quantity);

  return model.createProduct(name, quantity);
};

const updateProduct = async (id, name, quantity) => {
  const validatedId = await validateProductId(id);
  if (validatedId === null) {
    const error = new Error();
    error.err = { code: invalidIdFormat.code, message: invalidIdFormat.message };
    throw error;
  }
  validateNameLength(name);
  validateQuantity(quantity);
  const productExists = await model.productExists(name);
  if (productExists) {
    const error = new Error();
    error.err = { code: alreadyExists.code, message: alreadyExists.message };
    throw error;
  }

  return model.updateProduct(id, name, quantity);
};

const getProductById = async (id) => {
  const productById = await model.getProductById(id);

  validateProductId(id);

  return productById;
};

module.exports = {
  createProduct,
  updateProduct,
  getProductById,
};
