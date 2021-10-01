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

const updateProductQuantity = async (salesArray, removeFromStock) => {
  let error; let updatedQuantity;

  await Promise.all(salesArray.map(async (element) => {
    if (error) return;
    const { productId, quantity } = element;
    const productInStock = await productsModel.findById(productId);
    if (removeFromStock && quantity > productInStock.quantity) {
      error = { errorMessage: { err: { 
        code: 'stock_problem', message: 'Such amount is not permitted to sell' }, 
      } }; return; 
    }
    if (removeFromStock) {
      updatedQuantity = productInStock.quantity - quantity;
    } else {
      updatedQuantity = productInStock.quantity + quantity;
    }
    await productsModel.updateOne(productId, productInStock.name, Number(updatedQuantity));
  }));
  return error;
};

const insertSales = async (salesArray) => salesModel.insertSales(salesArray);

const findSaleById = async (saleId) => salesModel.findSaleById(saleId);

const getAllSales = async () => salesModel.getAllSales();

const updateSale = async (id, salesArray) => salesModel.updateOneSale(id, salesArray);

const deleteSaleById = async (id) => salesModel.deleteSaleById(id);

module.exports = {
  validateProductsArray,
  insertSales,
  validateId,
  validateQuantity,
  isProductOnDb,
  getAllSales,
  findSaleById,
  updateSale,
  deleteSaleById,
  updateProductQuantity,
};
