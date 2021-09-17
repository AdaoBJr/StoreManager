const { getName,
  insertOne, getAll, getId, updateOne, deleteOne } = require('../models/productModel');
const { errorBusines } = require('../estruturaErro/estruturaErro');

const insertName = async (name, quantity) => {
  const aux = await getName(name);
  if (aux) {
    return errorBusines('Product already exists');
  }
  const create = await insertOne(name, quantity);
  return create;
};

const auxGetId = async (id) => {
  const result = await getId(id);
  if (!result) {
    return errorBusines('Wrong id format');
  }
  return result;
};

const auxDeleteOne = async (id) => {
  const result = await deleteOne(id);
  if (!result) {
    return errorBusines('Wrong id format');
  }
  return result;
};

const auxGetAll = async () => getAll();

module.exports = { insertName, auxGetAll, auxGetId, updateOne, auxDeleteOne };
