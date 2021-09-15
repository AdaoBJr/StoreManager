const SalesModel = require('../models/SalesModel');
const ProductsModel = require('../models/ProductsModel');

// validações sales
const validQuantity = (sale) => {
const num = 0;
  const isValidMinNumber = sale.every((item) =>
    item.quantity > num && typeof item.quantity === 'number');

  return isValidMinNumber;
};

const incrementSales = async ({ itensSold }) => {
  console.log(itensSold);
  if (!itensSold) return null;
  const result = itensSold.map(({ productId, quantity }) =>
   ProductsModel.incrementProducts(productId, quantity));
   const promisesResolv = await Promise.all(result);
   return promisesResolv.every((promises) => promises);
};

const decrementaSales = async (sale) => {
  if (!sale) return null;
  const result = sale.map(({ productId, quantity }) =>
  ProductsModel.decrementProducts(productId, quantity));
  const promisesResolv = await Promise.all(result);
   return promisesResolv.every((promises) => promises);
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
    console.log(`dec ${sale}`);
    decrementaSales(sale);
    return SalesModel.addSale(sale);
};

const getSale = async () => {
  const result = await SalesModel.getSale();
  return result;
};

const getSaleById = async (id) => {
  const result = await SalesModel.getSaleById(id);
  if (!result) {
    return {
    status: 404,
    code: 'not_found',
    message: 'Sale not found',
    };
  }
  return result;
};

const putSales = async (id, sale) => {
  const valid = validQuantity(sale);
    if (!valid) {
      return {
      status: 422,
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
      };
    }
    return SalesModel.putSales(id, sale);
};

const deleteSales = async (id) => {
  const sale = await SalesModel.deleteSales(id);
  if (!sale) {
    return false;
  }
  // console.log(`inc ${result}`);
  incrementSales(sale);
  return sale;
};

module.exports = {
  addSale,
  getSale,
  getSaleById,
  putSales,
  deleteSales,
};