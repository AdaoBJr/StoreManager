const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const [sales] = await db.collection('sales').find().toArray();
  return sales;
};

const saleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const saleObj = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return saleObj;
};

const create = async (itensSold) => {
  const db = await connection();
  const createdSaleResult = await db.collection('sales').insertOne({ itensSold });

  return { _id: createdSaleResult.insertedId, itensSold };
};

module.exports = { getAll, saleById, create };
