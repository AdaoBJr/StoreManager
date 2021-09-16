const model = require('../models/SalesModel');

const ErrorQuantity = {
  err: {
    message: 'Wrong product ID or invalid quantity',
    code: 'invalid_data',
  },
};

const ErrorId = {
  err: { 
    message: 'Sale not found',
    code: 'not_found',
  },
};

const getAllSales = async () => {
  const sales = await model.getAllSales();
  return sales;
};

const findById = async (id) => {
  const saleId = await model.findById(id);
  if (!saleId) return ErrorId;
  return saleId;
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

const updateSales = async (id, arr) => {
  const verifyQuantity = arr.map(({ quantity }) => {
    if (typeof quantity !== 'number' || quantity <= 0) return false;
    return true;
  });

  const verifyQuantityValid = verifyQuantity.filter((sales) => sales === false);
  if (verifyQuantityValid.length > 0) return ErrorQuantity;

  const saleUpdate = await model.updateSales(id, arr);
  if (!saleUpdate) return ErrorId;
  return saleUpdate;
};

module.exports = {
  createSales,
  getAllSales,
  findById,
  updateSales,
};