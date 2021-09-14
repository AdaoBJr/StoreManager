const { newSale } = require('../models/salesModel');

const create = async (res) => {
  const sale = await newSale(res);
  return sale;
};

module.exports = { create };
