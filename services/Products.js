const model = require('../models/Products');
const utils = require('../utils/productsValidations');

const createProduct = async ({ name, quantity }) => {
  utils.checkNameLength(name);
  utils.checkValidQuantity(quantity);
  await utils.findProductByName(name, model.findByName);
  const result = await model.createProduct({ name, quantity });
  return result;
};

const getAll = () => model.getAll();

const getById = async (id) => {
  const result = await model.getById(id);
  utils.checkProductId(result);
  return result;
};

const updateProduct = async (id, name, quantity) => {
  utils.checkNameLength(name);
  utils.checkValidQuantity(quantity);
  const result = await model.updateProduct(id, name, quantity);
  utils.checkProductId(result);
  return result;
};

const deleteProduct = async (id) => {
  const result = await model.deleteProduct(id);
  utils.checkProductId(result);
  return result;
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
