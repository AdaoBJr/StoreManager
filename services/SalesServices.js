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

const quantityTypeValidation = (quantity) => typeof(quantity) === 'number';

const quantityValidation = (quantity) => quantity >= 1;

const idValidation = (id) => {
  const idRegex = /^.{24}$/;

  return idRegex.test(id);
};

const storeSales = async (salesData) => {
  let error = false;

  const sales = salesData.map(({ productId, quantity }) => ({ productId, quantity }));

  await sales.forEach(async ({ productId, quantity }) => {
    const test = await Model.products.getProductById(productId);

    if(!test) error = true;

    if (!quantityTypeValidation(quantity)) error = true;

    if (!quantityValidation(quantity)) error = true;
  });

  if (error) return ERROR_SALES;

  return await Model.sales.storeSales(salesData);
};

const getAllSales = async () => await Model.sales.getAllSales();

const getSalesById = async (id) => {  
  if (!idValidation(id)) return ERROR_NOT_FOUND;

  const product = await Model.sales.getSaleById(id);

  if (!product) return ERROR_NOT_FOUND;

  return product;
};


module.exports = {
  storeSales,
  getAllSales,
  getSalesById,
};