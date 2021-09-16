const { getAllSalesList, getSaleById, deleteSaleById } = require('../models/Sales');

const getSalesList = async () => {
  const allSales = await getAllSalesList();

  return allSales;
};

const saleById = async (id) => {
  const sale = await getSaleById(id);

  if (!sale) return null;

  return sale;
};

const delSaleById = async (id) => {
  const deletedeSale = await deleteSaleById(id);

  if (deletedeSale) {
    return deletedeSale;
  }

  return null;
};

module.exports = {
  getSalesList,
  saleById,
  delSaleById,
};
