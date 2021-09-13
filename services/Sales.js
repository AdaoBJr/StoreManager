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

const isValidSale = (sale) => {
  if (!sale) {
    const error = new Error();
    error.statusCode = 'saleNotFound';
    throw error;
  }
};

const getAll = () => model.getAll();

const getById = async (id) => {
  const result = await model.getById(id);
  isValidSale(result);
  return result;
};

const newSale = async (sale) => {
  validateSale(sale);
  const result = await model.newSale(sale);
  return result;
};

module.exports = {
  newSale,
  getAll,
  getById,
};
