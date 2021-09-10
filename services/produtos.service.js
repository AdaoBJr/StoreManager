const { newProduct, listProducts, listById } = require('../models/produtos.model');

const criar = async ({ name, quantity }) => {
  const newProducts = await newProduct({ name, quantity });
  return newProducts;
};

const getAll = async () => {
  const products = await listProducts();
  return products;
};

const getById = async (id) => {
  const product = await listById(id);
  return product;
};

module.exports = { criar, getAll, getById };
