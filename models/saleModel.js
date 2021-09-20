const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function save(itensSold) {
  const collection = await connection().then((db) => db.collection('sales'));

  const { insertedId } = await collection.insertOne(
    { itensSold },
  );
  return { _id: insertedId, itensSold };
}

async function findById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const salesData = db.collection('sales').findOne(new ObjectId(id));

  if (!salesData) return null;

  return salesData;
}

module.exports = {
  save,
  findById,
};