const productModel = require('../models/productModel');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);

  return product;
};

const insertProduct = async (name, quantity) => {
  const product = await productModel.insertProduct(name, quantity);

  return product;
};

const updateProduct = async (id, name, quantity) => {
  const product = await productModel.updateProduct(id, name, quantity);

  return product;
};

const deleteProduct = async (id) => {
  const product = await productModel.getProductById((id));

  await productModel.deleteProduct(id);

  return product;
};

module.exports = {
  insertProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
