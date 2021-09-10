const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const newProduct = await productsModel.createProduct(name, quantity);
  return newProduct;
};

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  return allProducts;
};

const getProductById = async (id) => {
  const product = await productsModel.getProductById(id);
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};