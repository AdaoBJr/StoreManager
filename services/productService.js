const Joi = require('joi');
const ProductModel = require('../models/productModels');

function JoiSchema(product) {
  const schema = Joi.object({
    name: Joi.string()
        .min(5)
        .required(),

    quantity: Joi.number().min(1).strict().required(),
  });

  return schema.validate(product).error;
}

function formatError(message) {
  return {
      err: {
        code: 'invalid_data',
        message,
      },
  };
}

function idValidator(id) {
  const idRegex = /^.{24}$/;

  return idRegex.test(id);
}

// SERVICE METHODS

async function saveProduct(product) {
  const error = JoiSchema(product);
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
  if (!idValidator(id)) return formatError('Wrong id format');
  const item = await ProductModel.listProductById(id);
  if (!item) return formatError('Wrong id format');
  return item;
}

async function editProduct(id, item) {
  if (!idValidator(id)) return formatError('Wrong id format');
  const error = JoiSchema(item);
  if (error) return formatError(error.details[0].message);
  const { name, quantity } = item;
  const product = await ProductModel.editProduct(id, item);

  return (product.matchedCount === 1)
    ? { _id: id, name, quantity }
    : formatError('Wrong id format');
}

module.exports = {
  saveProduct,
  listProducts,
  listProductById,
  editProduct,
};