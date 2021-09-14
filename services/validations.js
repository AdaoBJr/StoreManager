const { ObjectId } = require('mongodb');
const modelProducts = require('../models/productModels');

const validateName = (name) => {
  if (name.length < 5 || typeof name !== 'string') {
    return false;
  }
  return true;
};

const validateQuantity = (quantity) => {
  if (quantity <= 0) {
    return false;
  }
  return true;
};

const validateQuantNotNumber = (quantity) => {
  if (typeof quantity !== 'number') {
    return false;
  }
  return true;
};

const validateCreate = async (name, quantity) => {
  const validName = validateName(name);
  const validQuant = validateQuantity(quantity);
  const validQantNotNumber = validateQuantNotNumber(quantity);
  if (!validName) {
    return { code: 'invalid_data', message: '"name" length must be at least 5 characters long' };
  }
  if (!validQuant) {
    return { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' };
  }
  if (!validQantNotNumber) {
    return { code: 'invalid_data', message: '"quantity" must be a number' };
  }
  const validNameNotEquals = await modelProducts.findByName(name);
  if (validNameNotEquals) {
    return { code: 'invalid_data', message: 'Product already exists' };
  }
  const { id } = await modelProducts.createProduct({ name, quantity });
  return { _id: id, name, quantity };
};

const validateFindAll = async () => {
  const allProducts = await modelProducts.findAllProducts();
  return allProducts;
};

const validateFindById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: 'invalid_data', message: 'Wrong id format' }; 
  }
  const productById = await modelProducts.findProductById(id);
  return productById;
};

const validateUpdate = async ({ id, name, quantity }) => {
  const validName = validateName(name);
  const validQuant = validateQuantity(quantity);
  const validQantNotNumber = validateQuantNotNumber(quantity);
  if (!validName) {
    return { code: 'invalid_data', message: '"name" length must be at least 5 characters long' };
  }
  if (!validQuant) {
    return { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' };
  }
  if (!validQantNotNumber) {
    return { code: 'invalid_data', message: '"quantity" must be a number' };
  }
  const updateProduct = await modelProducts.updateProduct({ id, name, quantity });
  return updateProduct;
};

module.exports = {
  validateCreate,
  validateFindAll,
  validateFindById,
  validateUpdate,
};
