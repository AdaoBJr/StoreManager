const salesModel = require('../models/salesModel');

const validateQuantity = (sales) => {
  const filteredSale = sales.filter((sale) => sale.quantity <= 0);
  return filteredSale;
};

const validateQuantityType = (sales) => {
  const typeSaleString = sales.filter((sale) => typeof (sale.quantity) !== 'number');
  return typeSaleString;
};

const registerSaleService = async (newSale) => {
  const registerNewSale = await salesModel.registerSale(newSale);
  return registerNewSale;
};

const getAllService = async () => {
  const allSales = await salesModel.getAll();
  return allSales;
};

const getByIdService = async (id) => {
  const productSale = await salesModel.getById(id);
  return productSale;
};

const updateSaleService = async (id, sale) => {
  const saleUpdate = await salesModel.updateSale(id, sale);
  return saleUpdate;
};

const deleteSaleService = async (id) => {
  const saleDelete = await salesModel.deleteSale(id);
  return saleDelete;
};

module.exports = {
  validateQuantity,
  validateQuantityType,
  registerSaleService,
  getAllService,
  getByIdService,
  updateSaleService,
  deleteSaleService,
};
