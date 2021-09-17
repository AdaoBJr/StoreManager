const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  const db = await connect.connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;  
};

const getById = async ({ id }) => {
  const db = await connect.connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));
  if (!sale) {
    return false;
  }
  return sale;
};

const create = async (itensSold) => {
  const db = await connect.connection();
  const sale = await db.collection('sales').insertOne({ itensSold });
  console.log(itensSold, 'model');
  return {
    _id: sale.insertedId,
    itensSold,
  };
};

module.exports = {
  getAll,
  getById,
  create,
};
