const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createSales = async (body) => {
  const db = await connect();
  const { insertedId: id } = await db.collection('sales').insertOne({ itensSold: [...body] });
  return { _id: id, itensSold: [...body] };
};

const updateSale = async (id, body) => {
  const db = await connect();
  await db.collection('sales').updateOne({ _id: ObjectId(id) },
  { $set: { itensSold: body } });
  return { _id: id, itensSold: body };
};

const findAllSales = async () => {
  const db = await connect();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

const findSalesById = async (id) => {
  const db = await connect();
  const salesById = await db.collection('sales').findOne(ObjectId(id));
  return salesById;
};

module.exports = {
  createSales,
  findAllSales,
  findSalesById,
  updateSale,
};