const SalesModel = require('../models/salesModel');

const create = async (productsArray) => {
  const result = await SalesModel.create(productsArray);
  return result;
};

module.exports = {
  create,
};
