const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

const verifyTypeQuantity = (sales) => {
  console.log(sales, 'sales');
  const filteredSales = sales.filter((sale) => typeof (sale.quantity) !== 'number');
  
  console.log(filteredSales, 'filter');
  return filteredSales;
};

const verifyQuantity = (sales) => {
  const filteredSales = sales.filter((sale) => sale.quantity <= 0);

  console.log(filteredSales, 'filter2');

  return filteredSales;
};

const createSales = async (newSales) => {
  const sales = await salesModel.createSale(newSales);
  
  return sales;
};

const verifyAllSales = async () => {
  const allSales = await salesModel.getAll();
  console.log(allSales, 'service');

  if (!allSales) {
    return null;
  }
  return allSales;
};

const verifyId = async (id) => {
  const getId = salesModel.getById(id);
  console.log(getId, 'getId');
  if (!ObjectId.isValid(id)) {
    return false;
  }

  if (!getId) return null;
  console.log(getId, 'sale service');
  return getId;
};

const verifyUpdateSale = async (productId, itensSold) => {
  const updateSale = await salesModel.updateSale(productId, itensSold);
  return updateSale;
};

module.exports = {
  verifyTypeQuantity,
  verifyQuantity,
  createSales,
  verifyAllSales,
  verifyId,
  verifyUpdateSale,
};