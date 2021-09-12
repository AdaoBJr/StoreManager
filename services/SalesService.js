const SalesModel = require('../models/SalesModel');

const quantInvalidErr = {
  err: { 
    message: 'Wrong product ID or invalid quantity',
    code: 'invalid_data',
  },
};

const create = async (arr) => {
  const salesCreated = await SalesModel.create(arr);

  const { itensSold } = salesCreated;

  const salesQuantValid = itensSold.map(({ quantity }) => {
    if (typeof quantity !== 'number' || quantity <= 0) return false;

    return true;
  });

  const filterSalesValid = salesQuantValid.filter((sales) => sales === false);

  if (filterSalesValid.length > 0) {
    return quantInvalidErr;
  }

  return salesCreated;
};

module.exports = {
  create,
};