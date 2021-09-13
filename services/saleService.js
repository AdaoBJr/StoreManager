const Model = require('../models/saleModel');

const getAllSales = async () => {
  const sales = await Model.getAllSales();

  return sales;
};

const getSaleById = async (id) => {
  const sale = await Model.getSaleById(id);

  return sale;
};

const insertSale = async (sale) => {
  const insertedSale = await Model.insertSale(sale);
  return insertedSale;
};

const updateSale = async (id, sale) => {
  const updatedSale = await Model.updateSale(id, sale);

  return updatedSale;
};

const deleteSale = async (id) => {
  const deletedSale = await Model.deleteSale(id);

  return deletedSale;
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
  updateSale,
  deleteSale,
};
