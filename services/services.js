const { getName, insertOne, getAll, getId, updateOne } = require('../models/productModel');
const { errorBusines } = require('../estruturaErro/estruturaErro');

const insertName = async (name, quantity) => {
  const aux = await getName(name);
  if (aux) {
    return errorBusines('Product already exists');
  }
  const create = await insertOne(name, quantity);
  return create;
};

const auxGetAll = async () => getAll();

const auxUpdate = async () => updateOne();

module.exports = { insertName, auxGetAll, getId, auxUpdate };
