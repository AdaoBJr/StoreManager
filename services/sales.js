const SalesModels = require('../models/sales');

const formatSales = (sales) => [{ itensSold: sales }];

const createSales = async (sales) => {
  const formatedSales = formatSales(sales);
  const insertedId = await SalesModels.createSales(formatedSales);
  return { _id: insertedId.insertedIds['0'], itensSold: sales };
};

const getById = async (id) => {
  const sale = await SalesModels.getById(id);
  return sale;
};

const getAllSales = async () => {
  const sales = await SalesModels.getAllSales();
  return sales;
};

module.exports = {
  createSales,
  getById,
  getAllSales,
};
