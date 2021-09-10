const { newProduct, listProducts, listById, updateProduct } = require('../models/produtos.model');

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

const update = async ({ id, name, quantity }) => {
  const updateProducts = await updateProduct({ id, name, quantity });
  return updateProducts;
};

module.exports = { criar, getAll, getById, update };
