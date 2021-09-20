const Joi = require('joi');
const { formatError } = require('../helpers');
const saleModel = require('../models/saleModel');
const productModel = require('../models/productModel');

function JoiValidator(data) {
  const schema = Joi.array().items(

    Joi.object({
      productId: Joi.string().length(24).required(),
      quantity: Joi.number().strict().integer().not()
      .empty()
      .min(1)
      .required(),
    }),
  );

  return schema.validate(data).error;
}

async function save(items) {
  const error = JoiValidator(items);
  if (error) return formatError('Wrong product ID or invalid quantity');
  const sales = await saleModel.save(items);
  const result = await productModel.editProductQt('decrease', items);
  if (!result) {
    return { 
      err: { code: 'STOCK_PROBLEM', message: 'Such amount is not permitted to sell' }, 
    };
  }

  return sales;
}

async function findById(id) {
  const sale = await saleModel.findById(id);

  if (!sale) return { err: { code: 'NOT_FOUND', message: 'Sale not found' } };

  return sale;
}

module.exports = {
  save,
  findById,
};