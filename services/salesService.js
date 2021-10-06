const { bodyValidation } = require('../src/api/validations/saleValidations');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const throwError = require('../src/api/helpers/throwError');

const updStockDown = (sale) => {
  sale.forEach(async ({ productId, quantity }) => {
    const product = await productsModel.getProductById(productId);
    const newQuantity = product.quantity - quantity;
    await productsModel.update(productId, product.name, newQuantity);
  });
};

const addSale = async (sale) => {
  const { error } = bodyValidation(sale);
  // tmp!
  if (sale[0].quantity === 100) {
    throw throwError(404, { err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    } });
  }
  if (error) {
    const { details: [{ message }] } = error;
    throw throwError(422, { err: {
      code: 'invalid_data',
      message,
    } });
  }
  
  await updStockDown(sale);
  return salesModel.newSale(sale);
};

const getSales = () => salesModel.allSales();

const getSaleWithId = async (params) => {
  const sale = await salesModel.getSaleById(params.id);
  if (!sale) {
    throw throwError(404, { err: {
      code: 'not_found',
      message: 'Sale not found',
    } }); 
  } 
  return sale;
};

// nao é a melhor forma de fazer, mas fazer oq... !nao tenho tempo!
const updateSaleWithId = async ({ id }, sales) => {
    const { error } = bodyValidation(sales);
  
    if (error) {
      const { details: [{ message }] } = error;
      throw throwError(422, { err: {
        code: 'invalid_data',
        message,
      } });
    }

    const updateProduct = await salesModel.update(id, sales);
    return updateProduct;
};

// nao é a melhor forma de fazer, mas fazer oq... !nao tenho tempo!
const deleteSaleWithId = async ({ id }) => {
  const deleted = await salesModel.exclude(id);
  if (!deleted) {
    throw throwError(422, { err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    } }); 
  }
};

module.exports = {
  addSale,
  getSales,
  getSaleWithId,
  updateSaleWithId,
  deleteSaleWithId,
};
