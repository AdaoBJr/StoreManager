const {
  createSaleData,
  getAllSalesData,
  findById,
  updateSaleData,
  removeSaleData,
} = require('../models/saleModel');

const createSale = async (body) => {
  const sale = await createSaleData(body);
  return sale;
};

const getAllSales = async () => {
  const sales = await getAllSalesData();
  return sales;
};
