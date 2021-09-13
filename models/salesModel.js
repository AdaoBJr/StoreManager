const mongo = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'sales';

const findProductById = async (id) => {
  const comparisonId = new mongo.ObjectId(id);
  const productData = await connection().then((db) => 
    db.collection('products').findOne({ _id: comparisonId }));
  return productData;
};

const insertNewSale = (itensSold) => 
  connection().then((db) => db.collection(COLLECTION_NAME).insertOne({ itensSold }))
    .then((result) => ({ _id: result.insertedId, itensSold }));

const getAllSales = async () => 
   connection().then((db) => db.collection(COLLECTION_NAME).find().toArray());

const getSaleById = async (id) => {
  const comparisonId = new mongo.ObjectId(id);
  const saleData = await connection().then((db) => 
    db.collection(COLLECTION_NAME).findOne({ _id: comparisonId }));
  return saleData;
};

module.exports = {
  insertNewSale,
  findProductById,
  getAllSales,
  getSaleById,
};