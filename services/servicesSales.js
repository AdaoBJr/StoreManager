const { getId, createSales, getAll } = require('../models/salesModel');
const { errorSalesId } = require('../estruturaErro/estruturaErro');

const auxGetId = async (id) => {
  const result = await getId(id);
  if (!result) {
    return errorSalesId('Sale not found');
  }
  return result;
};

const insertSales = async (id) => {
  const result = await getId(id);
  if (result) {
    return null;
  } 
  const create = await createSales(id);
  return create;
};

module.exports = { auxGetId, insertSales, createSales, getAll };
