const { ObjectId } = require('mongodb');
const productModel = require('../models/productModel');

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  return productModel.getById(id);
};

module.exports = {
  getAll,
  getById,
};