 // const { validName, validNameExists, validQuantity } = require('../middleware/ValidProducts');
const ProductsModel = require('../models/ProductsModel');

const createProduct = async (name, quantity) => {
  const result = await ProductsModel.createProduct(name, quantity);
  return result;
};

const getProductsAll = async () => {
  const result = await ProductsModel.getProductsAll();
  return result;
};

const getProductsById = async (id) => {
  const result = await ProductsModel.getProductsById(id);
  if (!result) {
    return false;
  }
  return result;
};

module.exports = {
  createProduct,
  getProductsAll,
  getProductsById,
};