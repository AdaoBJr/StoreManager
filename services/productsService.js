const { createProduct, findById, updateProduct } = require('../models/productsModel');

const create = async (name, quantity) => {
  const createdProd = await createProduct(name, quantity);
  return createdProd;
};

const getById = async (id) => {
  const result = findById(id);
  return result;
};

const update = async (id, name, quantity) => {
  await updateProduct(id, name, quantity);
  return { _id: id, name, quantity };
};

module.exports = { 
  create,
  getById,
  update,
};
