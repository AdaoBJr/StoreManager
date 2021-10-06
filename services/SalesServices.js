const Model = require('../models');

const ERROR_CODE_400 = 'invalid_data';
const ERROR_CODE_401 = 'stock_problem';
const ERROR_CODE_404 = 'not_found';
const ERROR_SALES = { err: {
  code: ERROR_CODE_400,
  message: 'Wrong product ID or invalid quantity',
} };
const ERROR_NOT_FOUND = { err: {
  code: ERROR_CODE_404,
  message: 'Sale not found',
} };
const ERROR_SALE_ID = { err: {
  code: ERROR_CODE_400,
  message: 'Wrong sale ID format',
} };
const ERROR_STOCK = { err: {
  code: ERROR_CODE_401,
  message: 'Such amount is not permitted to sell',
} };

const quantityTypeValidator = (quantity) => typeof (quantity) === 'number';

const quantityValidator = (quantity) => quantity >= 1;

const idValidator = (id) => {
  const idRegex = /^.{24}$/;

  return idRegex.test(id);
};

const storeSales = async (salesData) => {
  let errorData = false;
  let errorStock = false;
  const sale = [];
  salesData.forEach(({ productId, quantity }) => {
    sale.push(Model.products.getProductsById(productId));
    if (!quantityTypeValidator(quantity)) errorData = true;
    if (!quantityValidator(quantity)) errorData = true;
  });
  const stock = await Promise.all(sale);
  stock.forEach((product) => {
    if (!product) errorData = true;
  });
  if (errorData) return ERROR_SALES;
  stock.forEach((_product, index) => {
    if (stock[index].quantity < salesData[index].quantity) errorStock = true;
  });
  if (errorStock) return ERROR_STOCK;
  stock.forEach((product, index) => {
    Model.products.updatedProduct(
      product._id,
      { name: product.name, quantity: (product.quantity - salesData[index].quantity) },
    );
  });
  return await Model.sales.storeSales(salesData);
};

const getAllSales = async () => await Model.sales.getAllSales();

const getSalesById = async (id) => {  
  if (!idValidator(id)) return ERROR_NOT_FOUND;

  const product = await Model.sales.getSalesById(id);
  
  if (!product) return ERROR_NOT_FOUND;

  return product;
};

const updateSale = async (id, updatedSale) => {
  if (!idValidator(id)) return ERROR_SALES;

  let error = false;

  await updatedSale.forEach(async ({ productId, quantity }) => {
    if (!quantityTypeValidator(quantity)) error = true;

    if (!quantityValidator(quantity)) error = true;

    const test = await Model.products.getProductsById(productId);

    if(!test) error = true;
  });

  if (error) return ERROR_SALES;

  const sale = await Model.sales.updateSale(id, { itensSold: updatedSale });

  return (sale.matchedCount === 1) ? { _id: id, itensSold: updatedSale } : ERROR_SALES;
};

const deleteSale = async (id) => {
  if (!idValidator(id)) return ERROR_SALE_ID;

  const deletedSale = await Model.sales.getSalesById(id);

  const sale = await Model.sales.deleteSale(id);

  const sales = [];

  deletedSale.itensSold.forEach(({ productId }) => {
    sales.push(Model.products.getProductsById(productId));
  });

  const stock = await Promise.all(sales);

  stock.forEach((product, index) => {
    Model.products.updatedProduct(
      product._id,
      {
        name: product.name,
        quantity: product.quantity + deletedSale.itensSold[index].quantity,
      },
    );
  });

  return (sale.deletedCount === 1) ? deletedSale : ERROR_SALE_ID;
};

module.exports = {
  storeSales,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSale,
};