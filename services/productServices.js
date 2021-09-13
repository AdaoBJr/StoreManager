const { ObjectId } = require('mongodb');
const productModels = require('../models/productModels');

const isValidNameProduct = (name) => {
  const requiredNameSize = 5;

  if (name.length < requiredNameSize) {
    return { err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long' },
    }; 
  }
  return true; 
};

const isValidQuantityProduct = (quantity) => {
  const requiredQuantitySize = 0; 
  if (quantity <= requiredQuantitySize) {
    return { err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1' } }; 
  }

  if (typeof quantity !== 'number') {
    return { err: { code: 'invalid_data', message: '"quantity" must be a number' } };
  }
  return true;
};

const isValidID = (id) => {
  if (!ObjectId.isValid(id)) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' } };
  }
  return true;
};

const createProduct = async (name, quantity) => {
  const isValidName = isValidNameProduct(name);
  const isValidQuantity = isValidQuantityProduct(quantity);

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
  const isValidQuantity = isValidQuantityProduct(quantity);
  const isValidId = isValidID(quantity);

  if (isValidName.err) return isValidName;
  if (isValidQuantity.err) return isValidQuantity;
  if (isValidId.err) return isValidId;

  const productAdd = await productModels.update(id, name, quantity, 'products');
  return productAdd;
};

const exclude = async (id) => {
  const excludedProduct = productModels.exclude(id, 'products');
  if (!excludedProduct) return { err: {} };
  return excludedProduct;
};

module.exports = {
  createProduct,
  getAll,
  getProductById,
  updateProduct,
  exclude,
};