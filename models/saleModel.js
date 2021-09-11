const { ObjectId } = require('mongodb');
const connectionMongo = require('./connection');

const create = async (sales) => {
  const db = await connectionMongo();
  const sale = await db.collection('sales').insertOne({ itensSold: sales });
  return { _id: sale.insertedId, itensSold: sales };
};

const getAll = async () => {
  const db = await connectionMongo();
  const sale = await db.collection('sales').find().toArray();
  return sale;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null; 
  const db = await connectionMongo();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const update = async (id, sale) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connectionMongo();
  await db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } });
  const updatedSale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return updatedSale;
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connectionMongo();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sale;
};

module.exports = { create, getAll, getById, update, remove };
