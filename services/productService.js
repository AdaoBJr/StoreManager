const {
  createProd,
  getAllProds,
  getProdById,
  deleteProduct,
  // getProdByName,
  updateProd,
} = require('../models/productModel');
const { validateProduct } = require('./validations');

const createProduct = async (name, quantity) => {
  await validateProduct(name, quantity);
  const product = await createProd(name, quantity);
  return product;
};

const getAllProducts = async () => {
  const response = await getAllProds();
  return response;
};

const getProductById = async (id) => {
  const response = await getProdById(id);
  return response;
};

const updateProduct = async (id, name, quantity) => {
  const product = await updateProd(id, name, quantity);
  return product;
};

const removeProduct = async (id) => {
  const product = await deleteProduct(id);
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  removeProduct,
};
