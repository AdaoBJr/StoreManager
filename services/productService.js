const productModel = require('../models/productModel');

const getAllService = async () => {
  const allProducts = await productModel.getAll();
  return allProducts;
};

const createService = async ({ name, quantity }) => {
  const product = await productModel.create({ name, quantity });
  return product;
};

module.exports = {
  getAllService,
  createService,
};