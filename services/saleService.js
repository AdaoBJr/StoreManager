const { ObjectId } = require('mongodb');
const saleModel = require('../models/saleModel');

// req 5
const saleQuantityValidation = (quantity) => {
  if (quantity <= 0) {
    return false;
  }
  return true;
};

// req 5
const notStringValidation = (quantity) => {
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
  const multipleSales = registerMultipleSalesValidation(body);
  if (multipleSales === false) {
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

// req 7
const updateSaleValidation = (id, body) => {
  const multipleSales = registerMultipleSalesValidation(body);
  if (multipleSales === false) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }
  const updateSale = saleModel.updateSale(ObjectId(id), body);
  return updateSale;
};

module.exports = {
  registerSaleValidation,
  findAllSalesValidation,
  findSaleByIdValidation,
  updateSaleValidation,
};
