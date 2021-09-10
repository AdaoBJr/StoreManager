const {
  createSaleData,
  getAllSalesData,
  findById,
  updateSaleData,
  removeSaleData,
} = require('../models/saleModel');

const getAllSales = async () => {
  const sales = await getAllSalesData();
  return sales;
};
