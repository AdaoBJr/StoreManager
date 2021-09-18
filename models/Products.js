const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const create = async (name, quantity) => {
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const findByName = async (name) => {
  const productName = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!productName) return null;

  return productName;
};

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const productData = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  if (!productData) return null;

  const { name, quantity } = productData;

  return { id, name, quantity };
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
};

module.exports = {
  create,
  findByName,
  getAll,
  findById,
  update,
};