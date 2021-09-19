const getConnection = require('./connection');

const collection = 'sales';

async function create(body) {
  const db = await getConnection();
  const result = await db
    .collection(collection)
    .insertOne({ itensSold: body });
  return { _id: result.insertedId, itensSold: body };
}

module.exports = {
  create,
};
