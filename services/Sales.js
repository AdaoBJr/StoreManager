// const { ObjectId } = require('mongodb');
const Sales = require('../models/Sales');

const errors = {
  wrongProduct: {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  },
  notFound: {
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  },
  wrongId: {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    },
  },
};

const idExists = async (id) => {
  const existingId = await Sales.saleExists(id);

  if (!existingId) return errors.wrongId;

  return {};
};

const saleExists = async (id) => {
  const existingSale = await Sales.saleExists(id);

  if (!existingSale) return errors.notFound;

  return {};
};

const quantityValidation = (sale) => {
  const isValid = sale.every(({ quantity }) => typeof quantity === 'number' && quantity >= 1);

  if (!isValid) return errors.wrongProduct;

  return {};
};

const getAllSales = async () => {
  const sales = await Sales.getAllSales();

  return sales;
};

const findSaleById = async (id) => {
  const saleFound = await Sales.findSaleById(id);

  return saleFound;
};

const createSale = async (sale) => {
  const createdSale = await Sales.createSale(sale);

  return createdSale;
};

const updateSale = async (id, sale) => {
  const updatedSale = await Sales.updateSale(id, sale);

  return updatedSale;
};

const deleteSale = async (id) => {
  const deletedSale = await Sales.deleteSale(id);

  return deletedSale;
};

module.exports = {
  getAllSales,
  findSaleById,
  createSale,
  updateSale,
  deleteSale,
  saleExists,
  idExists,
  quantityValidation,
};
