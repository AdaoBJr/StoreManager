const productsModel = require('../models/productsModel');

const createProduct = async ({ name, quantity }) => {
  const create = await productsModel.create({ name, quantity });
  return create;
};

module.exports = {
  createProduct,
};