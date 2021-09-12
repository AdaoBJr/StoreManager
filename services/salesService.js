const SalesModel = require('../models/salesModel');

const create = async ({ itensSold }) => {
  const { id } = await SalesModel.create({ itensSold });
  return { id };
};

module.exports = {
  create,
};