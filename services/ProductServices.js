const { newProduct, findProduct, findOneProduct } = require('../models/ProductsModel');

const create = async ({ name, quantity }) => {
  const newProducts = await newProduct({ name, quantity });
  return newProducts;
};

const find = async () => {
  const findProducts = findProduct();
  return findProducts;
};

const findOne = async (id) => {
  const findProducts = findOneProduct(id);
  return findProducts;
};

module.exports = {
  create,
  find,
  findOne,
};
