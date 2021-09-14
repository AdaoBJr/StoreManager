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
  const getIdProduct = await productModel.getById({ id });
  console.log(getIdProduct, 'produto que chega no service');
  if (!getIdProduct) {
    return false;
  }
  return getIdProduct;
};

module.exports = {
  getAllService,
  createService,
  getByIdService,
};