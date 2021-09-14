const { getName, insertOne, getAll } = require('../models/models');
const { errorBusines } = require('../estruturaErro/estruturaErro');

const insertName = async (name, quantity) => {
  const aux = await getName(name);
  if (aux) {
    return errorBusines('Product already exists');
  }
  const create = await insertOne(name, quantity);
  return create;
};

module.exports = { insertName, getAll };
