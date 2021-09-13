const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();

  const getSales = await db.collection('sales').find().toArray();

  return { sales: getSales };
};

const getById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));

  if (!sale) return null;

  return sale;
};

const create = async (sale) => {
  const db = await connection();
  const createdSale = await db.collection('sales')
    .insertOne({ itensSold: sale });

  return createdSale.ops[0];
};

module.exports = {
  create,
  getAll,
  getById,
};