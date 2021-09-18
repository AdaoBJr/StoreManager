const salesModel = require('../models/salesModel');

const MINIMUN_AMOUNT = 0;

const chekQuantity = (quantity) => {
  if (quantity <= MINIMUN_AMOUNT || typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
};

const registerSales = async (itemSold) => {
  if (chekQuantity(itemSold[0].quantity)) return chekQuantity(itemSold);

  const newSales = await salesModel.registerSales(itemSold);

  return newSales;
};

module.exports = {
  registerSales,
};
