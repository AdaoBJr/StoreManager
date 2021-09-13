const SalesModels = require('../models/salesModels');

const ERR_QUANTITY = {
  err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
};

const ERR_NOT_FOUND = {
  err: { code: 'not_found', message: 'Sale not found' },
};

const ERR_ID = {
  err: { code: 'invalid_data', message: 'Wrong sale ID format' },
};

const ERR_STOCK = {
  err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
};

const isValidQuantity = (quantity) => {
  if (quantity <= 0) return false;
  if (typeof quantity === 'string') return false;
  return true;
};

const createSale = async (salesInfo) => {
  const isNotValid = salesInfo.find(({ quantity }) => (!isValidQuantity(quantity)));
  if (isNotValid) return ERR_QUANTITY;

  const insertSale = await SalesModels.create(salesInfo);
  if (!insertSale) return ERR_STOCK;

  return insertSale;
};

const getAllSales = async () => {
  const allSales = await SalesModels.getAll();

  return allSales;
};

const getSaleById = async (id) => {
  const saleId = await SalesModels.findById(id);

  if (!saleId) return ERR_NOT_FOUND;

  return saleId;
};

const updateSale = async (id, salesInfo) => {
  const isNotValid = salesInfo.find(({ quantity }) => (!isValidQuantity(quantity)));
  if (isNotValid) return ERR_QUANTITY;

  const sale = await SalesModels.update(id, salesInfo);

  return sale;
};

const deleteSale = async (id) => {
  const sale = await SalesModels.findById(id);

  if (!sale) return ERR_ID;

  const excludeSale = await SalesModels.exclude(id);

  return excludeSale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
