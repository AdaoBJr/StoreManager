// { "name": "Produto Silva", "quantity": 10 }

const connection = require('./connection');

const findByName = async (name) => {
  const db = await connection();
  const productFound = await db.collection('products').findOne({ name });

  if (!productFound) return false;

  return productFound;
};

const create = async (name, quantity) => {
  const db = await connection();
  const productAdd = await db
    .collection('products')
    .insertOne({ name, quantity });

  return productAdd.ops[0];
};

const findAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

module.exports = { findByName, create, findAll };
