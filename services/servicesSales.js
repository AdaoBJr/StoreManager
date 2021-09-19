const { getId, createSales, getAll, deleteVenda, atualizarVenda } = require('../models/salesModel');
const { errorSalesId, errorBusines } = require('../estruturaErro/estruturaErro');

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

const auxDeleteVenda = async (id) => {
  const result = await deleteVenda(id);
  if (!result) {
    return errorBusines('Wrong sale ID format');
  }
  return result;
};

const auxAtualizarVenda = async (id, sales) => {
  const result = atualizarVenda(id, sales);
  return result;
};

module.exports = { auxGetId, insertSales, createSales, getAll, auxDeleteVenda, auxAtualizarVenda };
