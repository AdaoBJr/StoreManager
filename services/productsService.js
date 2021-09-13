const { ObjectId } = require('mongodb');
const productModel = require('../models/productsModel');

const nameLengthError = {
  err: { 
    code: 'invalid_data', 
    message: '"name" length must be at least 5 characters long', 
  } };

const quantityToSmallError = {
  err: { 
    code: 'invalid_data', 
    message: '"quantity" must be larger than or equal to 1' } };

const existentProductError = { 
  err: { 
    code: 'invalid_data', 
    message: 'Product already exists' } };

const quantittyMustBeNumber = {
  err: { 
    code: 'invalid_data', 
    message: '"quantity" must be a number' } };

const wrongIdFormat = {
  err: { 
    code: 'invalid_data', 
    message: 'Wrong id format' } };

const createProduct = async ({ name, quantity }) => {
  const productExists = await productModel.productExists(name);
  if (productExists) return existentProductError; 
  if (name.length < 5) return nameLengthError; 
  if (quantity < 1) return quantityToSmallError; 
  if (typeof quantity !== 'number') return quantittyMustBeNumber; 

  return productModel.create({ name, quantity });
};

const getProductById = (id) => {
  if (!ObjectId.isValid(id)) return wrongIdFormat;
  return productModel.productById(id);
};

const updateProduct = async ({ id, name, quantity }) => {
  const productExists = await productModel.productById(id);
    if (!productExists) return wrongIdFormat;
    if (name.length < 5) return nameLengthError; 
    if (quantity < 1) return quantityToSmallError; 
    if (typeof quantity !== 'number') return quantittyMustBeNumber; 

    return productModel.update({ id, name, quantity });
};

const deleteProduct = async (id) => {
  const productExists = await productModel.productById(id);
  if (!productExists) return wrongIdFormat;
  return productModel.exclude(id);
};

module.exports = { createProduct, getProductById, updateProduct, deleteProduct };
