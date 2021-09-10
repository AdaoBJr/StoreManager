const ProductModel = require('../models/ProductModels');

const ERR_ID = {
  err: { code: 'invalid_data', message: 'Wrong id format' },
};

const ERR_LENGTH_NAME = {
  err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
};

const ERR_NAME_EXISTS = {
  err: { code: 'invalid_data', message: 'Product already exists' },
};

const ERR_QUANTITY = {
  err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
};

const ERR_TYPE_QUANTITY = {
  err: { code: 'invalid_data', message: '"quantity" must be a number' },
};

async function getAllProduct() {
  const allProducts = await ProductModel.getAll();

  return allProducts;
}

function isValidLengthName(name) {
  if (name.length < 5) return false;
  return true;
}

async function isValidNameExists(name) {
  const findName = await ProductModel.findByName(name);
  if (findName) return null;
  return true;
}

function isValidQuantity(quantity) {
  if (quantity <= 0) return false;
  return true;
}

function isValidTypeQuantity(quantity) {
  if (typeof quantity === 'string') return false;
  return true;
}

async function getProductById(id) {
  const product = await ProductModel.findById(id);
  if (!product) return ERR_ID;

  return product;
}

async function insert(name, quantity) {
  if (!isValidLengthName(name)) return ERR_LENGTH_NAME;
  if (!isValidQuantity(quantity)) return ERR_QUANTITY;
  if (!isValidTypeQuantity(quantity)) return ERR_TYPE_QUANTITY;

  const nameExists = await isValidNameExists(name);
  if (!nameExists) return ERR_NAME_EXISTS;

  const insertProduct = await ProductModel.create(name, quantity);

  return insertProduct;
}

async function updateProduct(id, { name, quantity }) {
  if (!isValidLengthName(name)) return ERR_LENGTH_NAME;
  if (!isValidQuantity(quantity)) return ERR_QUANTITY;
  if (!isValidTypeQuantity(quantity)) return ERR_TYPE_QUANTITY;

  const nameExists = await isValidNameExists(name);
  if (!nameExists) return ERR_NAME_EXISTS;

  const product = await ProductModel.update(id, { name, quantity });

  return product;
}

async function deleteProduct(id) {
  const product = await ProductModel.findById(id);
  if (!product) return ERR_ID;

  const exludeProduct = await ProductModel.exclude(id);

  return exludeProduct;
}

module.exports = {
  getAllProduct,
  getProductById,
  insert,
  updateProduct,
  deleteProduct,
};
