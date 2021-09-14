const salesModels = require('../models/saleModels');

const validateNotString = (quantity) => {
  if (typeof quantity === 'string') {
    return false;
  }
  return true;
};

const validateSaleQuantity = (quantity) => {
  if (quantity <= 0) {
    return false;
  }
  return true;
};

const validateCreateSale = async (body) => {
  const validQuantNotString = validateNotString(body.quantity);
  const validSaleQuantity = validateSaleQuantity(body.quantity);
  if (!validQuantNotString) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }
  if (!validSaleQuantity) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }
  const createSale = await salesModels.createSales(body);
  return createSale;
};

module.exports = {
  validateCreateSale,
};
