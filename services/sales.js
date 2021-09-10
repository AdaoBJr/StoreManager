const { ObjectId } = require('mongodb');
const { sales: salesModel, products: productsModel } = require('../models');
const ajv = require('../schemas/validation');
const { AppError, errorCodes } = require('../utils');

const SALE_NOT_FOUND = 'Sale not found';

ajv.addKeyword('productIdExists', {
  async: true,
  type: 'string',
  validate: productsModel.checkIdExists,
});

const throwError = (code, message) => {
  throw new AppError(code, message);
};

const validateQuantities = async (itensSold) => {
  const results = [];
  itensSold.forEach(({ productId, quantity }) => {
    results.push(
      (async () => {
        const product = await productsModel.getById(productId);
        console.log('product ', product);
        const isValid = product.quantity >= quantity;
        if (isValid) {
          await productsModel.updateProductDecQuantity(productId, quantity);
        }
        return isValid;
      })(),
    );
  });
  const validTransactions = await Promise.all(results);
  return !validTransactions.includes(false);
};

exports.getAllService = async () => salesModel.getAllSales();

exports.getByIdService = async (id) => {
  let sale = null;

  if (ObjectId.isValid(id)) {
    sale = await salesModel.getSaleById(id);
    if (sale === null) throwError(errorCodes.NOT_FOUND, SALE_NOT_FOUND);
    return sale;
  }
  throwError(errorCodes.NOT_FOUND, SALE_NOT_FOUND);
};

exports.updateSaleService = async (id, newInfo) => {
  let updatedSale = null;
  const validate = ajv.getSchema('sales');
  const isValid = await validate(newInfo);

  if (ObjectId.isValid(id)) {
    updatedSale = isValid && (await salesModel.updateSale(id, newInfo));
    if (updatedSale === null) throwError(errorCodes.NOT_FOUND, SALE_NOT_FOUND);
    return updatedSale;
  }
  throwError(errorCodes.NOT_FOUND, SALE_NOT_FOUND);
};

exports.createService = async (sales) => {
  const validate = ajv.getSchema('sales');
  const isValid = await validate(sales);
  const { itensSold } = sales;
  const stock = isValid && (await validateQuantities(itensSold));

  console.log('stock ', stock);

  if (!stock) {
    throwError(
      errorCodes.STOCK_PROBLEM,
      'Such amount is not permitted to sell',
    );
  }
  return salesModel.createSale(sales);
};

exports.deleteSaleService = async (id) => {
  let deletedSale = null;

  if (ObjectId.isValid(id)) {
    const results = [];
    deletedSale = await salesModel.deleteSale(id);
    if (deletedSale === null) throwError(errorCodes.INVALID_DATA, 'Wrong sale ID format');
    const { itensSold } = deletedSale;
    itensSold.forEach(({ productId, quantity }) => {
      results.push(productsModel.updateProductIncQuantity(productId, quantity));
    });
    await Promise.all(results);
    return deletedSale;
  }
  throwError(errorCodes.INVALID_DATA, 'Wrong sale ID format');
};
