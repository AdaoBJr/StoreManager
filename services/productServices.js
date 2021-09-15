// const { ObjectId } = require('mongodb');
const productModels = require('../models/productModels');
const {
  isValidNameProduct,
  isValidQuant,
  isValidID } = require('../middlewares/validations');

const createProduct = async (name, quantity) => {
  const isValidName = isValidNameProduct(name);
  const isValidQuantity = isValidQuant(quantity);

// valida inputs
  if (isValidName.err) return isValidName;
  if (isValidQuantity.err) return isValidQuantity;

// check se já existe produto
  const checkProductExists = await productModels.findByName(name, 'products');
  if (checkProductExists) { 
    return { err: { code: 'invalid_data', message: 'Product already exists' } }; 
  }
// Cria produto no banco 
  const resultModel = await productModels.createProduct(name, quantity, 'products');
  return resultModel;
};

const getAll = async () => {
  const allProducts = await productModels.getAll('products');
  if (!allProducts) return { message: 'Produtos não encontrados' };
  return allProducts;
};

const getProductById = async (id) => {
  const idValid = isValidID(id);
  if (idValid.err) return idValid;

  const oneProduct = await productModels.getById(id, 'products');
  return oneProduct;
};

const updateProduct = async (id, name, quantity) => {
  const isValidName = isValidNameProduct(name);
  const isValidQuantity = isValidQuant(quantity);
  const isValidId = isValidID(id);

  if (isValidName.err) return isValidName;
  if (isValidQuantity.err) return isValidQuantity;
  if (isValidId.err) return isValidId;

  const productAdd = await productModels.update({ id, name, quantity, collection: 'products' });
  return productAdd;
};

const exclude = async (id) => {
  const isValidId = isValidID(id);
  if (isValidId.err) return isValidId;
  const excludedProduct = await productModels.exclude(id, 'products');
  if (!excludedProduct) return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  return excludedProduct;
};

module.exports = {
  createProduct,
  getAll,
  getProductById,
  updateProduct,
  exclude,
};