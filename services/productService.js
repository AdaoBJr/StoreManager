const productModel = require('../models/productModel');

const create = async (name, quantity) => {
  const { prod } = await productModel.create(name, quantity);
  return prod[0];
};

const hasProduct = async (name) => await productModel.getProductByName(name) !== null;

module.exports = {
  create,
  hasProduct,
};
