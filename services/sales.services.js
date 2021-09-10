const Sale = require('../models/sales.models');
const Validation = require('../schemas/sales.schemas');

const create = async (sales) => {
  const isValid = Validation.isQuantityValid(sales);
  if (isValid.err) return isValid;
  const newSale = await Sale.create(sales);
  return { code: 200, newSale };
};

module.exports = { create };
