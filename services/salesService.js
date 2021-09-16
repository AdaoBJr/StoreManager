const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

const create = async (sales) => salesModel.create(sales);

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  return salesModel.getById(id);
};

const update = async ({ body, id }) => {
  if (!ObjectId.isValid(id)) { return null; }
const result = await salesModel.update({ body, id });
return result;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }
  return salesModel.exclude(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};