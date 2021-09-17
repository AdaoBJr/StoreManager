const { ObjectId } = require('mongodb');
const connection = require('../connection');
const { errorBusines } = require('../estruturaErro/estruturaErro');

const getName = async (name) => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('products').findOne({ name });
  return result;
};

const insertOne = async (name, quantity) => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('products')
  .insertOne({ name, quantity });
  return result;
};

const getAll = async () => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('products').find().toArray();
  return { products: result };
};

const getId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return errorBusines('Wrong id format');
  }
  const auxConnection = await connection();
  const result = await auxConnection.collection('products').findOne(ObjectId(id));
  if (!result) {
    return errorBusines('Wrong id format');
  }
  return result;
};

module.exports = { getName, insertOne, getAll, getId };
