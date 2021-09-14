const SalesModel = require('../models/SalesModel');

// validações sales
const validQuantity = (sale) => {
const num = 0;
  const isValidMinNumber = sale.every((item) =>
    item.quantity > num && typeof item.quantity === 'number');

  return isValidMinNumber;
};

// const incrementSales = async (sale) => {

// };

// const decrementaSales = async (sale) => {};

// função

const addSale = async (sale) => {
  const valid = validQuantity(sale);
    if (!valid) {
      return {
      status: 422,
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
      };
    }
    return SalesModel.addSale(sale);
};

const getSale = async () => {
  const result = await SalesModel.getSale();
  return result;
};

const getSaleById = async (id) => {
  const result = await SalesModel.getSaleById(id);
  if (!result) {
    return {
    status: 404,
    code: 'not_found',
    message: 'Sale not found',
    };
  }
  return result;
};

const putSales = async (id, sale) => {
  const valid = validQuantity(sale);
    if (!valid) {
      return {
      status: 422,
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
      };
    }
    return SalesModel.putSales(id, sale);
};

const deleteSales = async (id) => {
  const result = await SalesModel.deleteSales(id);
  if (!result) {
    return false;
  }
  return result;
};

module.exports = {
  addSale,
  getSale,
  getSaleById,
  putSales,
  deleteSales,
};