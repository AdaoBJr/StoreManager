const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');

const isValid = async (name, quantity) => {
  const err = { code: 'invalid_data' };

  if (name.length < 5) err.message = '"name" length must be at least 5 characters long';
  if (quantity < 1) err.message = '"quantity" must be larger than or equal to 1';
  if (typeof quantity !== 'number') err.message = '"quantity" must be a number';
  if (await productsModel.findByName(name)) err.message = 'Product already exists';

  return err;
};

const createProduct = async (name, quantity) => {
  const err = await isValid(name, quantity);
  if (err.message) return { err, error: true };

  const product = await productsModel.addProducts(name, quantity);
  return { _id: product.insertedId, name, quantity };
};

const findAllProducts = async () => {
  const products = await productsModel.findAll();
  return { products };
};

const findId = async (id) => {
  const product = await productsModel.findById(id);
  const err = { err: { code: 'invalid_data', message: 'Wrong id format' }, error: true };

  if (!product) return err;
  return product;
};

module.exports = {
  createProduct,
  isValid,
  findAllProducts,
  findId,
};