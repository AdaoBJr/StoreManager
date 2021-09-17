// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async ({ itensSold }) => connection.getConnection()
  .then((db) => db.collection('sales').insertOne({ itensSold }))
  .then((result) => result.ops[0]);

const getAllSales = async () => {
  const result = await connection.getConnection()
  .then((db) => db.collection('sales').find().toArray());
  return { sales: result };
};

module.exports = {
  createSale,
  getAllSales,
};