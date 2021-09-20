const { ObjectId } = require('mongodb');
const saleModel = require('../models/saleModel');

// req 5
const saleQuantityValidation = async (quantity) => {
  if (quantity <= 0) {
    return false;
  }
  return true;
};

// req 5
const notStringValidation = async (quantity) => {
  if (typeof quantity === 'string') {
    return false;
  }
  return true;
};

// req 5
const registerMultipleSalesValidation = (body) => {
  const salesMap = body.map((sales) => {
    const validatedNotString = notStringValidation(sales.quantity);
    const validatedSaleQuantity = saleQuantityValidation(sales.quantity);
    if (!validatedNotString || !validatedSaleQuantity) {
      return false;
    }
    return true;
  });
  return salesMap[0];
};

// req 5
const registerSaleValidation = async (body) => {
  if (registerMultipleSalesValidation(body) === false) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }
  const registeredSale = await saleModel.registerSale(body);
  return registeredSale;
};

// req 6
const findAllSalesValidation = async () => {
  const allSales = await saleModel.findAllSales();
  return allSales;
};

// req 6
const findSaleByIdValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: 'not_found', message: 'Sale not found' };
  }
  const foundSaleById = await saleModel.findSaleById(id);
  return foundSaleById;
};

module.exports = {
  registerSaleValidation,
  findAllSalesValidation,
  findSaleByIdValidation,
};
