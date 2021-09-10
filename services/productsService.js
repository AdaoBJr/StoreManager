const productsModel = require('../models/productsModels');

const create = async ({ name, quantity }) => {
  const result = await productsModel.create({ name, quantity });
  return result;
};

module.exports = { create };