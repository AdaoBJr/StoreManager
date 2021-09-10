const productModel = require('../models/productsModel');

const min = 1;
const err = {
  code: 'invalid_data',
  message: '',
};

const productName = (name) => {
  const minName = 5;
  if (name.length < minName) {
    err.message = '"name" length must be at least 5 characters long';
    return { err };
  }
};

const checkProduct = async (name) => {
  const product = await productModel.findName(name);
  
  if (product) {
    err.message = 'Product already exists';
    return { err };
  }
};

const checkQuantity = (quantity) => {
  if (quantity < min) {
    err.message = '"quantity" must be larger than or equal to 1';
    return { err };
  }
  if (typeof quantity !== 'number') {
    err.message = '"quantity" must be a number';    
    return { err };
  }
};

const checkId = async (id) => {
  const selectProduct = await productModel.getById(id);
  if (!selectProduct) {
    err.message = 'Wrong id format';
    return { err };
  }
};

const newProducts = async (name, quantity) => {
  const validateProduct = await checkProduct(name);
  if (validateProduct) return validateProduct;

  const validateName = await productName(name);
  if (validateName) return validateName;

  const validateQuantity = await checkQuantity(quantity);
  if (validateQuantity) return validateQuantity;

  const newProduct = await productModel.create(name, quantity);
  return newProduct;
};

const getProducts = async () => {
  const products = await productModel.getAll();
  return { products };
};

const findProduct = async (id) => {
  const validId = await checkId(id);
  if (validId) return validId;

  const product = await productModel.getById(id);
  return product;
};

module.exports = {
    newProducts,
    getProducts,
    findProduct,
};