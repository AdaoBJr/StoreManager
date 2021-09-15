// const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createSales = async (body) => {
  const db = await connect();
  const { insertedId: id } = await db.collection('sales').insertOne({ itensSold: [...body] });
  return { _id: id, itensSold: [...body] };
};

const findAllSales = async () => {
  const db = await connect();
  const allSales = await db.collection('sales').find();
  return allSales;
};

module.exports = {
  createSales,
  findAllSales,
};