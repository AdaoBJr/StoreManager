const salesModel = require('../models/salesModel');
const { updateProductsDB } = require('../models/productsModel');

// const updateProdQnt = async (arr, value) => {
//   if()
//   arr.forEach(({ productId, quantity }) => updateQntDB(productId, quantity * value));
// };

const createSale = async (arr) => {
  arr.forEach(async ({ productId, quantity }) => updateProductsDB(productId, -quantity));
  return salesModel.createSale(arr);
};

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => salesModel.getSaleById(id);

const updateSaleById = async (id, arr) => salesModel.updateSaleById(id, arr);

const deleteSaleById = async (id) => {
  const { itensSold } = await getSaleById(id);
  console.log(itensSold);
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