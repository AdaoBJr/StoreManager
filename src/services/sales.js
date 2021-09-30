const models = require('../models/sales');

const getAll = async () => {
  const model = models.getAll();
  return model;
};

const getById = async (id) => {
  const model = models.getById(id);
  return model;
};

const create = async () => {
  const model = models.create();
  return model;
};

const update = async (id) => {
  const model = models.update(id);
  return model;
};

const remove = async (id) => {
  const model = models.remove(id);
  return model;
};

module.exports = { getAll, getById, create, update, remove };
