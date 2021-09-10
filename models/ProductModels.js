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
module.exports = {
  getAll,
  findById,
};
