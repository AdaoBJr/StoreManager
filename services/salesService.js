const model = require('../models/salesModel');
const salesSchema = require('../schemas/SalesSchema');

const insertNewSale = async (itensSold) => {
  const validation = salesSchema.validation(itensSold);
  if (validation.err) return validation;
  const result = await model.insertNewSale(itensSold);
  return result;
};

const getAllSales = () => model.getAllSales();

const getSaleById = async (id) => {
  const validate = await salesSchema.validateIdAndQty(id);
  if (validate.err) return false;
  const sale = await model.getSaleById(id);
  return sale;
};

const updateSaleById = async (saleId, updates) => {
  const validation = salesSchema.validation(updates);
  if (validation.err) return validation;
  const updatedSale = model.updateSaleById(saleId, updates);
  return updatedSale;
};

module.exports = {
  insertNewSale,
  getAllSales,
  getSaleById,
  updateSaleById,
};
