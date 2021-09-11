// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const responseConnection = await connection();
  return responseConnection.collection('products').find().toArray();
};

const create = async (name, quantity) => {
  const responseConnection = await connection();
  const insert = responseConnection.collection('products').insertOne(name, quantity);

  return insert;
};

const findName = async (name) => {
  const product = await connection();

  const findProduct = product.collection('products').findOne({ name });

  if (!findProduct) {
    return null;
  }
  return findProduct;
};

module.exports = {
  getAll,
  create,
  findName,
};
