const salesModel = require('../models/salesModel');

const verifyQuantities = (sales) => { 
  const filtered = sales.filter((sale) => sale.quantity <= 0);

  return filtered;
};

const verifyQuantitiesString = (sales) => {
  const filtered = sales.filter((sale) => typeof (sale.quantity) !== 'number');
  return filtered;
};

const createSales = async (newSales) => {
  const addNewSale = await salesModel.createSale(newSales);
  
  return addNewSale;
};

const getAll = async () => {
  const allSales = await salesModel.getAll();
  return allSales;
};

const getById = async (id) => {
  const product = await salesModel.getById(id);
  return product;
};

module.exports = {
  verifyQuantities,
  verifyQuantitiesString,
  createSales,
  getAll,
  getById,
};
