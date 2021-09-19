const { ObjectId } = require('bson');
const getConnection = require('./connection');

const collection = 'products';

async function getAll() {
  const db = await getConnection();
  const products = await db.collection(collection).find({}).toArray();
  return products;
}

async function getById({ id }) {
  const db = await getConnection();
  const product = await db.collection(collection).findOne({ _id: ObjectId(id) });
  return product;
}

async function getByName({ name }) {
  const db = await getConnection();
  const product = await db.collection(collection).findOne({ name });
  return product;
}

async function update({ id, name, quantity }) {
  const db = await getConnection();
  
  const product = await db
  .collection(collection).updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  
  return product;
}

async function create({ name, quantity }) {
  const db = await getConnection();
  const result = await db
    .collection(collection)
    .insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
};
