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

module.exports = {
  insertNewProduct,
  findByName,
};