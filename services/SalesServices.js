const Model = require('../models');

const ERROR_CODE_400 = 'invalid_data';
const ERROR_CODE_404 = 'not_found';
const ERROR_SALES = { err: {
  code: ERROR_CODE_400,
  message: 'Wrong product ID or invalid quantity',
} };

const ERROR_NOT_FOUND = { err: {
  code: ERROR_CODE_404,
  message: 'Sale not found',
} };

const quantityTypeValidation = (quantity) => typeof (quantity) === 'number';

const quantityValidation = (quantity) => quantity >= 1;

const idValidation = (id) => {
  const idRegex = /^.{24}$/;

  return idRegex.test(id);
};

const storeSales = async (data) => {
  const error = false;

  await data.forEach(async ({ productId, quantity }) => {
    const test = await Model.products.getProductById(productId);

    if (!test) return error;

    if (!quantityTypeValidation(quantity)) return error;

    if (!quantityValidation(quantity)) return error;
  });

  const result = await Model.sales.storeSales(data);

  return result;
};

const getAllSales = async () => {
  const sales = await Model.sales.getAllSales();
  const allSales = { sales: [...sales] };
  return allSales;
};

const getSalesById = async (id) => {  
  if (!idValidation(id)) return ERROR_NOT_FOUND;

  const product = await Model.sales.getSaleById(id);

  if (!product) return ERROR_NOT_FOUND;

  return product;
};

const updatedSale = async (id, updateSale) => {
  if (!idValidation(id)) return ERROR_SALES;

  let error = false;

  await updateSale.forEach(async ({ productId, quantity }) => {
    if (!quantityTypeValidation(quantity)) error = true;

    if (!quantityValidation(quantity)) error = true;

    const test = await Model.products.getProductsById(productId);

    if (!test) error = true;
  });

  if (error) return ERROR_SALES;

  const sale = await Model.sales.updatedSale(id, { itensSold: updatedSale });

  return (sale.matchedCount === 1) ? { _id: id, itensSold: updatedSale } : ERROR_SALES;
};

module.exports = {
  storeSales,
  getAllSales,
  getSalesById,
  updatedSale,
};