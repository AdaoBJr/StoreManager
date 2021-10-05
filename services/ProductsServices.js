const Model = require('../models');

const INVALID_ERROR = 'invalid_data';
const ID_ERROR = {
  err: {
    code: INVALID_ERROR,
    message: 'Wrong id format',
  },
};

const NAME_ERROR = {
  err: {
    code: INVALID_ERROR,
    message: '"name" length must be at least 5 characters long',
  },
};

const TYPE_ERROR = {
  err: {
    code: INVALID_ERROR,
    message: '"quantity" must be a number',
  },
};

const QUANTITY_ERROR = {
  err: {
    code: INVALID_ERROR,
    message: '"quantity" must be larger than or equal to 1',
  },
};

const EXISTS_ERROR = {
  err: {
    code: INVALID_ERROR,
    message: 'Product already exists',
  },
};

const nameValidation = (name) => {
  const nameRegex = /^.{5,}$/;

  return nameRegex.test(name);
};

const idValidation = (id) => {
  const idRegex = /^.{24}$/;

  return idRegex.test(id);
};

const quantityTypeValidation = (quantity) => typeof (quantity) === 'number';

const quantityValidation = (quantity) => quantity > 0;

const storeProduct = async (data) => {
  const { name, quantity } = data;

  if (!nameValidation(name)) return NAME_ERROR;

  if (!quantityTypeValidation(quantity)) return TYPE_ERROR;

  if (!quantityValidation(quantity)) return QUANTITY_ERROR;

  const alreadyExists = await Model.products.getProductByName(name);

  if (alreadyExists) return EXISTS_ERROR;

  const store = await Model.products.storeProduct(data);

  return store;
};

const getAllProducts = async () => {
  const products = await Model.products.getAllProducts();
  const allProducts = { products: [...products] };

  return allProducts;
};

const getProductsById = async (id) => {
  if (!idValidation(id)) return ID_ERROR;

  const productById = await Model.products.getProductsById(id);

  return productById;
};

const updatedProduct = async (id, updateProduct) => {
  if (!idValidation(id)) return ID_ERROR;

  const { name, quantity } = updateProduct;

  if (!nameValidation(name)) return NAME_ERROR;

  if (!quantityTypeValidation(quantity)) return TYPE_ERROR;

  if (!quantityValidation(quantity)) return QUANTITY_ERROR;

  await Model.products.updatedProduct(id, { name, quantity });

  return { _id: id, name, quantity };
};

const deleteProduct = async (id) => {
  if (!idValidation(id)) return ID_ERROR;

  const deletedProduct = await Model.products.getProductsById(id);

  const product = await Model.products.deleteProduct(id);

  return (product.deletedCount === 1) ? deletedProduct : ID_ERROR;
};

module.exports = {
  storeProduct,
  getAllProducts,
  getProductsById,
  updatedProduct,
  deleteProduct,
};
