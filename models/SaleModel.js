const { ObjectId } = require('mongodb');
const mongoConnection = require('../connection/connection');

async function create(salesInfo) {
  const db = await mongoConnection.connection();

  const insert = await db.collection('sales').insertOne({ itensSold: salesInfo });
  return insert.ops[0];
}

async function getAll() {
  const db = await mongoConnection.connection();
  const result = await db.collection('sales').find().toArray();

  return { sales: result };
}

async function findById(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection.connection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return result;
}

async function update(id, salesInfo) {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection.connection();
  const insert = await db.collection('sales').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { itensSold: salesInfo } },
    { returnOriginal: false },
  );

  return insert.value;
}

async function exclude(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection.connection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return result;
}

module.exports = {
  create,
  getAll,
  findById,
  update,
  exclude,
};
