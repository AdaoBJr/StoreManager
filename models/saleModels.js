// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createSales = async (body) => {
  const db = await connect();
  const { insertedId: id } = await db.collection('sales').insertOne({ itensSold: [...body] });
  return { _id: id, itensSold: [...body] };
};

module.exports = {
  createSales,
};