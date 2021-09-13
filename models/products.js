const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const responseConnection = await connection();
  return responseConnection.collection('products').find().toArray();
};

const findId = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const responseConnection = await connection();
  return responseConnection.collection('products').findOne(ObjectId(id));
};

const create = async (product) => {
  const responseConnection = await connection();
  const { ops } = await responseConnection.collection('products').insertOne(product);
  return ops[0];
};

const findName = async (name) => {
  const product = await connection();
  return product.collection('products').findOne(name);
};

module.exports = {
  getAll,
  create,
  findName,
  findId,
};
