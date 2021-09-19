const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const productError = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const saleError = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

const stockError = { 
  err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

const validateProducts = (productsList) => {
  const validations = productsList.map((product) => {
    if (product.quantity < 1) return productError;
    if (typeof product.quantity !== 'number') return productError;
    return product;
  });
  return validations;
};

const validateStockQuantity = (newSale, productsList) => {
  const validations = productsList.map((product, index) => {
    if (newSale[index].quantity > product.quantity) return stockError;
    return product;
  });

  return validations[0];
};

const createSale = async (newSale) => {
  const validateProductsResult = validateProducts(newSale);
  if (validateProductsResult[0].err) return productError;

  const getNewSaleProductsFromDB = await Promise.all(
    newSale.map(({ productId }) => productsModel.getProductById(productId)),
  );

  const notExistsAllProducts = getNewSaleProductsFromDB.some((product) => !product);
  if (notExistsAllProducts) return productError;

  const stockSupportsSalesAmount = validateStockQuantity(newSale, getNewSaleProductsFromDB);
  if (stockSupportsSalesAmount.err) return stockError;

  const createdSale = await salesModel.createSale(newSale);
  await Promise.all(
    newSale.map((product, index) => productsModel.removeFromStockQuantity(
      product, getNewSaleProductsFromDB[index].quantity,
    )),
  );

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
  const validateProductsResult = validateProducts(saleProductsList);
  if (validateProductsResult[0].err) return productError;

  const updatedSale = await salesModel.updateSaleById(id, saleProductsList);
  return updatedSale;
};

const excludeSaleById = async (id) => {
  const excludedSale = await getSaleById(id);

  if (!await salesModel.excludeSaleById(id)) {
    saleError.err = { code: 'invalid_data', message: 'Wrong sale ID format' };
    return saleError;
  }

  const getNewSaleProductsFromDB = await Promise.all(
    excludedSale.itensSold.map(({ productId }) => productsModel.getProductById(productId)),
  );

  await Promise.all(
    excludedSale.itensSold.map((product, index) => productsModel.addToStockQuantity(
      product, getNewSaleProductsFromDB[index].quantity,
    )),
  );

  return excludedSale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  excludeSaleById,
};
