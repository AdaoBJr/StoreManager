const getConnection = require('./connection');

const collection = 'products';

async function getByName({ name }) {
  const db = await getConnection();
  const product = await db.collection(collection).findOne({ name });
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
  create,
  getByName,
};
