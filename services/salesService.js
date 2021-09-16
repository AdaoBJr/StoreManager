const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const error = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
} };

const validateNewSale = (newSale) => {
  const validations = newSale.map((product) => {
    if (product.quantity < 1) return error;
    if (typeof product.quantity !== 'number') return error;
    return product;
  });
  return validations;
};

const createSale = async (newSale) => {
  const validationResult = validateNewSale(newSale);
  if (validationResult[0].err) return error;

  const getNewSaleProductsFromDB = await Promise.all(
    newSale.map((product) => productsModel.getProductById(product.productId)),
  );
  const notExistsAllProducts = getNewSaleProductsFromDB.some((product) => !product);
  
  if (notExistsAllProducts) return error;

  const createdSale = await salesModel.createSale(newSale);
  return createdSale;
};

const getAllSales = async () => {
  const allSales = { sales: await salesModel.getAllSales() };
  return allSales;
};

module.exports = {
  createSale,
  getAllSales,
};
