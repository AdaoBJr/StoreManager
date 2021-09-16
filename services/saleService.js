const salesModel = require('../models/salesModel');

const createSale = async (sales) => {
  const create = await salesModel.create(sales);
  return create;
};

module.exports = {
  createSale,
};