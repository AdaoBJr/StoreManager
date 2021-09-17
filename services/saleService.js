const saleModel = require('../models/saleModel');

const isQuantityValid = (quantity) => (typeof quantity === 'number') && (quantity > 0);

const createSale = async ({ itensSold }) => {
  const quantityValid = itensSold.every(({ quantity }) => isQuantityValid(quantity));
  
  if (!quantityValid) {
   return {
    status: 422,
    messageResult: {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity', 
      },
    },
   };
  }

  const messageResult = await saleModel.createSale({ itensSold });
  return {
    status: 200,
    messageResult,
  };
};

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  
  return {
    status: 200,
    messageResult: {
      sales,
    },
  };
};

module.exports = {
  createSale,
  getAllSales,
};