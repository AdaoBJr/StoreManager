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

const validateDeletion = (sale) => {
  if (!sale) {
    const error = new Error();
    error.statusCode = 'unprocessable';
    throw error;
  }
};

const verifyStock = (stock) => {
  if (!stock) {
    const error = new Error();
    error.statusCode = 'stockProblem';
    throw error;
  }
};

const updateProductQtts = async (sale) => {
  const sellPromises = sale.map(async (item) => {
    const verifyQtt = await model.sellQuantity(item.productId, item.quantity);
    console.log(verifyQtt);
    verifyStock(verifyQtt);
    return verifyQtt;
  });
  await Promise.all(sellPromises);
};

const getAll = () => model.getAll();

const getById = async (id) => {
  const result = await model.getById(id);
  isValidSale(result);
  return result;
};

const newSale = async (sale) => {
  validateSale(sale);
  await updateProductQtts(sale);
  const result = await model.newSale(sale);
  return result;
};

const updateSale = async (id, sale) => {
  validateSale(sale);
  const result = await model.updateSale(id, sale);
  console.log(result);
  return result;
};

const deleteSale = async (id) => {
  const sale = await model.getById(id);
  validateDeletion(sale);
  const { itensSold } = sale;
  const item = [{ productId: itensSold[0].productId, quantity: itensSold[0].quantity * -1 }];
  if (itensSold) await updateProductQtts(item);
  const result = await model.deleteSale(id);
  return result;
};

module.exports = {
  getAll,
  getById,
  newSale,
  updateSale,
  deleteSale,
};
