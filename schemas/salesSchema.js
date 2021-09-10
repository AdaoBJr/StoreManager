const { ObjectId } = require('mongodb');
const products = require('../models/products');
const sales = require('../models/sales');

const errorMessage = {
  saleInvalidData: 'Wrong sale ID format',
  quantityTooLow: '"quantity" must be larger than or equal to 1',
  stockProblem: 'Such amount is not permitted to sell',
  saleNotFound: 'Sale not found',
  invalidData: 'Wrong product ID or invalid quantity',
};

const errorCode = {
  invalidData: 'invalid_data',
  notFound: 'not_found',
  stockProblem: 'stock_problem',
};

const responseCode = {
  success: 200,
  created: 201,
  notFound: 404,
  unprocessableEntity: 422,
  internalServerError: 500,
};

const fieldMinValues = {
  quantity: 1,
};

const isBlank = (value) => (!value);
const isString = (value) => (typeof value === 'string');
const isLowerthanMinValue = (value, min) => (value < min);
const idIsNotValid = (id) => {
  if (!ObjectId.isValid(id)) {
    return { response: responseCode.notFound,
      err: { code: errorCode.notFound, message: errorMessage.saleNotFound } };
  }
};

const productExists = async (productId) => {
  const product = await products.findById(productId);
  if (!product) return false;
  return true;
};

const saleExists = async (saleId, method) => {
  if (!ObjectId.isValid(saleId)) {
    return { response: responseCode.unprocessableEntity,
      err: { code: errorCode.invalidData, message: errorMessage.saleInvalidData } };
  }
  const sale = await sales.findById(saleId);
  if (!sale && method === 'DELETE') {
    return { response: responseCode.unprocessableEntity,
      err: { code: errorCode.invalidData, message: errorMessage.saleInvalidData } };
  }
  if (!sale) {
    return { response: responseCode.notFound,
      err: { code: errorCode.notFound, message: errorMessage.saleNotFound } };
  }
};

const checkProductInventory = async (item, operation) => {
  const itemInventory = await products.findById(item.productId);
  if ((itemInventory.quantity < item.quantity && operation === 'POST')
    || (itemInventory.quantity < (
      itemInventory.quantity - item.quantity && operation === 'PUT'))
  ) {
    return { response: responseCode.notFound,
      err: { code: errorCode.stockProblem, message: errorMessage.stockProblem } };
  }
};

const validateSaleData = (productId, minQuantity, quantity) => (
  isString(quantity)
  || isLowerthanMinValue(quantity, minQuantity)
  || isBlank(productId)
  || idIsNotValid(productId)
  || !productExists(productId)
);

const validateSale = ({ productId, quantity }) => {
  const minQuantity = fieldMinValues.quantity;
  const isSaleDataValid = validateSaleData(productId, minQuantity, quantity);
  if (isSaleDataValid) {
    return { response: responseCode.unprocessableEntity,
      err: { code: errorCode.invalidData, message: errorMessage.invalidData } };
  }
};
module.exports = {
  validateSale,
  idIsNotValid,
  productExists,
  saleExists,
  errorMessage,
  errorCode,
  responseCode,
  checkProductInventory,
};
