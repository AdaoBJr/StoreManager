const ProductModel = require('../models/productsModels');

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

const isValidLengthName = (name) => {
  if (name.length < 5) return false;
  return true;
};

const isNameExists = async (name) => {
  const productName = await ProductModel.findByName(name);
  if (productName) return null;
  return true;
};

const verifyQuantity = (quantity) => {  
  if (quantity <= 0) return false;
  return true;
};

const verifyType = (quantity) => {
  if (typeof quantity === 'string') return false;
  return true;
};

const getAll = async () => {
  const allProducts = await ProductModel.getAll();
  return allProducts;
};

const getProductById = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) return ERR_ID;

  return product;
};

const createProduct = async ({ name, quantity }) => {
  if (!isValidLengthName(name)) return ERR_LENGTH_NAME;
  if (!verifyQuantity(quantity)) return ERR_QUANTITY;
  if (!verifyType(quantity)) return ERR_TYPE_QUANTITY;

  const productName = await isNameExists(name);
  if (!productName) return ERR_NAME_EXISTS;

  const newProduct = await ProductModel.create({ name, quantity });  
  return newProduct;
};

const updateProduct = async (id, { name, quantity }) => {
  if (!isValidLengthName(name)) return ERR_LENGTH_NAME;
  if (!verifyQuantity(quantity)) return ERR_QUANTITY;
  if (!verifyType(quantity)) return ERR_TYPE_QUANTITY;

  const productName = await isNameExists(name);
  if (!productName) return ERR_NAME_EXISTS;

  const product = await ProductModel.update(id, { name, quantity });  
  return product;
};

const deleteProduct = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) return ERR_ID;

  const productDeleted = await ProductModel.exclude(id);

  return productDeleted;
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};