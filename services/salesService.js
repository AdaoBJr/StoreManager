const {
  createSaleData,
  getAllSalesData,
  findById,
  updateSaleData,
  removeSaleData,
} = require('../models/saleModel');

const { validateSaleQuantity, validateSaleId } = require('./validations');

const createSale = async (body) => {
  await validateSaleQuantity(body);
  const sale = await createSaleData(body);
  return sale;
};

const getAllSales = async () => {
  const sales = await getAllSalesData();
  return sales;
};

const findSaleById = async (id, meth) => {
  await validateSaleId(id, meth);
  const sale = await findById(id);
  return sale;
};

const updateSale = async (id, body) => {
  await validateSaleQuantity(body);
  const { productId, quantity } = body[0];
  const sale = await updateSaleData(id, productId, quantity);
  return sale;
};

const removeSale = async (id, meth) => {
  await validateSaleId(id, meth);
  const sale = await removeSaleData(id);
  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  findSaleById,
  updateSale,
  removeSale,
};
