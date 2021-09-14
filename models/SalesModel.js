const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (sale) => {
  const { insertedId } = await connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: sale }));

  return { _id: insertedId, itensSold: sale };
};

const getSale = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return { sales: result };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  addSale,
  getSale,
  getSaleById,
};