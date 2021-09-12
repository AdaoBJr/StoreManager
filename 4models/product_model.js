const connection = require('./connection');

const create = async (name, quantity) => {
  const DB = await connection();
  const products = await DB.collection('products').insertOne({ name, quantity });
  return products.ops[0];
};

const getAll = async () => connection()
      .then((db) => db.collection('products').find().toArray());

const findByName = async (name) => connection()
.then((db) => db.collection('products').findOne({ name })) || false;

module.exports = {
  create,
  getAll,
  findByName,
};