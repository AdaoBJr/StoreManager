const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return { sales: result };
};

const getById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  if (!sale) return null;
  return sale;
};

const create = async (sales) => {
  const db = await connection();
  const createSale = await db.collection('sales').insertOne({ itensSold: sales });
  return {
    _id: createSale.insertedId,
    itensSold: sales,
  };
};

const update = async (id, sales) => {
  const db = await connection();
  await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { sales } });
  
  return { _id: id, itensSold: sales };
};

const exclude = async (id) => {
  const db = await connection();
  const deleted = await getById(id);
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return deleted;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};