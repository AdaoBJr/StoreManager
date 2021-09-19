const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (product) => {
  const db = await connection();
  const { ops } = await db.collection('products').insertOne(product);

  return ops[0];
};

const findByName = async (name) => {
  const db = await connection();

  return db.collection('products').findOne({ name });
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  return db.collection('products').findOne(ObjectId(id));
};

const getAll = async () => {
  const db = await connection();

  return db.collection('products').find().toArray();
};

module.exports = {
  create,
  findByName,
  findById,
  getAll,
};
