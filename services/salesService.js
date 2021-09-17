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

const validateSale = (productsList) => {
  const validations = productsList.map((product) => {
    if (product.quantity < 1) return productError;
    if (typeof product.quantity !== 'number') return productError;
    return product;
  });
  return validations;
};

const createSale = async (newSale) => {
  const validationResult = validateSale(newSale);
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

const updateSaleById = async (id, saleProductsList) => {
  const validationResult = validateSale(saleProductsList);
  if (validationResult[0].err) return productError;

  const updatedSale = await salesModel.updateSaleById(id, saleProductsList);
  return updatedSale;
};

const excludeSaleById = async (id) => {
  const excludedSale = await getSaleById(id);

  if (!await salesModel.excludeSaleById(id)) {
    saleError.err = { code: 'invalid_data', message: 'Wrong sale ID format' };
    return saleError;
  }

  return excludedSale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  excludeSaleById,
};
