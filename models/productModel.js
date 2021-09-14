const { ObjectId } = require('mongodb');
const connect = require('./connection');

const productExists = async (name) => {
  const db = await connect();
  const nameProduct = await db.collection('products').findOne({ name });

  return nameProduct !== null;
};

const add = async ({ name, quantity }) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

const getAll = async () => {
  const db = await connect();
  return db.collection('products').find().toArray();
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  return db.collection('products').findOne({ _id: ObjectId(id) });
};

module.exports = { add, productExists, getAll, getById };
