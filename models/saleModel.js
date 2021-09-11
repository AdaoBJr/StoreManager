// const { ObjectId } = require('mongodb');
const connectionMongo = require('./connection');

const create = async (sales) => {
  const db = await connectionMongo();
  const sale = await db.collection('sales').insertOne({ itensSold: sales });
  return { _id: sale.insertedId, itensSold: sales };
};

module.exports = { create };
