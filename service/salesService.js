const SalesModel = require('../models/salesModel');

const saveSale = async (body) => {
  const savedsale = await SalesModel.saveSale(body);
  return savedsale;
};

module.exports = {
  saveSale,
};