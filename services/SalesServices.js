const SalesModel = require('../models/SalesModel');

// validações sales
const validQuantity = (sale) => {
const num = 0;
  const isValidMinNumber = sale.every((item) =>
    item.quantity > num && typeof item.quantity === 'number');

  return isValidMinNumber;
};

// função

const addSale = async (sale) => {
  const valid = validQuantity(sale);
    if (!valid) {
      return {
      status: 422,
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
      };
    }
    return SalesModel.addSale(sale);
};

module.exports = {
  addSale,
};