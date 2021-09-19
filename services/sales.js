const modelSales = require('../models/sales');
const validate = require('../schemas/sales');

const create = async (sales) => {
  const isValid = validate.isQuantityValid(sales);
  if (isValid.err) return isValid;
  const newSale = await modelSales.create(sales);
  return { code: 200, newSale };
};

module.exports = { create };