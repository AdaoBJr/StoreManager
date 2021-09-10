const { createNewProduct, getAllProducts, getProductById } = require('../models/products.model');

const createProduct = async ({ name, quantity }) => {
  const newProduct = await createNewProduct({ name, quantity });
  return newProduct;
};

const getProducts = async () => {
  const products = await getAllProducts();
  return products;
};

const getProductPerId = async (id) => {
  const product = await getProductById(id);
  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductPerId,
};