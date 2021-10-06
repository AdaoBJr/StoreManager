const connection = require('./connection');

const { ObjectId } = require('mongodb');

const COLLECTION = 'sales';

const storeSales = async (salesData) => {
  const salesResult = await connection().then((db) => db.collection(COLLECTION));

  const { insertedId: _id } = await salesResult.insertOne(
    { itensSold: salesData },
  );

  return { _id, itensSold: salesData };
};

const getAllSales = async () => {
  const sale = {};

  const salesCollection = await connection().then((db) => db.collection(COLLECTION));

  sale.sales = await salesCollection.find().toArray();

  return sale;
};

const getSalesById = async (id) => {
  const salesResult = await connection().then((db) => db.collection(COLLECTION));

  return await salesResult.findOne({ _id: ObjectId(id) });
};

module.exports = {
  storeSales,
  getAllSales,
  getSalesById,
};