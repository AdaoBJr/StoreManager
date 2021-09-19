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

const getAllSales = async () => {
  const listAllSales = await salesModel.getAllSales();
  const allSales = { sales: [...listAllSales] };

  return allSales;
};

const getSalesId = async (id) => {
  const salesId = await salesModel.getSalesId(id);
  if (!salesId) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return salesId;
};

const updateSale = async (id, productId, quantity) => {
  if (chekQuantity(quantity)) return chekQuantity(quantity);
  const salesId = await salesModel.updateSale(id, productId, quantity);
  if (!salesId) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return salesId;
};

module.exports = {
  registerSales,
  getAllSales,
  getSalesId,
  updateSale,
};
