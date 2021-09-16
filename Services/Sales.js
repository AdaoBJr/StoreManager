const { getAllSalesList, getSaleById, deleteSaleById, insertNewSales } = require('../models/Sales');

const createNewSales = async (products) => {  
  const insertedNewSales = await insertNewSales(products);

  return insertedNewSales;
};

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
  createNewSales,
};
