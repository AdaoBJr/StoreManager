const SalesModel = require('../models/SalesModel');

const quantInvalidErr = {
  err: { 
    message: 'Wrong product ID or invalid quantity',
    code: 'invalid_data',
  },
};

const idNotExistsErr = {
  err: { 
    message: 'Sale not found',
    code: 'not_found',
  },
};

const getAll = async () => {
  const getAllSales = await SalesModel.getAll();

  return getAllSales;
};

const findById = async (id) => {
  const getSalesId = await SalesModel.findById(id);

  if (!getSalesId) return idNotExistsErr;

  return getSalesId;
};

const create = async (arr) => {
  // const { itensSold } = salesCreated;

  const salesQuantValid = arr.map(({ quantity }) => {
    if (typeof quantity !== 'number' || quantity <= 0) return false;

    return true;
  });

  const filterSalesValid = salesQuantValid.filter((sales) => sales === false);

  if (filterSalesValid.length > 0) {
    return quantInvalidErr;
  }

  const salesCreated = await SalesModel.create(arr);

  return salesCreated;
};

module.exports = {
  getAll,
  findById,
  create,
};