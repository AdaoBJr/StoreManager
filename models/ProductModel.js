const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray())
  .then((result) => result);

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const getProductId = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  if (!getProductId) return null;

  return getProductId;
};

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => result.ops[0]);

const findName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }))
  .then((result) => result);

module.exports = {
  getAll,
  findById,
  create,
  findName,
};