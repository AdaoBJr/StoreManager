// const { ObjectId } = require('mongodb');
const SaleModel = require('../models/SalesModel');
// const ProductModel = require('../models/ProductModel');
const {
  validateSales,
  validateSaleId,
} = require('../middlewares/validations');

const create = async (body) => {
  const getSales = body.map((sale) => {
    const isSaleValid = validateSales(sale.quantity);
    if (isSaleValid.err) return isSaleValid;
    return isSaleValid;
  });

  if (getSales[0].err) return getSales[0];

  const createSale = await SaleModel.create(body);
  return createSale;
};

// const getAll = async () => {
//   await SaleModel.getAll('sales');
// };

const findById = async (id) => {
  const isIdValid = validateSaleId(id);
  if (isIdValid.err) return isIdValid;
  
  const sale = await SaleModel.findById(id);
  if (!sale) return { err: { code: 'not_found', message: 'Sale not found' } };
  return sale;
};

module.exports = {
  create,
  // getAll,
  findById,
};