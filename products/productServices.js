const model = require('./productModels');

const { validateNameLength, validateQuantity, validateProductId } = require('./validations');

const createProduct = async (name, quantity) => {
  const productExists = await model.productExists(name);

  if (productExists) return null;

  validateNameLength(name);
  validateQuantity(quantity);

  return model.createProduct(name, quantity);
};

const getProductById = async (id) => {
  const productById = await model.getProductById(id);

  validateProductId(id);

  return productById;
};

module.exports = {
  createProduct,
  getProductById,
};
