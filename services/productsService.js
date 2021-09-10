const productsModel = require('../models/productsModel');
const { isProductValid, checkId, productExists } = require('../middlewares/validations');

const createProduct = async (name, quantity) => {
  const isValid = isProductValid(name, quantity);
  if (isValid.message) return isValid;
  const exists = await productExists(name);
  if (exists.message) return exists;
  const newProduct = await productsModel.createProduct(name, quantity);
  return newProduct;
};

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  return allProducts;
};

const getProductById = async (id) => {
  const productId = await checkId(id);
  return productId;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};