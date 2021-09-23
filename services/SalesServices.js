const model = require('../models/SalesModel');

function saleValidation(sale) {
  const error = new Error();
  error.status = 422;
  error.err = {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  };
  sale.forEach((s) => {
    if (s.quantity < 1 || typeof s.quantity !== 'number') throw error;
  });
}

function salesExists(sale) {
  const error = new Error();
  error.status = 404;
  error.err = {
    code: 'not_found',
    message: 'Sale not found',
  };
  if (!sale) throw error;
}

function idValidation(sale) {
  const error = new Error();
  error.status = 422;
  error.err = {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  };
  if (!sale) throw error;
}

function quantityValidation(sale) {
  const error = new Error();
  error.status = 404;
  error.err = {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  };
  if (!sale) throw error;
}

async function quantityUpdate(sale) {
  const sales = sale.map(async (item) => {
    const stock = await model.quantityUpdate(item.productId, item.quantity);
    quantityValidation(stock);
    return stock;
  });
  await Promise.all(sales);
}

async function newSale(sale) {
  saleValidation(sale);
  await quantityUpdate(sale);
  const result = await model.newSale(sale);
  return result;
}

async function fetchSales() {
  const result = await model.fetchSales();
  return result;
}

async function findById(id) {
  const result = await model.findById(id);
  salesExists(result);
  return result;
}

async function updateSale(id, sale) {
  saleValidation(sale);
  await quantityUpdate(sale);
  const result = await model.updateSale(id, sale);
  return result;
}

async function deleteSale(id) {
  const result = await model.deleteSale(id);
  idValidation(result);
  const { itensSold } = result;
  const sale = [{ productId: itensSold[0].productId, quantity: itensSold[0].quantity * -1 }];
  await quantityUpdate(sale);
  return result;
}

module.exports = {
  newSale,
  fetchSales,
  findById,
  updateSale,
  deleteSale,
};
