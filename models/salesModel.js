const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const getAllSales = async () => {
  const db = await getConnection();
  const salesCollection = await db.collection('sales').find().toArray();
  return salesCollection;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await getConnection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const create = async (salesData) => {
  const salesCollection = await getConnection()
    .then((db) => db.collection('sales'));

    const { insertedId: _id } = await salesCollection
    .insertOne({ itensSold: salesData });

  return { _id, itensSold: salesData };
};

module.exports = {
  getAllSales,
  getSaleById,
  create,
};
