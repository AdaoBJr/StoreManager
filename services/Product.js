const model = require('../models/Product');
const validation = require('../validations/productsValidations');

const getAll = () => model.getAll();

const getById = async (id) => {
  const result = await model.getById(id);
  validation.checkProductId(result);
  return result;
};

const createProduct = async ({ name, quantity }) => {
  validation.checkNameLength(name);
  validation.checkValidQuantity(quantity);
  await validation.findProductByName(name, model.findByName);
  const result = await model.createProduct({ name, quantity });
  return result;
};

const updateProduct = async (id, name, quantity) => {
  validation.checkNameLength(name);
  validation.checkValidQuantity(quantity);
  const result = await model.updateProduct(id, name, quantity);
  validation.checkProductId(result);
  return result;
};

const deleteProduct = async (id) => {
  const result = await model.deleteProduct(id);
  validation.checkProductId(result);
  return result;
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
