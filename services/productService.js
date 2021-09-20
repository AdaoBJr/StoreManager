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

async function saveProduct(product) {
  const error = JoiValidator(product);
  if (error) return formatError(error.details[0].message);
  const exists = await ProductModel.findProduct(product);
  if (exists) return formatError('Product already exists');
  const item = await ProductModel.saveProduct(product);
  return item;
}

async function listProducts() {
  const list = await ProductModel.listProducts();
  return list;
}

async function listProductById(id) {
  if (!idValidator(id)) return formatError(wrongId);
  const item = await ProductModel.listProductById(id);
  if (!item) return formatError(wrongId);
  return item;
}

async function editProduct(id, item) {
  if (!idValidator(id)) return formatError(wrongId);
  const error = JoiValidator(item);
  if (error) return formatError(error.details[0].message);
  const { name, quantity } = item;
  const product = await ProductModel.editProduct(id, item);
  
  return (product.matchedCount === 1)
  ? { _id: id, name, quantity }
  : formatError(wrongId);
}

async function removeProduct(id) {
  if (!idValidator(id)) return formatError(wrongId);
  const deletedItem = await ProductModel.listProductById(id);
  const item = await ProductModel.removeProduct(id);
  return (item.deletedCount === 1) ? deletedItem : formatError(wrongId);
}

module.exports = {
  saveProduct,
  listProducts,
  listProductById,
  editProduct,
  removeProduct,
};