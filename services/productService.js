const productsModel = require('../models/productsModel');

const createProduct = async ({ name, quantity }) => {
  const create = await productsModel.create({ name, quantity });
  return create;
};

const getAll = async () => {
  const Allproducts = await productsModel.getAll();
  return { products: Allproducts };
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
   
  return product;
};

const updateProduct = async ({ id, name, quantity }) => {
  const product = await productsModel.update({ id, name, quantity });
  return product;
};

const deleteProduct = async (id) => {
  const exclude = await productsModel.exclude(id);
  return exclude;
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};