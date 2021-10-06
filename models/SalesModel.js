const { ObjectId } = require('mongodb');
const connection = require('./connection');

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
  const result = salesResult.findOne({ _id: ObjectId(id) });
  return result;
};

const updatedSale = async (id, updateSale) => {
  const { itensSold } = updateSale;

  const salesResult = await connection().then((db) => db.collection(COLLECTION));
  const result = await salesResult.updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold } },
  );
  return result;
};

module.exports = {
  storeSales,
  getAllSales,
  getSalesById,
  updatedSale,
};