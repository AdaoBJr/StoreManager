const SalesModel = require('../models/salesModel');

const saveSale = async (body) => {
  const savedsale = await SalesModel.saveSale(body);
  return savedsale;
};

const getSaleById = async (id) => {
  const getSale = await SalesModel.getSaleById(id);
  if (!getSale) {
    return {
      err: {
        code: 'NOT_FOUND',
        message: 'Sale not found',
      },
    };
  }
return getSale;
};
const getAll = async () => SalesModel.getAll();

const updateSale = async (id, body) => {
  const updateData = await SalesModel.updateSale(id, body);
  return updateData;
};

module.exports = {
  saveSale,
  getSaleById,
  getAll,
  updateSale,
};