const Joi = require('joi');
const { ObjectID } = require('mongodb');
const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const validateId = async (id) => {
  const isValidId = ObjectID.isValid(id);
  if (!isValidId) return true;

  return false;
};

const validateQuantity = (quantity) => {
  const { error } = Joi.object({
    quantity: Joi.number().integer().min(1),
  })
  .validate({ quantity });

  if (error) return true;
  return false;
};

const isProductOnDb = async (productId) => {
  const found = await productsModel.findById(productId);
  if (found) return true;
  return false;
};

const validateProductsArray = async (salesArray) => {
  let error;
  await Promise.all(salesArray.map(async (element) => {
    const { productId, quantity } = element;
    const invalidId = await validateId(productId);
    const invalidQuantity = validateQuantity(quantity);
    const productExists = await isProductOnDb(productId);
    // Inverte o productExists para que error seja true caso o produto não exista
    if (invalidId || invalidQuantity || !productExists) {
      error = { errorMessage: { err: { 
        code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }, 
      } };
    }
  }));

  return error;
};

const insertSalesProducts = async (salesArray) => {
  const response = await salesModel.insertSales(salesArray);

  return response;
};

const findSaleById = async (saleId) => {
  const found = await salesModel.findSaleById(saleId);

  return found;
};

const getAllSales = async () => salesModel.getAllSales();

module.exports = {
  validateProductsArray,
  insertSalesProducts,
  validateId,
  validateQuantity,
  isProductOnDb,
  getAllSales,
  findSaleById,
};
