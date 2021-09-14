const salesModel = require('../models/salesModel');
const { updateProductsDB, invAvailability } = require('../models/productsModel');

const createSale = async (arr) => {
  const promise = await arr.map(({ productId, quantity }) => 
    invAvailability(productId, quantity)); // retorna uma promise
  const availability = await Promise.all(promise);
  const checkAvailability = availability.some((bool) => bool === false); // volta true se tiver um false no array
  if (checkAvailability) {
    return { err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' } };
  }
  arr.forEach(async ({ productId, quantity }) => updateProductsDB(productId, -quantity));
  return salesModel.createSale(arr);
};

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => salesModel.getSaleById(id);

const updateSaleById = async (id, arr) => salesModel.updateSaleById(id, arr);

const deleteSaleById = async (id) => {
  const { itensSold } = await getSaleById(id);
  itensSold.forEach(async ({ productId, quantity }) => { updateProductsDB(productId, quantity); });
  return salesModel.deleteSaleById(id);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};