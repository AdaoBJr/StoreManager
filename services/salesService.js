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

module.exports = {
  validateQuantity,
  validateQuantityType,
  registerSaleService,
};
