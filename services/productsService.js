const productsModel = require('../models/productsModels');

const create = async ({ name, quantity }) => {
  const response = await productsModel.create({ name, quantity });
  return response;
};

module.exports = { create };