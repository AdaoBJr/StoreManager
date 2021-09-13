const { productExists, newProduct, getAllProducts } = require('../models/Products');

const createProduct = async (name, quantity) => {
  const product = await productExists(name);

  if (product) return true;

  const newestProduct = await newProduct(name, quantity);

  return newestProduct;
};

const receiveProductsList = async () => {
  const productList = await getAllProducts();
  
  return productList;
};

module.exports = {
  createProduct,
  receiveProductsList,
};
