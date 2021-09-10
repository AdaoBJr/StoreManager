const productsModel = require('../models/productsModel');
const { isProductValid } = require('../middlewares/validations');

const createProduct = async (name, quantity) => {
  const isValid = isProductValid(name, quantity);
  if (isValid.message) return isValid;
  const product = await productsModel.findByName(name);
  if (product) return { code: 422, message: 'Product already exists' }; // nao rolou no validation
  const newProduct = await productsModel.createProduct(name, quantity);
  return newProduct;
};

module.exports = {
  createProduct,
};