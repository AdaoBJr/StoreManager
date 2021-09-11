const {
  createProduct,
  findById,
  updateProduct,
  removeProduct,
} = require('../models/productsModel');

const create = async (name, quantity) => createProduct(name, quantity);

const remove = async (id) => removeProduct(id);

const getById = async (id) => findById(id);

const update = async (id, name, quantity) => {
  await updateProduct(id, name, quantity);
  return { _id: id, name, quantity };
};

module.exports = { 
  create,
  getById,
  update,
  remove,
};
