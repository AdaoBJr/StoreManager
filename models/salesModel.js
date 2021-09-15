const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerSale = async (itensSold) => {
  const db = await connection();
  const insertedSale = await db.collection('sales').insertOne({ itensSold });
  return insertedSale.ops[0];
};

const getSales = async () => {
  const db = await connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

const getSaleById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const updateSale = async (id, item) => {
  const db = await connection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: item } },
  );
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  registerSale,
  getSales,
  getSaleById,
  updateSale,
};
