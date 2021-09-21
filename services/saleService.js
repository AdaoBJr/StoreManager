const Joi = require('@hapi/joi');
const { StatusCodes } = require('http-status-codes');

const saleModel = require('../models/saleModel');
const stock = require('../models/productModel');

const validateSale = Joi.array().items({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
});

const errObj = { status: StatusCodes.UNPROCESSABLE_ENTITY,
  code: 'invalid_data',
  error: { message: 'Wrong product ID or invalid quantity' },
};
const createSale = async (items) => {
  const { error } = validateSale.validate(items);

  if (error) {
    return errObj;
  }
  const { productId } = items[0];
  const { name, quantity } = await stock.getById(productId);
  const itemQuantity = quantity - items[0].quantity;
  const NO_STOCK = 0;

  if (itemQuantity < NO_STOCK) {
    return {
      status: StatusCodes.NOT_FOUND,
      code: 'stock_problem',
      error: { message: 'Such amount is not permitted to sell' },
    };
  }

  await stock.updateProduct(productId, name, itemQuantity);
  const newSale = await saleModel.createSale(items);

  return newSale;
};

const getAll = async () => {
  const allSales = await saleModel.getAll();

  return allSales;
};

const getById = async (id) => {
  const sale = await saleModel.getById(id);

  if (!sale) {
    return {
      status: StatusCodes.NOT_FOUND,
      code: 'not_found',
      error: { message: 'Sale not found' },
    };
  }

  return sale;
};

const updateSale = async (id, item) => {
  const { error } = validateSale.validate(item);

  if (error) {
    return {
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error: { message: 'Wrong product ID or invalid quantity' },
    };
  }

  const updatedSale = await saleModel.updateSale(id, item);

  return updatedSale;
};

const deleteSale = async (id) => {
  const deletedSale = await saleModel.deleteSale(id);

  if (!deletedSale) {
    return {
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      error: { message: 'Wrong sale ID format' },
    };
  }

  const { productId, quantity } = deletedSale.itensSold[0];
  const product = await stock.getById(productId);
  const itemQuantity = product.quantity + quantity;
  await stock.updateProduct(productId, product.name, itemQuantity);

  return deletedSale;
};

module.exports = {
  createSale,
  getAll,
  getById,
  updateSale,
  deleteSale,
};
