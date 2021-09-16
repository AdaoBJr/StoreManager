const model = require('../models/SalesModel');

const ErrorQuantity = {
  err: {
    message: 'Wrong product ID or invalid quantity',
    code: 'invalid_data',
  },
};

const createSales = async (arr) => {
  const verifyQuantity = arr.map(({ quantity }) => {
    if (typeof quantity !== 'number' || quantity <= 0) return false;
    return true;
  });

  const verifyQuantityValid = verifyQuantity.filter((sales) => sales === false);
  if (verifyQuantityValid.length > 0) return ErrorQuantity;

  const addSales = await model.createSales(arr);
  return addSales;
};

module.exports = {
  createSales,
};