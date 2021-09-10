const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

async function getAll() {
  const db = await mongoConnection.connection();
  const result = await db.collection('products').find().toArray();

  return { products: result };
}

async function findById(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection.connection();
  const result = await db.collection('products').findOne({ _id: ObjectId(id) });
  return result;
}

async function create(name, quantity) {
  const db = await mongoConnection.connection();
  const insert = await db.collection('products').insertOne({ name, quantity });

  return insert.ops[0];
}

async function update(id, { name, quantity }) {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection.connection();
  const insert = await db.collection('products').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
    { returnOriginal: false },
  );
  return insert.value;
}

async function exclude(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection.connection();

  const result = await db.collection('products').findOne({ _id: ObjectId(id) });
  await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return result;
}

async function findByName(name) {

  const db = await mongoConnection.connection();
  const result = await db.collection('products').findOne({ name });

  return result;
}

module.exports = {
  getAll,
  findById,
  create,
  update,
  exclude,
  findByName,
};
