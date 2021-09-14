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

const updateSaleById = async (saleId, updates) => {
  const comparisonId = new mongo.ObjectId(saleId);
  await updates.forEach(async (sale) => {
    const { productId } = sale;
    await connection().then((db) => 
      db.collection(COLLECTION_NAME).updateOne({ _id: comparisonId }, {
        pull: { itensSold: { productId } },
    }));
  });
  await connection().then((db) => db.collection(COLLECTION_NAME)
    .updateOne({ _id: comparisonId }, { push: { itensSold: { each: updates } } }));
  const saleAfterUpdate = await connection().then((db) => 
    db.collection(COLLECTION_NAME).findOne({ _id: comparisonId }));
  return saleAfterUpdate;
};

module.exports = {
  insertNewSale,
  findProductById,
  getAllSales,
  getSaleById,
  updateSaleById,
};