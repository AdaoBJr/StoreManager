const salesModel = require('../models/salesModel');

const create = async (itensSold) => {
  const id = await salesModel.create(itensSold);

  return id;
};

module.exports = { create };