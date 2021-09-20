const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

const nameValidation = (name) => {
  if (name.length < 5 || typeof name !== 'string') {
    return false;
  }
  return true;
};

const quantityValidation = (quantity) => {
  if (quantity <= 0) {
    return false;
  }
  return true;
};

const quantityTypeValidation = (quantity) => {
  if (typeof quantity !== 'number') {
    return false;
  }
  return true;
};

const createProductValidation = async (name, quantity) => {
  const validatedName = nameValidation(name);
  const validatedQuantity = quantityValidation(quantity);
  const validatedTypeQuantity = quantityTypeValidation(quantity);
  if (!validatedName) {
    return { code: 'invalid_data', message: '"name" length must be at least 5 characters long' };
  }
  if (!validatedQuantity) {
    return { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' };
  }
  if (!validatedTypeQuantity) {
    return { code: 'invalid_data', message: '"quantity" must be a number' };
  }
  const validatedNotEqualName = await productModel.findProductByName(name);
  if (validatedNotEqualName) {
    return { code: 'invalid_data', message: 'Product already exists' };
  }
  const { id } = await productModel.createProduct(name, quantity);
  return { _id: id, name, quantity };
};

const findProductByIdValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: 'invalid_data', message: 'Wrong id format' }; 
  }
  const productById = await productModel.findProductById(id);
  return productById;
};

const findAllProductsValidation = async () => {
  const allProducts = await productModel.findAllProducts();
  return allProducts;
};

const updateProductValidation = async ({ id, name, quantity }) => {
  const validatedName = nameValidation(name);
  const validatedQuantity = quantityValidation(quantity);
  const validatedTypeQuantity = quantityTypeValidation(quantity);
  if (!validatedName) {
    return { code: 'invalid_data', message: '"name" length must be at least 5 characters long' };
  }
  if (!validatedQuantity) {
    return { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' };
  }
  if (!validatedTypeQuantity) {
    return { code: 'invalid_data', message: '"quantity" must be a number' };
  }
  const updatedProduct = await productModel.updateProduct({ id, name, quantity });
  return updatedProduct;
};

module.exports = {
  createProductValidation,
  findProductByIdValidation,
  findAllProductsValidation,
  updateProductValidation,
};
