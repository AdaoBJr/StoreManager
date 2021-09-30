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
  await salesArray.forEach(async (element) => {
    const { productId, quantity } = element;
    const invalidId = await validateId(productId);
    const invalidQuantity = validateQuantity(quantity);
    // Inverte o resultado para que error seja true caso o produto não exista
    const inexistentProduct = !isProductOnDb(productId);
    if (invalidId || invalidQuantity || inexistentProduct) {
      error = { errorMessage: { err: { 
        code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }, 
      } };
    }
  });

  return error;
};

const insertSalesProducts = async (salesArray) => {
  const response = await salesModel.insertSales(salesArray);

  return response;
};

module.exports = {
  validateProductsArray,
  insertSalesProducts,
  validateId,
  validateQuantity,
  isProductOnDb,
};
