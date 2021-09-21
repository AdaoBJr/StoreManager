const Joi = require('joi');
const { ObjectId } = require('mongodb');
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
  const result = await productModel.editQt('decrease', items);
  if (!result) {
    return { 
      err: { code: 'STOCK_PROBLEM', message: 'Such amount is not permitted to sell' }, 
    };
  }
  const sales = await saleModel.save(items);

  return sales;
}

async function list() {
  return saleModel.list();
}

async function findById(id) {
  const sale = await saleModel.findById(id);

  if (!sale) return { err: { code: 'not_found', message: 'Sale not found' } };

  return sale;
}

async function edit(id, itensSold) {
  const error = JoiValidator(itensSold);
  if (error) return formatError('Wrong product ID or invalid quantity');
  const saleEdited = await saleModel.edit(id, itensSold);
  return saleEdited;
}

async function remove(id) {
  if (!ObjectId.isValid(id)) {
    return formatError('Wrong sale ID format');
  }

  const saleDeleted = await saleModel.remove(id);
  if (!saleDeleted) {
    return { err: { code: 'not_found', message: 'Sale not found' } };
  }

  await productModel.editQt('increase', saleDeleted.itensSold);
  return saleDeleted;
}

module.exports = {
  save,
  findById,
  list,
  edit,
  remove,
};