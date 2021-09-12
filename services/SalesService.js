const SalesModel = require('../models/SalesModel');

const isQuantValid = (arr) => {
  const arrValid = arr.map(({ quantity }) => {
    if (typeof quantity !== 'number' || quantity <= 0) return false;

    return true;
  });

  return arrValid;
};

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

const wrongIdErr = {
  err: { 
    message: 'Wrong sale ID format',
    code: 'invalid_data',
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
  const salesQuantValid = isQuantValid(arr);

  const filterSalesValid = salesQuantValid.filter((sales) => sales === false);

  if (filterSalesValid.length > 0) {
    return quantInvalidErr;
  }

  const salesCreated = await SalesModel.create(arr);

  return salesCreated;
};

const update = async (id, arr) => {
  const salesQuantValid = isQuantValid(arr);

  const filterSalesValid = salesQuantValid.filter((sales) => sales === false);

  if (filterSalesValid.length > 0) {
    return quantInvalidErr;
  }

  const updateSales = await SalesModel.update(id, arr);

  return updateSales;
};

const exclude = async (id) => {
  const deletedSales = await SalesModel.exclude(id);

  if (!deletedSales) return wrongIdErr;

  return deletedSales;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
};