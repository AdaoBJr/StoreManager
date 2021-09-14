const salesModel = require('../models/salesModel');
// const productsModel = require('../models/productsModel');

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

module.exports = {
  verifyTypeQuantity,
  verifyQuantity,
  createSales,
};