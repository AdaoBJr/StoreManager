const salesModel = require('../models/salesModel');

const min = 1;
const err = {
  code: 'invalid_data',
  message: '',
};

const checkQuantity = (quantity) => {
  if (quantity < min) return true;

  if (typeof (quantity) !== 'number') return true;
};

const validateQuantity = (products) => {
  const testedQuantity = products.some((product) => checkQuantity(product.quantity));
  if (testedQuantity) {
    err.message = 'Wrong product ID or invalid quantity';
    return { err };
  }
};

const checkId = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale) {
    return {  
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }
};

const newSales = async (products) => {
  const sales = validateQuantity(products);
  if (sales) return sales;

  const newSale = await salesModel.create(products);

  return newSale;
};

const getSales = async () => {
  const sales = await salesModel.getAll();

  return { sales };
};

const findSales = async (id) => {
  const validId = await checkId(id);
  if (validId) return validId;

  const sale = await salesModel.getById(id);
  return sale;
};

const updateSales = async (id, product) => {
  const sales = validateQuantity(product);
  if (sales) return sales;

  const newSale = await salesModel.update(id, product);
  
  return newSale;
};

const deleteSales = async (id) => {
  const salesId = await findSales(id);
  if (salesId.err) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    };
  }

  const sale = await salesModel.excluse(id);

  return sale && salesId;
};

module.exports = {
  newSales,
  getSales,
  findSales,
  updateSales,
  deleteSales,
};