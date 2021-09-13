const { newProduct, allProducts, productById, updatedProduct } = require('../models/productModel');

const create = async ({ name, quantity }) => {
  const newProducts = await newProduct({ name, quantity });
  return newProducts;
};

const getAll = async () => {
  const products = await allProducts();
  return products;
};

const getById = async (id) => {
  const product = await productById(id);
  return product;
};

const update = async ({ id, name, quantity }) => {
  const product = await updatedProduct({ id, name, quantity });
  return product;
};

module.exports = { create, getAll, getById, update };
