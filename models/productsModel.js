// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findName = async (name) => {
  const product = await connection()
  .then((db) => db.collection('products').findOne({ name }));

  return product;
};

const create = async (name, quantity) => {
  const product = await connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

  return product.ops[0];
};

const getAll = async () => {
  const getProducts = await connection()
  .then((db) => db.collection('products').find().toArray());

  return getProducts;
};

module.exports = {
  findName,
  create,
  getAll,
};