const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');

const validationName = (name) => {
  if (name.length < 5 || typeof (name) !== 'string') return false;

  return true;
};

const verifyExistanceProduct = async (name) => {
  const product = await productsModel.findProductByName(name);

  if (product) return true;

  return false;
};

const validationQuantity = (quantity) => {
  if (quantity <= 0) return false;

  return true;
};

const validationTypeQuantity = (quantity) => {
  if (typeof (quantity) !== 'number') return false;

  return true;
};

const createProduct = async ({ name, quantity }) => {
  const creatingProduct = await productsModel.createProductModel({ name, quantity });
  return creatingProduct;
};

const verifyId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  const products = await productsModel.getProductById(id);
  return products;
};

const getAllProducts = async () => {
  const products = await productsModel.getAll();
  console.log(products, 'cheguei no service');
  if (!products) {
    return null;
  }
  return products;
};

const verifyUpdateProduct = async (id, name, quantity) => {
  const updateProduct = await productsModel.updateProduct(id, name, quantity);
  return updateProduct;
};

module.exports = {
  validationName,
  verifyExistanceProduct,
  validationQuantity,
  validationTypeQuantity,
  createProduct,
  verifyId,
  getAllProducts,
  verifyUpdateProduct,
};