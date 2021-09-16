// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async (body) => {
  const result = await connection.getConnection().then((db) =>
    db.collection('sales').insertOne({ itensSold: body }));
  return { _id: result.insertedId, itensSold: body };
};

const getAllSales = async () => {
  const result = await connection.getConnection().then((db) =>
  db.collection('sales').find().toArray());
return result;
};

module.exports = {
  createSale,
  getAllSales,
};
