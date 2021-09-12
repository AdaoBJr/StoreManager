// { "name": "Produto Silva", "quantity": 10 }

const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByName = async (name) => {
  const db = await connection();
  const productFound = await db.collection('products').findOne({ name });

  if (!productFound) return false;

  return productFound;
};

const findAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));

  return product;
};

const update = async (id, name, quantity) => {
  const db = await connection();
  await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  const productUpdated = await findById(id);

  if (!productUpdated) return false;

  return productUpdated;
};

const create = async (name, quantity) => {
  const db = await connection();
  const productAdd = await db
    .collection('products')
    .insertOne({ name, quantity });

  return productAdd.ops[0];
};

module.exports = { findByName, update, create, findAll, findById };
