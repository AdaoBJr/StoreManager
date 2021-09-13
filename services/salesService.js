const model = require('../models/salesModel');
const salesSchema = require('../schemas/SalesSchema');

const insertNewSale = async (itensSold) => {
  const validation = salesSchema.validation(itensSold);
  if (validation.err) return validation;
  const result = await model.insertNewSale(itensSold);
  return result;
};

module.exports = {
  insertNewSale,
};
