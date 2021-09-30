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
  const { err } = Joi.object({
    quantity: Joi.number().integer().min(1),
  })
  .validate({ quantity });

  if (err) return true;
  return false;
};

const isProductOnDb = async (productId) => {
  const found = await productsModel.findById(productId);

  if (found) return true;
  return false;
};

const validadeProductsArray = async (salesArray) => {
  let error;

  salesArray.map(async (element) => {
    if (error) return element;
    const { productId, quantity } = element;
    const invalidId = await validateId(productId);
    const invalidQuantity = await validateQuantity(quantity);
    // Inverte o resultado para que error seja true caso o produto não exista
    const inexistentProduct = await !isProductOnDb(productId);
    if (invalidId || invalidQuantity || inexistentProduct) {
      error = { err: { code: 'indalid_data', message: 'Wrong product ID or invalid quantity' } };
    }
    return element;
  });

  return error;
};

const insertSalesProducts = async (salesArray) => {
  const response = await salesModel.insertSales(salesArray);

  return response;
};

module.exports = {
  validadeProductsArray,
  insertSalesProducts,
};
