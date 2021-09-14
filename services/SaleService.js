// const { ObjectId } = require('mongodb');
const SaleModel = require('../models/SaleModel');

const isValidQuantity = (quantity) => {
  if (quantity <= 0) {
    return {
      code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
}
  if (!quantity) return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };

  if (typeof quantity !== 'number') {
     return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }; 
}

  return true;
}; 

const createSale = async (body) => {
  const validQuantity = body.map((sale) => isValidQuantity(sale.quantity));
  if (validQuantity.includes(false)) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }

  const sale = await SaleModel.create(body);
  return sale;
};

module.exports = {
  createSale,
};
