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
  console.log('service', addNewSale);
  return addNewSale;
};

module.exports = {
  verifyQuantities,
  verifyQuantitiesString,
  createSales,
};