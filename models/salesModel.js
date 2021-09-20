const { ObjectId } = require('bson');
const getConnection = require('./connection');

const collection = 'sales';

async function getAll() {
  const db = await getConnection();
  const sales = await db.collection(collection).find({}).toArray();
  return sales;
}

async function getById({ id }) {
  console.log({ id });
  const db = await getConnection();
  const sale = await db.collection(collection).findOne({ _id: ObjectId(id) });
  return sale;
}

async function create(body) {
  const db = await getConnection();
  const result = await db
    .collection(collection)
    .insertOne({ itensSold: body });
  return { _id: result.insertedId, itensSold: body };
}

module.exports = {
  getAll,
  getById,
  create,
};
