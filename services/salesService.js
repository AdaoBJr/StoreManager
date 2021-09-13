const salesModel = require('../models/salesModel');

const create = async (itensSold) => {
  const response = await salesModel.create(itensSold);

  return response;
};

module.exports = { create };