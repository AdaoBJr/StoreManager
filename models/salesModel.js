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

module.exports = {
  insertNewSale,
  findProductById,
};