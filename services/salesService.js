// const { ObjectId } = require('mongodb');
const SalesModels = require('../models/salesModels');

const verifyQuantity = (body) => {
 const condiction = body.some((item) => typeof item.quantity !== 'number' || item.quantity <= 0);
 if (condiction) {
   return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    }; 
 }
return false;
};

const createSale = async (body) => {
  const x = verifyQuantity(body);
  if (x) return x;
  const sale = await SalesModels.createSale(body);
  return sale;
};

module.exports = {
  createSale,
};