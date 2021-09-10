const model = require('../models/Sales');

const validateSale = (sale) => {
  sale.forEach((item) => {
    if (item.quantity < 1 || typeof item.quantity !== 'number') {
      const error = new Error();
      error.statusCode = 'invalidSale';
      throw error;
    }
  });
};

const newSale = async (sale) => {
  validateSale(sale);
  const result = await model.newSale(sale);
  return result;
};

module.exports = {
  newSale,
};
