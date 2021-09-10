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

const findSaleById = async (id) => {
  const sale = await findById(id);
  return sale;
};

const updateSale = async (id, productId, quantity) => {
  const sale = await updateSaleData(id, productId, quantity);
  return sale;
};
