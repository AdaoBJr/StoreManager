const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

// req 1
const nameValidation = (name) => {
  if (name.length < 5 || typeof name !== 'string') {
    return false;
  }
  return true;
};

// req 1
const quantityValidation = (quantity) => {
  if (quantity <= 0) {
    return false;
  }
  return true;
};

// req 1
const quantityTypeValidation = (quantity) => {
  if (typeof quantity !== 'number') {
    return false;
  }
  return true;
};

// req 1
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

  const { id } = await productModel.createProduct({ name, quantity });
  return { _id: id, name, quantity };
};

// req 2
const findProductByIdValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: 'invalid_data', message: 'Wrong id format' }; 
  }
  const productById = await productModel.findProductById(id);
  return productById;
};

// req 2
const findAllProductsValidation = async () => {
  const allProducts = await productModel.findAllProducts();
  return allProducts;
};

// req 3
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

// req 4
const delProductValidation = async (id) => {
  if (!ObjectId.isValid(id)) {
    return { code: 'invalid_data', message: 'Wrong id format' };
  }

  const deletedProduct = await productModel.delProduct(id);
  return deletedProduct;
};

module.exports = {
  createProductValidation,
  findProductByIdValidation,
  findAllProductsValidation,
  updateProductValidation,
  delProductValidation,
};
