const productsModel = require('../models/productsModel');

const error = {
    err: {
      code: 'invalid_data',
      message: null,
} };

const getAllProducts = async () => {
  const allProducts = { products: await productsModel.getAllProducts() };
  return allProducts;
};

const getProductByName = async (name) => {
  const productByName = await productsModel.getProductByName(name);
  return productByName;
};

const getProductById = async (id) => {
  error.err.message = 'Wrong id format';
  const productById = await productsModel.getProductById(id);
  if (!productById) return error;
  return productById;
};

const excludeProductById = async (id) => {
  const excludedProduct = await getProductById(id);
  await productsModel.excludeProductById(id);
  return excludedProduct;
};

const createProduct = async ({ name, quantity }) => {
  const existsProduct = await getProductByName(name);
  if (name.length < 6) {
    error.err.message = '"name" length must be at least 5 characters long';
    return error;
  }
  if (existsProduct.length > 0) {
    error.err.message = 'Product already exists';
    return error;
  }
  if (typeof quantity !== 'number') {
    error.err.message = '"quantity" must be a number';
    return error;
  }
  if (quantity < 1) {
    error.err.message = '"quantity" must be larger than or equal to 1';
    return error;
  }
  return productsModel.createProduct({ name, quantity });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  excludeProductById,
};
