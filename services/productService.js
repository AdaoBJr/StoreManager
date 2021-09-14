const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

const getAllService = async () => {
  const allProducts = await productModel.getAll();
  return allProducts;
};

const createService = async ({ name, quantity }) => {
  const product = await productModel.create({ name, quantity });
  return product;
};

const getByIdService = async (id) => {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  const getIdProduct = await productModel.getById({ id });
  if (!getIdProduct) {
    return false;
  }
  return getIdProduct;
};

const updateService = async ({ id, name, quantity }) => {
  const product = await productModel.update({ id, name, quantity });
  return product;
};

const deleteService = async ({ id }) => {
  const product = await productModel.deleteProduct({ id });
  return product;
};

module.exports = {
  getAllService,
  createService,
  getByIdService,
  updateService,
  deleteService,
};