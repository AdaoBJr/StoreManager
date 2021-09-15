const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

const create = async ({ name, quantity }) => productModel.create({ name, quantity });

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  return productModel.getById(id);
};

const update = async ({ name, quantity, id }) => productModel.update({ name, quantity, id });
// console.log(typeof id);
module.exports = {
  getAll,
  getById,
  create,
  update,
};
