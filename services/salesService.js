const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const productError = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
} };

const saleError = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
} };

const validateNewSale = (newSale) => {
  const validations = newSale.map((product) => {
    if (product.quantity < 1) return productError;
    if (typeof product.quantity !== 'number') return productError;
    return product;
  });
  return validations;
};

const createSale = async (newSale) => {
  const validationResult = validateNewSale(newSale);
  if (validationResult[0].err) return productError;

  const getNewSaleProductsFromDB = await Promise.all(
    newSale.map((product) => productsModel.getProductById(product.productId)),
  );
  const notExistsAllProducts = getNewSaleProductsFromDB.some((product) => !product);
  
  if (notExistsAllProducts) return productError;

  const createdSale = await salesModel.createSale(newSale);
  return createdSale;
};

const getAllSales = async () => {
  const allSales = { sales: await salesModel.getAllSales() };
  return allSales;
};

const getSaleById = async (id) => {
  const saleById = await salesModel.getSaleById(id);

  if (!saleById) return saleError;
  return saleById;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
