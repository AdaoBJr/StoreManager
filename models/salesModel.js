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

module.exports = {
  create,
  getAll,
  getById,
};