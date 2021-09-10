const { newSales, listSales, listById, updateSale } = require('../models/vendas.model');

const criar = async (result) => {
  const newSale = await newSales(result);
  return newSale;
};

const getAll = async () => {
  const vendas = await listSales();
  return vendas;
};

const getById = async (id) => {
  const vendas = await listById(id);
  return vendas;
};

const update = async ({ id, productId, quantity }) => {
  const updateSales = await updateSale({ id, productId, quantity });
  return updateSales;
};

module.exports = { criar, getAll, getById, update };
