const productsModel = require('../models/productsModel');

const validationName = (name) => {
  if (name.length < 5 || typeof (name) !== 'string') return false;

  return true;
};

const verifyExistanceNameProduct = async (name) => {
  const products = await productsModel.findProductByName(name);

  if (products) return true;

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
  const productExists = await productsModel.findProductByName({ name });
  if (productExists) {
    return false;
  }

  const creatingProduct = await productsModel.createProductModel({ name, quantity });
  return creatingProduct;
};

const verifyId = async (id) => {
  const product = productsModel.getProductById(id);

  if (!product) {
    return null;
  }

  return product;
};

const getAllProducts = async () => {
  const products = productsModel.getAll();
  if (!products) {
    return null;
  }
  return products;
};

module.export = {
  validationName,
  validationQuantity,
  verifyExistanceNameProduct,
  createProduct,
  verifyId,
  getAllProducts,
  validationTypeQuantity,
};