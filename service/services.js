const { getName, insertOne, getAll, getId } = require('../models/productModel');
const { errorBusines } = require('../estruturaErro/estruturaErro');

const insertName = async (name, quantity) => {
  const aux = await getName(name);
  if (aux) {
    return errorBusines('Product already exists');
  }
  const create = await insertOne(name, quantity);
  return create;
};

module.exports = { insertName, getAll, getId };
