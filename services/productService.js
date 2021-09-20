const Joi = require('joi');
const ProductModel = require('../models/productModel');
const { formatError } = require('../helpers');

const wrongId = 'Wrong id format';

function JoiValidator(data) {
  const schema = Joi.object({
    name: Joi.string()
        .min(5)
        .required(),

    quantity: Joi.number().min(1).strict().required(),
  });

  return schema.validate(data).error;
}

function idValidator(id) {
  const idRegex = /^.{24}$/;

  return idRegex.test(id);
}

// <-- SERVICE METHODS -->

async function save(product) {
  const error = JoiValidator(product);
  if (error) return formatError(error.details[0].message);
  const exists = await ProductModel.findItem(product);
  if (exists) return formatError('Product already exists');
  const item = await ProductModel.save(product);
  return item;
}

async function list() {
  const all = await ProductModel.list();
  return all;
}

async function listById(id) {
  if (!idValidator(id)) return formatError(wrongId);
  const item = await ProductModel.listById(id);
  if (!item) return formatError(wrongId);
  return item;
}

async function edit(id, item) {
  if (!idValidator(id)) return formatError(wrongId);
  const error = JoiValidator(item);
  if (error) return formatError(error.details[0].message);
  const { name, quantity } = item;
  const product = await ProductModel.edit(id, item);
  
  return (product.matchedCount === 1)
  ? { _id: id, name, quantity }
  : formatError(wrongId);
}

async function remove(id) {
  if (!idValidator(id)) return formatError(wrongId);
  const deletedItem = await ProductModel.listById(id);
  const item = await ProductModel.remove(id);
  return (item.deletedCount === 1) ? deletedItem : formatError(wrongId);
}

module.exports = {
  save,
  list,
  listById,
  edit,
  remove,
};