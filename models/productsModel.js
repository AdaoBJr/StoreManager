const mongo = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'products';

const findByName = async (name) => {
  const productData = await connection().then((db) => 
    db.collection(COLLECTION_NAME).findOne({ name }));
  return productData;
};

const insertNewProduct = (name, quantity) => 
  connection().then((db) => db.collection(COLLECTION_NAME).insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));

const findAllProducts = async () => {
  const allProducts = await connection().then((db) => 
    db.collection(COLLECTION_NAME).find().toArray());
  return allProducts;
};

const findById = async (id) => {
  const comparisonId = new mongo.ObjectId(id);
  const productData = await connection().then((db) => 
    db.collection(COLLECTION_NAME).findOne({ _id: comparisonId }));
  return productData;
};

const updateById = async (id, name, quantity) => {
  const comparisonId = new mongo.ObjectId(id);
  await connection().then((db) => 
    db.collection(COLLECTION_NAME).updateOne({ _id: comparisonId }, { $set: { name, quantity } }));
  const updatedProduct = await connection().then((db) => 
  db.collection(COLLECTION_NAME).findOne({ _id: comparisonId }));
  return updatedProduct;
};

module.exports = {
  insertNewProduct,
  findByName,
  findAllProducts,
  findById,
  updateById,
};