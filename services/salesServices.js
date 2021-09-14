const { newSale, allSolds, soldId, updateSold } = require('../models/salesModel');

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

const update = async ({ id, productId, quantity }) => {
  const updateSales = await updateSold({ id, productId, quantity });
  return updateSales;
};

module.exports = { create, getAll, IdSales, update };
