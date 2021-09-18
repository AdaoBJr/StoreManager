// const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const create = async (body) => {
  const db = await mongoConnection.getConnection();
  const { insertedId: id } = await db.collection('sales')
    .insertOne({ itensSold: [...body] });

  return { _id: id, itensSold: [...body] };
};

module.exports = {
  create,
};
