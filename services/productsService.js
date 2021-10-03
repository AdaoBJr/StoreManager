const productModel = require('../models/productsModel');

const validateNameService = (name) => {
  if (name.length < 5 || typeof (name) !== 'string') return false;
  return true;
};

const validateQuantityService = (quantity) => {
  if (quantity <= 0) return false;
  return true;
};

const validateNumberQuantityService = (quantity) => {
  if (typeof (quantity) !== 'number') return true;
  return false;
};

const validateExistanceService = async (name) => {
  const productExists = await productModel.findProductByName(name);
  if (productExists) return true;
  return false;
};

const createProductService = async ({ name, quantity }) => {
  const newProd = await productModel.createProduct({ name, quantity });
  return newProd;
};

const getAllService = async () => {
  const all = await productModel.getAll();
  return all;
};

const getByIdService = async (id) => {
  const product = await productModel.getById(id);
  return product;
};

const updateProdService = async (id, name, quantity) => {
  const update = await productModel.updateProduct(id, name, quantity);
  return update;
};

const deleteProductService = async (id) => {
  const deleteProd = await productModel.deleteProduct(id);
  return deleteProd;
};

module.exports = {
  validateNameService,
  validateQuantityService,
  validateNumberQuantityService,
  validateExistanceService,
  createProductService,
  getAllService,
  getByIdService,
  updateProdService,
  deleteProductService,
};