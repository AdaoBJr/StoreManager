const { getAllSalesList, getSaleById } = require('../models/Sales');

const getSalesList = async () => {
  const allSales = await getAllSalesList();

  return allSales;
};

const saleById = async (id) => {
  const sale = await getSaleById(id);

  if (!sale) return null;

  return sale;
};

module.exports = {
  getSalesList,
  saleById,
};
