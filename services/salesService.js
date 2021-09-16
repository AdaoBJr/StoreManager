const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

const create = async (sales) => salesModel.create(sales);

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  return salesModel.getById(id);
};

module.exports = {
  create,
  getAll,
  getById,
};