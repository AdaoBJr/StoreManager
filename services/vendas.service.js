const { newSales } = require('../models/vendas.model');

const criar = async (result) => {
  const newSale = await newSales(result);
  return newSale;
};

module.exports = { criar };
