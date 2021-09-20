const Sales = require('../models/Sales');
const { isSalesQuantityValid } = require('../schema/validations');

const createSale = async (itensSold) => {
  const validateQuantity = isSalesQuantityValid(itensSold);
  if (validateQuantity.err) return validateQuantity;

  const newSale = await Sales.createSale(itensSold);

  return newSale;
};

module.exports = {
  createSale,
};