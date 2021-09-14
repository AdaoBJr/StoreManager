const { newSale, allSolds, soldId } = require('../models/salesModel');

const create = async (res) => {
  const sale = await newSale(res);
  return sale;
};

const getAll = async () => {
  const allSales = await allSolds();
  return allSales;
};

const IdSales = async (id) => {
  const sold = await soldId(id);
  return sold;
};

module.exports = { create, getAll, IdSales };
