const { validName, validNameExists, validQuantity } = require('../middleware/ValidProducts');
const ProductsModel = require('../models/ProductsModel');

const createProduct = async (name, quantity) => {
  validName(name);
  await validNameExists(name);
  validQuantity(quantity);
  const result = await ProductsModel.createProduct(name, quantity);
  return { status: 201, result };
};

module.exports = {
  createProduct,
};