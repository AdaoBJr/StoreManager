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

module.exports = {
  saveSale,
  getSaleById,
  getAll,
};